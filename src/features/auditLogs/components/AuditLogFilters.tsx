import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Calendar, X } from "lucide-react";
import Input from "@/components/common/Input";
import { useCampuses } from "@/features/campuses/hooks/useCampuses";
import { useQuery } from "@tanstack/react-query";
import { getAllCampusesApi } from "@/api/campuses";
import { useAuditLogActions } from "../hooks/useAuditLogs";

interface AuditLogFiltersProps {
  showCampusFilter?: boolean;
  userIdLocked?: string;
  userIdLabel?: string;
}

export default function AuditLogFilters({
  showCampusFilter = true,
  userIdLocked,
  userIdLabel,
}: AuditLogFiltersProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useSelector((state: RootState) => state.auth);
  const { campuses: ownerCampuses } = useCampuses();
  
  // For super_admin, fetch campuses directly
  const { data: superAdminCampusesData } = useQuery({
    queryKey: ["campuses", "super_admin"],
    queryFn: getAllCampusesApi,
    enabled: user?.role === "super_admin" && showCampusFilter,
  });

  const campuses = user?.role === "super_admin" 
    ? (superAdminCampusesData?.data || [])
    : ownerCampuses;
    
  const { actions } = useAuditLogActions();

  const action = searchParams.get("action") || "";
  const entity = searchParams.get("entity") || "";
  const campusId = searchParams.get("campusId") || "";
  const fromDate = searchParams.get("fromDate") || "";
  const toDate = searchParams.get("toDate") || "";

  const handleFilterChange = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    newParams.set("page", "1"); // Reset to first page on filter change
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    const newParams = new URLSearchParams();
    if (userIdLocked) {
      newParams.set("userId", userIdLocked);
    }
    setSearchParams(newParams);
  };

  const hasActiveFilters = action || entity || campusId || fromDate || toDate;

  // Common entity types
  const entityTypes = [
    "Student",
    "Teacher",
    "Employee",
    "Class",
    "Subject",
    "Session",
    "Exam",
    "Fee",
    "Campus",
    "School",
    "User",
    "Settings",
    "Certificate",
    "Attendance",
    "Timetable",
    "Leave",
    "Salary",
    "Plan",
  ];

  return (
    <div className="bg-white rounded-lg border border-border shadow-sm p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-primary">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-primary hover:text-primary/80 flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Clear Filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Action Filter */}
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">
            Action
          </label>
          <select
            value={action}
            onChange={(e) => handleFilterChange("action", e.target.value)}
            className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">All Actions</option>
            {actions.map((act) => (
              <option key={act} value={act}>
                {act.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>

        {/* Entity Filter */}
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">
            Entity
          </label>
          <select
            value={entity}
            onChange={(e) => handleFilterChange("entity", e.target.value)}
            className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">All Entities</option>
            {entityTypes.map((ent) => (
              <option key={ent} value={ent}>
                {ent}
              </option>
            ))}
          </select>
        </div>

        {/* Campus Filter */}
        {showCampusFilter && (
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1">
              Campus
            </label>
            <select
              value={campusId}
              onChange={(e) => handleFilterChange("campusId", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="">All Campuses</option>
              {campuses.map((campus) => (
                <option key={campus._id} value={campus._id}>
                  {campus.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* User Filter (if locked) */}
        {userIdLocked && (
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1">
              {userIdLabel || "User"}
            </label>
            <Input
              value={userIdLabel || "Current User"}
              disabled
              className="bg-gray-50 cursor-not-allowed"
            />
          </div>
        )}
      </div>

      {/* Date Range */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">
            From Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
            <Input
              type="date"
              value={fromDate}
              onChange={(e) => handleFilterChange("fromDate", e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">
            To Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
            <Input
              type="date"
              value={toDate}
              onChange={(e) => handleFilterChange("toDate", e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

