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

export const assetStatusArray = Object.values(AssetStatus);
