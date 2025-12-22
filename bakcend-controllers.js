import mongoose from "mongoose";

const levelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // e.g., "KG", "Primary", "High"
    classIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }],

    // LEVEL-WISE TIMINGS  
    timings: {
      startTime: { type: String, default: null }, // "07:30"
      endTime: { type: String, default: null },   // "12:30"

      breakTime: {
        startTime: { type: String, default: null }, // "10:00"
        duration: { type: Number, default: null },  // in minutes
      },

      periodConfig: {
        periodDuration: { type: Number, default: null }, // minutes
        totalPeriods: { type: Number, default: null },
        breakAfterPeriods: { type: Number, default: null },
      },
    },
  },
  { _id: true }
);

const settingsSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
      unique: true,
      index: true
    },
    // FALLBACK if level has no timing
    defaultSchoolTiming: {
      startTime: { type: String, required: true, default: "08:00" },
      endTime: { type: String, required: true, default: "14:00" },
    },

    // FALLBACK if level-specific period config missing
    defaultPeriodConfig: {
      periodDuration: { type: Number, required: true, default: 40 },
      totalPeriods: { type: Number, required: true, default: 7 },
      breakAfterPeriods: { type: Number, default: 3 },
      breakDuration: { type: Number, default: 20 },
    },

    // LEVELS → CLASSES → LEVEL-BASED TIMINGS
    classLevels: [levelSchema],

    // OPTIONAL: class specific overrides
    classWiseOverrides: [
      {
        classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },

        startTime: { type: String },
        endTime: { type: String },

        breakTime: {
          startTime: { type: String },
          duration: { type: Number },
        },

        periodConfig: {
          periodDuration: { type: Number },
          totalPeriods: { type: Number },
          breakAfterPeriods: { type: Number },
          breakDuration: { type: Number },
        },
      },
    ],
  },
  { timestamps: true }
);

export const Settings = mongoose.model("Settings", settingsSchema);




import { Settings } from "../models/settings.model.js";
import { Class } from "../models/class.model.js";

// Get settings (one settings document per school)
export const getSettings = async (req, res) => {
  try {
    const { settingsId } = req.params;

    // Reusable populate config
    const populateConfig = [
      {
        path: "classLevels.classIds",
        select: "name",
      },
      {
        path: "classWiseOverrides.classId",
        select: "name",
      },
    ];

    let settings;

    // If settingsId is provided, fetch by ID and verify it belongs to the school
    if (settingsId) {
      settings = await Settings.findOne({ 
        _id: settingsId,
        schoolId: req.schoolId // 🔑 Tenant isolation
      }).populate(populateConfig);
    } else {
      // Get settings for this school (one per school)
      settings = await Settings.findOne({ 
        schoolId: req.schoolId // 🔑 Tenant isolation
      })
        .populate(populateConfig)
        .sort({ createdAt: -1 });
    }

    if (!settings) {
      return res.status(404).json({
        success: false,
        message: "Settings not found for this school",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Settings retrieved successfully",
      data: settings, // Return single object, not array
    });
  } catch (error) {
    console.error("Get settings error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while retrieving settings",
      error: error.message,
    });
  }
};

// Add new settings (one settings document per school)
export const addSettings = async (req, res) => {
  try {
    const {
      defaultSchoolTiming,
      defaultPeriodConfig,
      classLevels,
      classWiseOverrides
    } = req.body;

    // Check if settings already exist for this school
    const existingSettings = await Settings.findOne({ 
      schoolId: req.schoolId // 🔑 Tenant isolation
    });
    if (existingSettings) {
      return res.status(400).json({
        success: false,
        message: "Settings already exist for this school. Please use PUT /api/settings to update existing settings.",
      });
    }

    // Required validations
    if (!defaultSchoolTiming || !defaultPeriodConfig) {
      return res.status(400).json({
        success: false,
        message: "defaultSchoolTiming and defaultPeriodConfig are required",
      });
    }

    // Validate Class IDs inside classLevels (must belong to same school)
    if (classLevels && Array.isArray(classLevels)) {
      for (const level of classLevels) {
        if (level.classIds && Array.isArray(level.classIds)) {
          for (const classId of level.classIds) {
            const classExists = await Class.findOne({ 
              _id: classId,
              schoolId: req.schoolId // 🔑 Tenant isolation
            });
            if (!classExists) {
              return res.status(400).json({
                success: false,
                message: `Class with ID ${classId} not found or does not belong to this school`,
              });
            }
          }
        }
      }
    }

    // Validate Class IDs inside classWiseOverrides (must belong to same school)
    if (classWiseOverrides && Array.isArray(classWiseOverrides)) {
      for (const item of classWiseOverrides) {
        if (item.classId) {
          const classExists = await Class.findOne({ 
            _id: item.classId,
            schoolId: req.schoolId // 🔑 Tenant isolation
          });
          if (!classExists) {
            return res.status(400).json({
              success: false,
              message: `Class with ID ${item.classId} not found or does not belong to this school`,
            });
          }
        }
      }
    }

    // Create settings
    const newSettings = await Settings.create({
      schoolId: req.schoolId, // 🔑 Tenant isolation
      defaultSchoolTiming,
      defaultPeriodConfig,
      classLevels: classLevels || [],
      classWiseOverrides: classWiseOverrides || [],
    });

    // Populate response
    const populatedSettings = await Settings.findById(newSettings._id)
      .populate({
        path: "classLevels.classIds",
        select: "name",
      })
      .populate({
        path: "classWiseOverrides.classId",
        select: "name",
      });

    res.status(201).json({
      success: true,
      message: "Settings created successfully",
      data: populatedSettings,
    });
  } catch (error) {
    console.error("Add Settings Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while creating settings",
      error: error.message,
    });
  }
};


// Update settings (one settings document per school)
export const updateSettings = async (req, res) => {
  try {
    const { settingsId } = req.params;

    const {
      defaultSchoolTiming,
      defaultPeriodConfig,
      classLevels,
      classWiseOverrides
    } = req.body;

    // Find existing settings for this school
    let existingSettings;
    if (settingsId) {
      existingSettings = await Settings.findOne({ 
        _id: settingsId,
        schoolId: req.schoolId // 🔑 Tenant isolation
      });
    } else {
      existingSettings = await Settings.findOne({ 
        schoolId: req.schoolId // 🔑 Tenant isolation
      });
    }

    if (!existingSettings) {
      return res.status(404).json({
        success: false,
        message: "Settings not found for this school",
      });
    }

    // Validate class IDs in classLevels (must belong to same school)
    if (classLevels && Array.isArray(classLevels)) {
      for (const level of classLevels) {
        if (level.classIds && Array.isArray(level.classIds)) {
          for (const classId of level.classIds) {
            const classExists = await Class.findOne({ 
              _id: classId,
              schoolId: req.schoolId // 🔑 Tenant isolation
            });
            if (!classExists) {
              return res.status(400).json({
                success: false,
                message: `Class with ID ${classId} not found or does not belong to this school`,
              });
            }
          }
        }
      }
    }

    // Validate class IDs in overrides (must belong to same school)
    if (classWiseOverrides && Array.isArray(classWiseOverrides)) {
      for (const item of classWiseOverrides) {
        if (item.classId) {
          const classExists = await Class.findOne({ 
            _id: item.classId,
            schoolId: req.schoolId // 🔑 Tenant isolation
          });
          if (!classExists) {
            return res.status(400).json({
              success: false,
              message: `Class with ID ${item.classId} not found or does not belong to this school`,
            });
          }
        }
      }
    }

    // Prepare update data
    const updateData = {};
    if (defaultSchoolTiming) updateData.defaultSchoolTiming = defaultSchoolTiming;
    if (defaultPeriodConfig) updateData.defaultPeriodConfig = defaultPeriodConfig;
    if (classLevels !== undefined) updateData.classLevels = classLevels;
    if (classWiseOverrides !== undefined) updateData.classWiseOverrides = classWiseOverrides;

    const updatedSettings = await Settings.findByIdAndUpdate(
      existingSettings._id,
      updateData,
      { new: true, runValidators: true }
    )
      .populate({
        path: "classLevels.classIds",
        select: "name",
      })
      .populate({
        path: "classWiseOverrides.classId",
        select: "name",
      });

    res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      data: updatedSettings,
    });
  } catch (error) {
    console.error("Update Settings Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while updating settings",
      error: error.message,
    });
  }
};


// Delete settings (one settings document per school)
export const deleteSettings = async (req, res) => {
  try {
    const { settingsId } = req.params;

    // Find existing settings for this school
    let settings;
    if (settingsId) {
      settings = await Settings.findOne({ 
        _id: settingsId,
        schoolId: req.schoolId // 🔑 Tenant isolation
      });
    } else {
      settings = await Settings.findOne({ 
        schoolId: req.schoolId // 🔑 Tenant isolation
      });
    }

    if (!settings) {
      return res.status(404).json({
        success: false,
        message: 'Settings not found for this school'
      });
    }

    await Settings.findOneAndDelete({ 
      _id: settings._id,
      schoolId: req.schoolId // 🔑 Tenant isolation
    });

    res.status(200).json({
      success: true,
      message: 'Settings deleted successfully'
    });
  } catch (error) {
    console.error('Delete settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while deleting settings',
      error: error.message
    });
  }
};

