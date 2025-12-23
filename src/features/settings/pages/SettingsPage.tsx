import { useState } from "react";
import { Settings, Book, Clock, UserCheck, Image } from "lucide-react";
import Spinner from "@/components/common/Spinner";
import ErrorMessage from "@/components/common/ErrorMessage";
import { useSettings } from "../hooks/useSettings";
import GeneralSettingsSection from "../components/GeneralSettingsSection";
import AcademicSettingsSection from "../components/AcademicSettingsSection";
import TimetableSettingsSection from "../components/TimetableSettingsSection";
import AttendanceSettingsSection from "../components/AttendanceSettingsSection";
import BrandingSettingsSection from "../components/BrandingSettingsSection";

type SettingsSection = "general" | "academic" | "timetable" | "attendance" | "branding";

const SETTINGS_SECTIONS = [
  { id: "general", label: "General", icon: <Settings className="w-4 h-4" /> },
  { id: "academic", label: "Academic", icon: <Book className="w-4 h-4" /> },
  { id: "timetable", label: "Timetable", icon: <Clock className="w-4 h-4" /> },
  { id: "attendance", label: "Attendance", icon: <UserCheck className="w-4 h-4" /> },
  { id: "branding", label: "Branding", icon: <Image className="w-4 h-4" /> },
];

const SettingsPage = () => {
  const {settings, isSettingsLoading, settingsError } = useSettings();
  // const isSettingsLoading = false;
  // const settingsError = null;
  // const settings = {
  //   _id: "665f1a9d8c9a0c12ab123456",
  //   schoolId: "665f1a1b2c3d4e5f6a789012",
  
  //   general: {
  //     schoolName: "Bright Future Public School",
  //     timezone: "Asia/Karachi",
  //     locale: "en-PK",
  //     workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  //     weekendDays: ["Saturday", "Sunday"]
  //   },
  
  //   academic: {
  //     academicYear: "2024-2025",
  //     gradingSystem: "percentage",
  //     passPercentage: 40
  //   },
  
  //   timetable: {
  //     defaultSchoolTiming: {
  //       startTime: "08:00",
  //       endTime: "14:00"
  //     },
  
  //     defaultPeriodConfig: {
  //       periodDuration: 40,
  //       totalPeriods: 7,
  //       breakAfterPeriods: 3,
  //       breakDuration: 20
  //     },
  
  //     classLevels: [
  //       {
  //         _id: "665f1b001111111111111111",
  //         name: "Primary",
  //         classIds: [
  //           {
  //             _id: "665f1b2a2222222222222222",
  //             name: "Class 1-A"
  //           },
  //           {
  //             _id: "665f1b2a3333333333333333",
  //             name: "Class 2-A"
  //           }
  //         ],
  //         timings: {
  //           startTime: "08:00",
  //           endTime: "12:30",
  //           breakTime: {
  //             startTime: "10:00",
  //             duration: 20
  //           },
  //           periodConfig: {
  //             periodDuration: 35,
  //             totalPeriods: 6,
  //             breakAfterPeriods: 3
  //           }
  //         }
  //       },
  //       {
  //         _id: "665f1b004444444444444444",
  //         name: "High",
  //         classIds: [
  //           {
  //             _id: "665f1b2a5555555555555555",
  //             name: "Class 9-A"
  //           },
  //           {
  //             _id: "665f1b2a6666666666666666",
  //             name: "Class 10-A"
  //           }
  //         ],
  //         timings: {
  //           startTime: "08:30",
  //           endTime: "14:00",
  //           breakTime: {
  //             startTime: "11:00",
  //             duration: 30
  //           },
  //           periodConfig: {
  //             periodDuration: 45,
  //             totalPeriods: 7,
  //             breakAfterPeriods: 4
  //           }
  //         }
  //       }
  //     ],
  
  //     classWiseOverrides: [
  //       {
  //         _id: "665f1c001234567890abcdef",
  //         classId: {
  //           _id: "665f1b2a7777777777777777",
  //           name: "Class 5-B"
  //         },
  //         startTime: "09:00",
  //         endTime: "13:00",
  //         breakTime: {
  //           startTime: "11:00",
  //           duration: 15
  //         },
  //         periodConfig: {
  //           periodDuration: 40,
  //           totalPeriods: 6,
  //           breakAfterPeriods: 3,
  //           breakDuration: 15
  //         }
  //       }
  //     ]
  //   },
  
  //   attendance: {
  //     autoMarkAbsentAfter: 15,
  //     allowLateEntry: true,
  //     lateAfterMinutes: 10
  //   },
  
  //   branding: {
  //     logo: "https://cdn.yourapp.com/schools/bright-future/logo.png",
  //     primaryColor: "#2563EB",
  //     secondaryColor: "#F59E0B",
  //     theme: "light"
  //   },
  
  //   version: 3,
  //   createdBy: "665f18f88888888888888888",
  //   updatedBy: "665f18f99999999999999999",
  
  //   createdAt: "2024-06-10T08:12:45.123Z",
  //   updatedAt: "2024-07-02T11:34:22.456Z"
  // }
  
  const [activeSection, setActiveSection] = useState<SettingsSection>("general");

  if (isSettingsLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner />
      </div>
    );
  }

  if (settingsError) {
    return (
      <ErrorMessage
        message={settingsError.message || "Failed to load settings"}
        onRetry={() => window.location.reload()}
      />
    );
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case "general":
        return <GeneralSettingsSection settings={settings} />;
      case "academic":
        return <AcademicSettingsSection settings={settings} />;
      case "timetable":
        return <TimetableSettingsSection settings={settings} />;
      case "attendance":
        return <AttendanceSettingsSection settings={settings} />;
      case "branding":
        return <BrandingSettingsSection settings={settings} />;
      default:
        return <GeneralSettingsSection settings={settings} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-text-primary mb-2">School Settings</h1>
        <p className="text-sm text-text-secondary">
          Configure your school settings across different sections
        </p>
      </div>

      <div className="bg-white rounded-2xl border mb-6 overflow-hidden">
        <div>
          <nav className="flex overflow-x-auto scrollbar-hide" aria-label="Settings Tabs">
            {SETTINGS_SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id as SettingsSection)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all whitespace-nowrap border-b-2 ${
                  activeSection === section.id
                    ? "border-primary text-primary bg-primary/5"
                    : "border-transparent text-text-secondary hover:text-text-primary hover:bg-bg-secondary"
                }`}
              >
                {section.icon}
                <span>{section.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

        <div>
        {renderActiveSection()}
      </div>
    </div>
  );
};

export default SettingsPage;
