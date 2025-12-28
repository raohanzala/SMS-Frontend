

const schoolSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true,
      trim: true
    },
    code: { 
      type: String, 
      unique: true,
      trim: true,
      uppercase: true,
      required : true
    },
    ownerId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: false // Made optional for migration, will be set after owner creation
    },
    plan: { 
      type: String, 
      enum: ["FREE", "BASIC", "PREMIUM", "ENTERPRISE"],
      default: "FREE" 
    },
    isActive: { 
      type: Boolean, 
      default: true 
    },
    // Optional: Add subscription/billing info later
    subscription: {
      startDate: Date,
      endDate: Date,
      status: { type: String, enum: ["active", "expired", "cancelled"], default: "active" }
    },
    isDeleted: {
      type: Boolean,
      default: false,
      index: true
    },  
    
    deletedAt: {
      type: Date,
      default: null
    },
    
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    }
  },
  { timestamps: true }
);

const campusSchema = new mongoose.Schema({
  schoolId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "School",
    required: true,
    index: true
  },
  name: { type: String, required: true, trim: true },
  code: { type: String, trim: true, uppercase: true, required : true },
  address: { type: String },
  phone: { type: String },
  isActive: { type: Boolean, default: true },
  isDeleted: {
    type: Boolean,
    default: false,
    index: true
  },
  
  deletedAt: {
    type: Date,
    default: null
  },
  
  deletedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  }
}, { timestamps: true });

const userSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      default: null,
      required: function () {
        return this.role !== "super_admin" && this.role !== "school_owner";
      },
      index: true,
    },
    campusId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Campus", 
      required: function () {
        return ["staff", "teacher", "student", "parent"].includes(this.role);
      },
      index: true
    },
    
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: { type: String, required: false, select: false }, // Made optional for INVITED users
    role: {
      type: String,
      enum: ["super_admin", "school_owner", "admin", "staff", "teacher", "student", "parent"],
      required: true,
    },

    permissions: {
      type: [String],
      default: [],
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "roleProfile",
    },

    roleProfile: {
      type: String,
      enum: ["Student", "Parent", "Teacher", "Staff", "SchoolOwner"],
      required: function () {
        return this.role !== "super_admin";
      }
    },
    status: {
      type: String,
      enum: ["ACTIVE", "SUSPENDED", "INVITED"],
      default: "ACTIVE",
    },
    isFirstLogin: { type: Boolean, default: true },
    inviteToken: { 
      type: String, 
      select: false, // Don't include in queries by default
      default: null 
    },
    inviteExpiresAt: { 
      type: Date, 
      default: null 
    },
    isDeleted: {
      type: Boolean,
      default: false,
      index: true
    },
    
    deletedAt: {
      type: Date,
      default: null
    },
    
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    }
  },
  { timestamps: true }
);

const teacherSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
      index: true
    },
    campusId: { type: mongoose.Schema.Types.ObjectId, ref: "Campus", required: true, index: true }, // new
    name: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    experience: String,
    education: String,
    husband: String,
    dateOfJoining: Date,
    DOB: Date,
    religion: String,
    nationalId: String,
    phone: String,
    address: String,
    profileImage: String,
    salary: {
      amount: { type: Number, default: 0 },
      currency: { type: String, default: "PKR" },
    },
    levelsIds: [{ type: mongoose.Schema.Types.ObjectId, }], // no ref
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // paymentHistory: [
    //   {
    //     month: String,
    //     year: Number,
    //     paidOn: Date,
    //     status: { type: String, enum: ["paid", "pending"], default: "pending" },
    //   },
    // ],
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "SUSPENDED"],
      default: "ACTIVE"
    },
    isDeleted: {
      type: Boolean,
      default: false,
      index: true
    },
    
    deletedAt: {
      type: Date,
      default: null
    },
    
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    }
  },
  { timestamps: true }
);

const studentSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
      index: true
    },
    campusId: { type: mongoose.Schema.Types.ObjectId, ref: "Campus", required: true, index: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    rollNumber: { type: String, required: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
    guardians: [
      {
        parent: { type: mongoose.Schema.Types.ObjectId, ref: "Parent" },
        relation: { type: String, enum: ["Father", "Mother", "Guardian"], required: true }
      }
    ],
    DOB: Date,
    dateOfAdmission: Date,
    studentBirthForm: String,
    religion: String,
    nationality: String,
    address: String,
    phone: String,
    profileImage: String,
    note: String,
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true
    },    
    promotionHistory: [
      {
        fromClass: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
        toClass: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
        fromSession: { type: mongoose.Schema.Types.ObjectId, ref: "Session" },
        toSession: { type: mongoose.Schema.Types.ObjectId, ref: "Session" },
        promotedOn: { type: Date, default: Date.now }
      }
    ],
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "SUSPENDED"],
      default: "ACTIVE"
    },
    isDeleted: {
      type: Boolean,
      default: false,
      index: true
    },
    
    deletedAt: {
      type: Date,
      default: null
    },
    
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    }
    
  },
  { timestamps: true }
);

const schoolOwnerSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: false, // Will be set when school is created
      index: true
    },
    campusId: { type: mongoose.Schema.Types.ObjectId, ref: "Campus", index: true }, // new
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      trim: true
    },
    address: {
      type: String,
      trim: true,
			required: false
    },
    profileImage: {
      type: String
    },
    status: {
      type: String,
      enum: ["ACTIVE", "SUSPENDED"],
      default: "ACTIVE"
    }
  },
  { timestamps: true }
);

const parentSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
      index: true
    },
    campusId: { type: mongoose.Schema.Types.ObjectId, ref: "Campus", required: true, index: true }, // new

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: { type: String, required: true },
    phone: { type: String },
    gender: { type: String, enum: ["male", "female"], required: true },
    occupation: String,
    income: Number,
    nationalId: String,
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "SUSPENDED"],
      default: "ACTIVE"
    },
    isDeleted: {
      type: Boolean,
      default: false,
      index: true
    },
    
    deletedAt: {
      type: Date,
      default: null
    },
    
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    }
  },
  { timestamps: true }
);

const classSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
      index: true
    },
    campusId: { type: mongoose.Schema.Types.ObjectId, ref: "Campus", required: true, index: true }, // new

    name: { type: String, required: true },
    monthlyFee: { type: Number, required: true },
    level: { type: mongoose.Schema.Types.ObjectId, required: true },
    classTeacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
      required: true
    },
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
    isDeleted: {
      type: Boolean,
      default: false,
      index: true
    },
    
    deletedAt: {
      type: Date,
      default: null
    },
    
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    }
  },
  { timestamps: true }
);

const subjectSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
      index: true
    },
    campusId: { type: mongoose.Schema.Types.ObjectId, ref: "Campus", required: true, index: true }, // new

    name: {
      type: String,
      required: true,
      trim: true,
    },

    examMarks: {
      type: Number,
      required: true,
      min: 0,
    },

    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },

    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      index: true
    },
    
    deletedAt: {
      type: Date,
      default: null
    },
    
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    }
  },
  { timestamps: true }
);

const sessionSchema = new mongoose.Schema({
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true,
    index: true
  },
  campusId: { type: mongoose.Schema.Types.ObjectId, ref: "Campus", required: true, index: true }, // new

  name: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

const studentAttendanceSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
      index: true
    },

    campusId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campus",
      required: true,
      index: true
    },

    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
      index: true
    },

    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
      index: true
    },

    date: {
      type: Date,
      required: true,
      index: true
    },

    markedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    markingSource: {
      type: String,
      enum: ["TEACHER", "ADMIN", "SYSTEM"],
      default: "TEACHER"
    },

    records: [
      {
        studentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
          required: true
        },

        status: {
          type: String,
          enum: ["PRESENT", "ABSENT", "LATE", "LEAVE"],
          required: true
        },

        inTime: { type: String, default: null },   // "08:10"
        outTime: { type: String, default: null },  // optional

        remarks: { type: String, default: "" }
      }
    ],

    isFinalized: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const staffAttendanceSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
      index: true
    },

    campusId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campus",
      required: true,
      index: true
    },

    date: {
      type: Date,
      required: true,
      index: true
    },

    records: [
      {
        staffId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Staff",
          required: true
        },

        status: {
          type: String,
          enum: ["PRESENT", "ABSENT", "LATE", "LEAVE", "HALF_DAY"],
          required: true
        },

        inTime: { type: String, default: null },
        outTime: { type: String, default: null },

        remarks: { type: String, default: "" }
      }
    ],

    markedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    isFinalized: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const teacherAttendanceSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
      index: true
    },

    campusId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campus",
      required: true,
      index: true
    },

    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
      index: true
    },

    date: {
      type: Date,
      required: true,
      index: true
    },

    records: [
      {
        teacherId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Teacher",
          required: true
        },

        status: {
          type: String,
          enum: ["PRESENT", "ABSENT", "LATE", "LEAVE"],
          required: true
        },

        inTime: { type: String, default: null },   // "07:45"
        outTime: { type: String, default: null },  // "14:00"

        substituteAssigned: {
          type: Boolean,
          default: false
        },

        substituteTeacherId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Teacher",
          default: null
        },

        remarks: { type: String, default: "" }
      }
    ],

    markedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    markingSource: {
      type: String,
      enum: ["ADMIN", "HR", "SYSTEM"],
      default: "ADMIN"
    },

    isFinalized: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const auditLogSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
      index: true
    },

    campusId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campus",
      default: null,
      index: true
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    action: {
      type: String,
      enum: [
        "CREATE",
        "UPDATE",
        "DELETE",
        "SOFT_DELETE",
        "RESTORE",
        "LOGIN",
        "LOGOUT",
        "LOGIN_FAILED",
        "STATUS_CHANGE",
        "STUDENT_ATTENDANCE_MARKED",
        "STUDENT_ATTENDANCE_UPDATED",
        "STUDENT_ATTENDANCE_FINALIZED",
        "STUDENT_ATTENDANCE_REOPENED",
        "TEACHER_ATTENDANCE_MARKED",
        "TEACHER_ATTENDANCE_UPDATED",
        "TEACHER_ATTENDANCE_FINALIZED",
        "TEACHER_ATTENDANCE_REOPENED",
        "STAFF_ATTENDANCE_MARKED",
        "STAFF_ATTENDANCE_UPDATED",
        "STAFF_ATTENDANCE_FINALIZED",
        "STAFF_ATTENDANCE_REOPENED"
      ],
      required: true,
      index: true
    },

    entity: {
      type: String,
      required: true // "Student", "Teacher", "Class"
    },

    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true
    },

    oldValue: {
      type: mongoose.Schema.Types.Mixed,
      default: null
    },

    newValue: {
      type: mongoose.Schema.Types.Mixed,
      default: null
    },

    ipAddress: {
      type: String
    },

    userAgent: {
      type: String
    },

    remarks: {
      type: String
    }
  },
  { timestamps: true }
);

const PeriodSchema = new mongoose.Schema({
  period: { type: Number, required: true, min: 1 },
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
  startTime: { type: String, required: true },  // "09:00"
  endTime: { type: String, required: true },    // "09:40"
  room: { type: String, trim: true },
  isSubstitute: { type: Boolean, default: false },

  originalTeacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    default: null
  },
  notes: { type: String, default: "" }
});

const DaySchema = new mongoose.Schema({
  day: {
    type: String,
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    required: true
  },
  periods: [PeriodSchema]
});

const TimetableSchema = new mongoose.Schema({
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true,
    index: true
  },
  campusId: { type: mongoose.Schema.Types.ObjectId, ref: "Campus", required: true, index: true }, // new

  classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },

  academicYear: { type: String, default: "" },

  timetable: [DaySchema]
}, { timestamps: true });

const feeStructureSchema = new mongoose.Schema(
  {
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true, index: true },
    campusId: { type: mongoose.Schema.Types.ObjectId, ref: "Campus", required: true, index: true },

    classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },

    monthlyFee: { type: Number, required: true },
    admissionFee: { type: Number, default: 0 },
    examFee: { type: Number, default: 0 },

    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const studentFeeSchema = new mongoose.Schema(
  {
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },
    campusId: { type: mongoose.Schema.Types.ObjectId, ref: "Campus", required: true },

    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    sessionId: { type: mongoose.Schema.Types.ObjectId, ref: "Session", required: true },

    month: { type: String, required: true }, // "August"
    year: { type: Number, required: true },

    amount: { type: Number, required: true },
    paidAmount: { type: Number, default: 0 },

    status: {
      type: String,
      enum: ["PENDING", "PARTIAL", "PAID"],
      default: "PENDING"
    },

    dueDate: Date,
    paidOn: Date
  },
  { timestamps: true }
);

const examSchema = new mongoose.Schema(
  {
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },
    campusId: { type: mongoose.Schema.Types.ObjectId, ref: "Campus", required: true },

    name: { type: String, required: true }, // Mid Term, Final
    sessionId: { type: mongoose.Schema.Types.ObjectId, ref: "Session", required: true },

    startDate: Date,
    endDate: Date
  },
  { timestamps: true }
);

const marksSchema = new mongoose.Schema(
  {
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },
    campusId: { type: mongoose.Schema.Types.ObjectId, ref: "Campus", required: true },

    examId: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },

    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },

    obtainedMarks: { type: Number, required: true },
    totalMarks: { type: Number, required: true }
  },
  { timestamps: true }
);

const salarySlipSchema = new mongoose.Schema(
  {
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },
    campusId: { type: mongoose.Schema.Types.ObjectId, ref: "Campus", required: true },

    employeeType: { type: String, enum: ["TEACHER", "STAFF"], required: true },
    employeeId: { type: mongoose.Schema.Types.ObjectId, required: true },

    month: String,
    year: Number,

    basicSalary: Number,
    deductions: Number,
    netSalary: Number,

    status: { type: String, enum: ["PAID", "UNPAID"], default: "UNPAID" }
  },
  { timestamps: true }
);

	const certificateSchema = new mongoose.Schema(
  {
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },
    campusId: { type: mongoose.Schema.Types.ObjectId, ref: "Campus", required: true },

    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },

    type: {
      type: String,
      enum: ["LEAVING", "BONAFIDE", "CHARACTER"],
      required: true
    },

    issuedOn: { type: Date, default: Date.now },
    issuedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

const leaveRequestSchema = new mongoose.Schema(
  {
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },
    campusId: { type: mongoose.Schema.Types.ObjectId, ref: "Campus", required: true },

    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    leaveType: {
      type: String,
      enum: ["SICK", "CASUAL", "EMERGENCY", "OTHER"],
      required: true
    },

    fromDate: Date,
    toDate: Date,

    reason: String,

    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING"
    },

    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

const levelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

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
      index: true,
    },
    campusId: { type: mongoose.Schema.Types.ObjectId, ref: "Campus", required: true, index: true }, // new

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

      classLevels: [levelSchema],

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