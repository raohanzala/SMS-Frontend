import { useState, useCallback } from "react";
import { UserCheck, Plus } from "lucide-react";
import { useSchoolOwners } from "../hooks/useSchoolOwners";
import { useSchoolOwnerById } from "../hooks/useSchoolOwnerById";
import SchoolOwnersTable from "../components/SchoolOwnersTable";
import SchoolOwnerDetailsModal from "../components/SchoolOwnerDetailsModal";
import EmptyState from "@/components/common/EmptyState";
import ErrorMessage from "@/components/common/ErrorMessage";
import Pagination from "@/components/common/Pagination";
import Spinner from "@/components/common/Spinner";
import SearchBar from "@/components/common/SearchBar";
import Filter from "@/components/common/Filter";
import { SchoolOwner } from "../types/schoolOwners.types";

export default function SchoolOwnersPage() {
  const [selectedOwnerId, setSelectedOwnerId] = useState<string | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const { owners, pagination, isSchoolOwnersLoading, schoolOwnersError } = useSchoolOwners();
  const { owner: ownerDetails, isSchoolOwnerLoading, schoolOwnerError } = useSchoolOwnerById(
    selectedOwnerId || undefined
  );

  const handleViewDetails = useCallback((owner: SchoolOwner) => {
    setSelectedOwnerId(owner._id);
    setIsDetailsModalOpen(true);
  }, []);

  const handleCloseDetailsModal = useCallback(() => {
    setIsDetailsModalOpen(false);
    setSelectedOwnerId(null);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">School Owners</h1>
        <p className="text-sm text-text-secondary mt-1">
          Manage and view all school owners in the system
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <SearchBar placeholder="Search owners by name or email..." />
        </div>
        <Filter
          paramKey="status"
          options={[
            { value: "ACTIVE", label: "Active" },
            { value: "SUSPENDED", label: "Suspended" },
          ]}
        />
        <Filter
          paramKey="hasSchool"
          options={[
            { value: "true", label: "Has School" },
            { value: "false", label: "No School" },
          ]}
        />
      </div>

      {isSchoolOwnersLoading && (
        <div className="flex justify-center py-6">
          <Spinner />
        </div>
      )}

      {schoolOwnersError && (
        <ErrorMessage
          message={schoolOwnersError.message || "Failed to load school owners"}
          onRetry={() => window.location.reload()}
        />
      )}

      {!isSchoolOwnersLoading && !schoolOwnersError && (
        <>
          {!owners || owners.length === 0 ? (
            <EmptyState
              icon={UserCheck}
              title="No School Owners Found"
              description="There are no school owners matching your filters."
            />
          ) : (
            <>
              <SchoolOwnersTable
                owners={owners}
                onViewDetails={handleViewDetails}
              />
              {pagination && (
                <Pagination
                  pagination={{
                    currentPage: pagination.currentPage,
                    totalPages: pagination.totalPages,
                    totalStudents: pagination.totalOwners,
                    hasNextPage: pagination.hasNextPage,
                    hasPrevPage: pagination.hasPrevPage,
                    limit: pagination.limit,
                  }}
                />
              )}
            </>
          )}
        </>
      )}

      <SchoolOwnerDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        owner={ownerDetails || null}
        isLoading={isSchoolOwnerLoading}
      />
    </div>
  );
}

