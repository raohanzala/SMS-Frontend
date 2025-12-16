import DeleteButton from "@/components/common/DeleteButton";
import EditButton from "@/components/common/EditButton";
import { SelectableCard } from "@/components/common/SelectableCard";
import React from "react";
import { SessionsCardsProps } from "../types/session-components.types";
import { Session } from "../types/session.types";
import { formatShortDate } from "@/utils/helpers";

const SessionsCards = React.memo(
  ({ sessions, onEditSession, onDeleteSession, selectedSessions, onToggleSelect }: SessionsCardsProps) => {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sessions?.map((sessionItem) => {
          const isSelected = selectedSessions.has(sessionItem._id);

          return (
            <SessionCard
              key={sessionItem._id}
              sessionItem={sessionItem}
              isSelected={isSelected}
              onToggleSelect={onToggleSelect}
              onEditSession={onEditSession}
              onDeleteSession={onDeleteSession}
            />
          );
        })}
      </div>
    );
  }
);

SessionsCards.displayName = "SessionsCards";

interface SessionCardProps {
  sessionItem: Session;
  isSelected: boolean;
  onToggleSelect: (sessionId: string) => void;
  onEditSession: (sessionItem: Session) => void;
  onDeleteSession: (sessionId: string) => void;
}

const SessionCard = ({
  sessionItem,
  isSelected,
  onToggleSelect,
  onEditSession,
  onDeleteSession,
}: SessionCardProps) => {
  return (
    <SelectableCard
      isSelected={isSelected}
      onToggleSelect={() => onToggleSelect(sessionItem._id)}
      className="flex flex-col relative"
    >
      {/* Top Section - Session Name */}
      <div className="flex items-center space-x-4 mb-3">
        <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200">
          <span className="text-lg font-bold text-blue-700">
            {sessionItem.name?.charAt(0) || "S"}
          </span>
        </div>
        <div>
          <h4 className="text-base font-semibold text-gray-900">
            {sessionItem.name}
          </h4>
          <p className="text-xs text-gray-500">
            {formatShortDate(sessionItem.startDate)} - {formatShortDate(sessionItem.endDate)}
          </p>
        </div>
      </div>

      {/* Status */}
      <div className="mt-2">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            sessionItem.isActive
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {sessionItem.isActive ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Created Date */}
      {sessionItem.createdAt && (
        <div className="mt-2 text-xs text-gray-400">
          Created: {formatShortDate(sessionItem.createdAt)}
        </div>
      )}

      {/* Actions */}
      <div className="mt-4 flex justify-end space-x-2">
        <EditButton onClick={() => onEditSession(sessionItem)} />
        <DeleteButton onClick={() => onDeleteSession(sessionItem._id)} />
      </div>
    </SelectableCard>
  );
};

export default SessionsCards;

