import { AssetStatus } from "../../constants/asset-status";

type HealthHistory = { status: AssetStatus; timestamp: string };

type Metrics = {
  lastUptimeAt: string;
  totalCollectsUptime: number;
  totalUptime: number;
};

type Specifications = {
  maxTemp: number;
};

export type Asset = {
  assignedUserIds: number[];
  companyId: 1;
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
