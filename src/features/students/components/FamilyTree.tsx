import React from "react";
import { Family, FamilyMember } from "../utils/familyUtils";
import { FiUser, FiMail, FiPhone, FiBook } from "react-icons/fi";

interface FamilyTreeProps {
  families: Family[];
}

const FamilyTree: React.FC<FamilyTreeProps> = ({ families }) => {
  const getAvatarSrc = (member: FamilyMember) => {
    if (member.profileImage) return member.profileImage;
    if (member.gender === "female") return "/female-student-avatar.jpg";
    if (member.gender === "male") return "/male-student-avatar.jpg";
    return "/male-student-avatar.jpg";
  };

  const getParentAvatarSrc = (gender: "male" | "female") => {
    if (gender === "female") return "/female-teacher-avatar.jpg";
    return "/male-teacher-avatar.jpg";
  };

  return (
    <div className="space-y-12">
      {families.map((family) => (
        <div
          key={family.familyId}
          className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
        >
          {/* Family Header */}
          <div className="mb-8 pb-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">
              {family.father?.name && family.mother?.name
                ? `${family.father.name} & ${family.mother.name} Family`
                : family.father?.name
                ? `${family.father.name} Family`
                : family.mother?.name
                ? `${family.mother.name} Family`
                : "Family"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {family.children.length} {family.children.length === 1 ? "Child" : "Children"}
            </p>
          </div>

          {/* Family Tree Structure */}
          <div className="relative">
            {/* Parents Row */}
            {(family.father || family.mother) && (
              <div className="flex justify-center gap-8 mb-12">
                {/* Father */}
                {family.father && (
                  <div className="flex flex-col items-center">
                    <div className="relative group">
                      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-1 shadow-lg">
                        <img
                          src={getParentAvatarSrc("male")}
                          alt={family.father.name}
                          className="w-24 h-24 rounded-full object-cover border-4 border-white"
                        />
                      </div>
                      <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        Father
                      </div>
                    </div>
                    <div className="mt-4 text-center max-w-[150px]">
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {family.father.name}
                      </h3>
                      {family.father.phone && (
                        <div className="flex items-center justify-center gap-1 text-sm text-gray-600 mt-1">
                          <FiPhone className="w-3 h-3" />
                          <span>{family.father.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Connection Line */}
                {family.father && family.mother && (
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-blue-400 to-pink-400"></div>
                )}

                {/* Mother */}
                {family.mother && (
                  <div className="flex flex-col items-center">
                    <div className="relative group">
                      <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-full p-1 shadow-lg">
                        <img
                          src={getParentAvatarSrc("female")}
                          alt={family.mother.name}
                          className="w-24 h-24 rounded-full object-cover border-4 border-white"
                        />
                      </div>
                      <div className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        Mother
                      </div>
                    </div>
                    <div className="mt-4 text-center max-w-[150px]">
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {family.mother.name}
                      </h3>
                      {family.mother.phone && (
                        <div className="flex items-center justify-center gap-1 text-sm text-gray-600 mt-1">
                          <FiPhone className="w-3 h-3" />
                          <span>{family.mother.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Connection Line from Parents to Children */}
            {family.children.length > 0 && (family.father || family.mother) && (
              <div className="flex justify-center mb-8">
                <div className="w-0.5 h-8 bg-gradient-to-b from-gray-300 to-gray-200"></div>
              </div>
            )}

            {/* Children Row */}
            {family.children.length > 0 && (
              <div className="relative">
                {/* Horizontal line connecting all children (only if multiple) */}
                {family.children.length > 1 && (
                  <div className="absolute top-0 left-0 right-0 flex justify-center">
                    <div className="w-full max-w-4xl h-0.5 bg-gray-300"></div>
                  </div>
                )}
                <div className="flex flex-wrap justify-center gap-6 pt-8">
                  {family.children.map((child) => (
                    <div
                      key={child._id}
                      className="flex flex-col items-center group relative"
                    >
                      {/* Connection Line from horizontal line to child */}
                      {family.children.length > 1 && (
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gray-300"></div>
                      )}

                    <div className="relative">
                      <div
                        className={`rounded-full p-1 shadow-lg ${
                          child.gender === "female"
                            ? "bg-gradient-to-br from-pink-400 to-pink-500"
                            : "bg-gradient-to-br from-blue-400 to-blue-500"
                        }`}
                      >
                        <img
                          src={getAvatarSrc(child)}
                          alt={child.name}
                          className="w-20 h-20 rounded-full object-cover border-4 border-white"
                        />
                      </div>
                      <div
                        className={`absolute -top-2 -right-2 text-white text-xs font-semibold px-2 py-1 rounded-full ${
                          child.gender === "female" ? "bg-pink-500" : "bg-blue-500"
                        }`}
                      >
                        {child.gender === "female" ? "Girl" : "Boy"}
                      </div>
                    </div>

                    {/* Child Info Card */}
                    <div className="mt-4 bg-gray-50 rounded-xl p-4 min-w-[200px] max-w-[220px] border border-gray-200 hover:shadow-md transition-shadow">
                      <h3 className="font-semibold text-gray-900 text-center mb-2">
                        {child.name}
                      </h3>
                      
                      {child.rollNumber && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <FiBook className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{child.rollNumber}</span>
                        </div>
                      )}

                      {child.class?.name && (
                        <div className="text-sm text-gray-600 mb-2">
                          <span className="font-medium">Class:</span> {child.class.name}
                        </div>
                      )}

                      {child.email && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                          <FiMail className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{child.email}</span>
                        </div>
                      )}

                      {child.phone && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FiPhone className="w-3 h-3 flex-shrink-0" />
                          <span>{child.phone}</span>
                        </div>
                      )}
                    </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No Parents Case */}
            {!family.father && !family.mother && family.children.length > 0 && (
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-4">Students without assigned guardians</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FamilyTree;

