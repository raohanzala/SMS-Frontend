import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
      unique: true,
      index: true,
    },

    /* =========================
       GENERAL SCHOOL SETTINGS
    ========================= */
    general: {
      schoolName: String,
      timezone: { type: String, default: "Asia/Karachi" },
      locale: { type: String, default: "en-PK" },
      workingDays: {
        type: [String],
        default: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      },
      weekendDays: {
        type: [String],
        default: ["Saturday", "Sunday"],
      },
    },

    /* =========================
       ACADEMIC SETTINGS
    ========================= */
    academic: {
      academicYear: {
        startDate: Date,
        endDate: Date,
      },
      gradingSystem: {
        type: String,
        enum: ["percentage", "gpa", "custom"],
        default: "percentage",
      },
      passPercentage: { type: Number, default: 40 },
    },

    /* =========================
       TIMETABLE SETTINGS
    ========================= */
    timetable: {
      defaultSchoolTiming: {
        startTime: { type: String, default: "08:00" },
        endTime: { type: String, default: "14:00" },
      },

      defaultPeriodConfig: {
        periodDuration: { type: Number, default: 40 },
        totalPeriods: { type: Number, default: 7 },
        breakAfterPeriods: { type: Number, default: 3 },
        breakDuration: { type: Number, default: 20 },
      },

      classLevels: [
        {
          name: { type: String, required: true },
          classIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }],
          timings: {
            startTime: String,
            endTime: String,
            breakTime: {
              startTime: String,
              duration: Number,
            },
            periodConfig: {
              periodDuration: Number,
              totalPeriods: Number,
              breakAfterPeriods: Number,
            },
          },
        },
      ],

      classWiseOverrides: [
        {
          classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
          startTime: String,
          endTime: String,
          breakTime: {
            startTime: String,
            duration: Number,
          },
          periodConfig: {
            periodDuration: Number,
            totalPeriods: Number,
            breakAfterPeriods: Number,
            breakDuration: Number,
          },
        },
      ],
    },

    /* =========================
       ATTENDANCE SETTINGS
    ========================= */
    attendance: {
      autoMarkAbsentAfter: { type: Number, default: 15 }, // minutes
      allowLateEntry: { type: Boolean, default: true },
      lateAfterMinutes: { type: Number, default: 10 },
    },

    /* =========================
       BRANDING / UI
    ========================= */
    branding: {
      logo: String,
      primaryColor: String,
      secondaryColor: String,
      theme: { type: String, enum: ["light", "dark"], default: "light" },
    },

    /* =========================
       AUDIT & METADATA
    ========================= */
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    version: { type: Number, default: 1 },
  },
  { timestamps: true }
);


export const Settings = mongoose.model("Settings", settingsSchema);



export const addSettings = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    const userId = req.user.id;

    const {
      general,
      academic,
      timetable,
      attendance,
      branding
    } = req.body;

    /* ===============================
       1. Prevent duplicate settings
    =============================== */
    const existingSettings = await Settings.findOne({ schoolId });
    if (existingSettings) {
      return res.status(400).json({
        success: false,
        message: "Settings already exist for this school. Use update API instead."
      });
    }

    /* ===============================
       2. Validate timetable (if provided)
    =============================== */
    if (timetable?.classLevels?.length) {
      for (const level of timetable.classLevels) {
        if (level.classIds?.length) {
          for (const classId of level.classIds) {
            const classExists = await Class.findOne({
              _id: classId,
              schoolId
            });
            if (!classExists) {
              return res.status(400).json({
                success: false,
                message: `Class ${classId} does not belong to this school`
              });
            }
          }
        }
      }
    }

    if (timetable?.classWiseOverrides?.length) {
      for (const override of timetable.classWiseOverrides) {
        const classExists = await Class.findOne({
          _id: override.classId,
          schoolId
        });
        if (!classExists) {
          return res.status(400).json({
            success: false,
            message: `Class ${override.classId} does not belong to this school`
          });
        }
      }
    }

    /* ===============================
       3. Create settings document
    =============================== */
    const settings = await Settings.create({
      schoolId,

      general: {
        schoolName: general?.schoolName || "",
        timezone: general?.timezone || "Asia/Karachi",
        locale: general?.locale || "en-PK",
        workingDays: general?.workingDays,
        weekendDays: general?.weekendDays
      },

      academic: {
        academicYear: academic?.academicYear,
        gradingSystem: academic?.gradingSystem || "percentage",
        passPercentage: academic?.passPercentage || 40
      },

      timetable: {
        defaultSchoolTiming: timetable?.defaultSchoolTiming,
        defaultPeriodConfig: timetable?.defaultPeriodConfig,
        classLevels: timetable?.classLevels || [],
        classWiseOverrides: timetable?.classWiseOverrides || []
      },

      attendance: {
        autoMarkAbsentAfter: attendance?.autoMarkAbsentAfter || 15,
        allowLateEntry: attendance?.allowLateEntry ?? true,
        lateAfterMinutes: attendance?.lateAfterMinutes || 10
      },

      branding: {
        logo: branding?.logo || "",
        primaryColor: branding?.primaryColor || "",
        secondaryColor: branding?.secondaryColor || "",
        theme: branding?.theme || "light"
      },

      createdBy: userId,
      version: 1
    });

    /* ===============================
       4. Populate response
    =============================== */
    const populatedSettings = await Settings.findById(settings._id)
      .populate("timetable.classLevels.classIds", "name")
      .populate("timetable.classWiseOverrides.classId", "name");

    res.status(201).json({
      success: true,
      message: "Settings created successfully",
      data: populatedSettings
    });

  } catch (error) {
    console.error("Add Settings Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create settings",
      error: error.message
    });
  }
};



export const updateSettings = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    const userId = req.user.id;

    const {
      general,
      academic,
      timetable,
      attendance,
      branding
    } = req.body;

    /* ===============================
       1. Find settings (tenant-safe)
    =============================== */
    const existingSettings = await Settings.findOne({ schoolId });

    if (!existingSettings) {
      return res.status(404).json({
        success: false,
        message: "Settings not found for this school"
      });
    }

    /* ===============================
       2. Validate timetable data
    =============================== */
    if (timetable?.classLevels?.length) {
      for (const level of timetable.classLevels) {
        if (level.classIds?.length) {
          for (const classId of level.classIds) {
            const classExists = await Class.findOne({
              _id: classId,
              schoolId
            });
            if (!classExists) {
              return res.status(400).json({
                success: false,
                message: `Class ${classId} does not belong to this school`
              });
            }
          }
        }
      }
    }

    if (timetable?.classWiseOverrides?.length) {
      for (const override of timetable.classWiseOverrides) {
        const classExists = await Class.findOne({
          _id: override.classId,
          schoolId
        });
        if (!classExists) {
          return res.status(400).json({
            success: false,
            message: `Class ${override.classId} does not belong to this school`
          });
        }
      }
    }

    /* ===============================
       3. Apply partial updates safely
    =============================== */
    if (general) {
      existingSettings.general = {
        ...existingSettings.general,
        ...general
      };
    }

    if (academic) {
      existingSettings.academic = {
        ...existingSettings.academic,
        ...academic
      };
    }

    if (timetable) {
      existingSettings.timetable = {
        ...existingSettings.timetable,
        ...timetable
      };
    }

    if (attendance) {
      existingSettings.attendance = {
        ...existingSettings.attendance,
        ...attendance
      };
    }

    if (branding) {
      existingSettings.branding = {
        ...existingSettings.branding,
        ...branding
      };
    }

    /* ===============================
       4. Metadata
    =============================== */
    existingSettings.updatedBy = userId;
    existingSettings.version += 1;

    await existingSettings.save();

    /* ===============================
       5. Populate response
    =============================== */
    const populatedSettings = await Settings.findById(existingSettings._id)
      .populate("timetable.classLevels.classIds", "name")
      .populate("timetable.classWiseOverrides.classId", "name");

    res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      data: populatedSettings
    });

  } catch (error) {
    console.error("Update Settings Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update settings",
      error: error.message
    });
  }
};