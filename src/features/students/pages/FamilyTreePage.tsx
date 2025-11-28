import React from "react";
import { FiUsers, FiGitBranch } from "react-icons/fi";
import EmptyState from "../../../components/common/EmptyState";
import ErrorMessage from "../../../components/common/ErrorMessage";
import Spinner from "../../../components/common/Spinner";
import FamilyTree from "../components/FamilyTree";
import { useAllStudents } from "../hooks/useAllStudents";
import { groupStudentsByFamily } from "../utils/familyUtils";
import { usePageTitle } from "../../../hooks/usePageTitle";

const FamilyTreePage: React.FC = () => {
  usePageTitle("Family Tree");
  
  const { students, isStudentsLoading, studentsError } = useAllStudents();
  const families = React.useMemo(
    () => groupStudentsByFamily(students || []),
    [students]
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FiGitBranch className="text-blue-600" />
            Family Tree
          </h1>
          <p className="text-gray-600 mt-2">
            View all families and their relationships in the school
          </p>
        </div>
      </div>

      {/* Loading State */}
      {isStudentsLoading && (
        <div className="flex justify-center py-12">
          <Spinner />
        </div>
      )}

      {/* Error State */}
      {studentsError && (
        <ErrorMessage
          message={studentsError.message || "Failed to load family data"}
          onRetry={() => window.location.reload()}
        />
      )}

      {/* Content */}
      {!isStudentsLoading && !studentsError && (
        <>
          {families.length === 0 ? (
            <EmptyState
              icon={FiUsers}
              title="No Families Found"
              description="No student families are available to display."
            />
          ) : (
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg">
                    <span className="font-semibold">{families.length}</span>{" "}
                    {families.length === 1 ? "Family" : "Families"}
                  </div>
                  <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg">
                    <span className="font-semibold">{students?.length || 0}</span>{" "}
                    Total Students
                  </div>
                </div>
              </div>
              <FamilyTree families={families} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FamilyTreePage;

