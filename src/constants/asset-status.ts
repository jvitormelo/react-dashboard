export enum AssetStatus {
  InOperation = "inOperation",
  InAlert = "inAlert",
  UnplannedStop = "unplannedStop",
  PlannedStop = "plannedStop",
  InDowntime = "inDowntime",
}

export const assetsStatusNameMapper = {
  [AssetStatus.InOperation]: "In operation",
  [AssetStatus.InDowntime]: "In downtime",
  [AssetStatus.InAlert]: "In alert",
  [AssetStatus.UnplannedStop]: "Unplanned stop",
  [AssetStatus.PlannedStop]: "Planned stop",
};

export const assetsStatusColorMapper = {
  [AssetStatus.InOperation]: "#52c41a",
  [AssetStatus.InAlert]: "#D33F49",
  [AssetStatus.UnplannedStop]: "#F9D46B",
  [AssetStatus.PlannedStop]: "#29B6AF",
  [AssetStatus.InDowntime]: "#BBBBBB",
};

export const assetStatusArray = Object.values(AssetStatus);
