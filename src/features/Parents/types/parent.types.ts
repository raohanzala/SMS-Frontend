import { User } from "../../../types/user.types";
import { Student } from "../../students/types/student.types";

export interface Parent extends User {
  children?: Student[];
}
