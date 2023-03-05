import { Company } from "./company";
import { Unit } from "./unit";

export interface User {
  companyId: number;
  email: string;
  id: number;
  name: string;
  unitId: number;
}

export type UserWithUnit = User & {
  unit: Unit;
};

export type UserWithRelation = UserWithUnit & {
  company: Company;
};
