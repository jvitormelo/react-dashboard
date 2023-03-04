import { AssetModels } from "@/constants/asset-models";
import { AssetStatus } from "../../constants/asset-status";
import { User } from "./user";

export type HealthHistory = { status: AssetStatus; timestamp: string };

type Metrics = {
  lastUptimeAt: string;
  totalCollectsUptime: number;
  totalUptime: number;
};

export type Specifications = {
  maxTemp: number;
  power?: number;
  rpm?: number;
};

export type Asset = {
  assignedUserIds: number[];
  companyId: number;
  healthHistory: HealthHistory[];
  healthscore: number;
  id: number;
  image: string;
  metrics: Metrics;
  model: AssetModels;
  name: string;
  sensors: string[];
  specifications: Specifications;
  status: AssetStatus;
  unitId: number;
};

export type AssetWithUsers = Asset & {
  users: User[];
};
