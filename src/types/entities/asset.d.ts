import { AssetStatus } from "../../constants/asset-status";

export type HealthHistory = { status: AssetStatus; timestamp: string };

type Metrics = {
  lastUptimeAt: string;
  totalCollectsUptime: number;
  totalUptime: number;
};

type Specifications = {
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
  // maybe enum?
  model: string;
  name: string;
  sensors: string[];
  specifications: Specifications;
  status: AssetStatus;
  unitId: number;
};
