import { Student } from "../types/student.types";

export interface FamilyMember {
  _id: string;
  name: string;
  gender: "male" | "female" | "other" | "";
  email?: string;
  phone?: string;
  rollNumber?: string;
  class?: {
    _id: string;
    name: string;
  };
  profileImage?: string;
  relation?: "Father" | "Mother";
}

export interface Family {
  familyId: string;
  father: FamilyMember | null;
  mother: FamilyMember | null;
  children: FamilyMember[];
}

/**
 * Groups students by their family (based on parent IDs)
 */
export function groupStudentsByFamily(students: Student[]): Family[] {
  const familyMap = new Map<string, Family>();

  students.forEach((student) => {
    if (!student.guardians || student.guardians.length === 0) {
      // Students without guardians get their own family entry
      const orphanFamilyId = `orphan-${student._id}`;
      if (!familyMap.has(orphanFamilyId)) {
        familyMap.set(orphanFamilyId, {
          familyId: orphanFamilyId,
          father: null,
          mother: null,
          children: [],
        });
      }
      const family = familyMap.get(orphanFamilyId)!;
      family.children.push({
        _id: student._id,
        name: student.name,
        gender: student.gender,
        email: student.email,
        phone: student.phone,
        rollNumber: student.rollNumber,
        class: student.class,
        profileImage: student.profileImage,
      });
      return;
    }

    // Find father and mother from guardians
    const fatherGuardian = student.guardians.find(
      (g) => g.relation === "Father"
    );
    const motherGuardian = student.guardians.find(
      (g) => g.relation === "Mother"
    );

    // Create a unique family ID based on parent IDs
    const fatherId = fatherGuardian?.parent?._id || "no-father";
    const motherId = motherGuardian?.parent?._id || "no-mother";
    const familyId = `${fatherId}-${motherId}`;

    if (!familyMap.has(familyId)) {
      familyMap.set(familyId, {
        familyId,
        father: fatherGuardian
          ? {
              _id: fatherGuardian.parent._id,
              name: fatherGuardian.parent.name,
              gender: "male",
              phone: fatherGuardian.parent.phone,
              relation: "Father",
            }
          : null,
        mother: motherGuardian
          ? {
              _id: motherGuardian.parent._id,
              name: motherGuardian.parent.name,
              gender: "female",
              phone: motherGuardian.parent.phone,
              relation: "Mother",
            }
          : null,
        children: [],
      });
    }

    const family = familyMap.get(familyId)!;
    family.children.push({
      _id: student._id,
      name: student.name,
      gender: student.gender,
      email: student.email,
      phone: student.phone,
      rollNumber: student.rollNumber,
      class: student.class,
      profileImage: student.profileImage,
    });
  });

  return Array.from(familyMap.values());
}

