export enum AssetStatus {
  InOperation = "inOperation",
  InDowntime = "inDowntime",
  InAlert = "inAlert",
  UnplannedStop = "unplannedStop",
}

export const assetsStatusNameMapper = {
  [AssetStatus.InOperation]: "In operation",
  [AssetStatus.InDowntime]: "In downtime",
  [AssetStatus.InAlert]: "In alert",
  [AssetStatus.UnplannedStop]: "Unplanned stop ",
};

export const assetsStatusColorMapper = {
  // TODO temporary hardcoded colors
  [AssetStatus.InOperation]: "#00C853",
  [AssetStatus.InDowntime]: "#FF5733",
  [AssetStatus.InAlert]: "#FFD600",
  [AssetStatus.UnplannedStop]: "#D50000",
};
