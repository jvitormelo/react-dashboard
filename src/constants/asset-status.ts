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
  [AssetStatus.InDowntime]: "#FFD600",
  [AssetStatus.InAlert]: "#FF6D00",
  [AssetStatus.UnplannedStop]: "#D50000",
};

// TODO - move to another place
export const getAssetStatusName = (status: AssetStatus | string) => {
  if (status in assetsStatusNameMapper) {
    return assetsStatusNameMapper[status as AssetStatus];
  }

  return status;
};
