import { Asset } from "@/types/entities/asset";
import { numberUtils } from "@/utils";
import { Skeleton } from "antd";
import { memo } from "react";

interface Props {
  assets?: Asset[];

  loading?: boolean;
}

export const AssetsInfo = memo(({ assets, loading }: Props) => {
  if (loading) {
    return <Skeleton></Skeleton>;
  }

  if (!assets) {
    return <div>No Data</div>;
  }

  const totalAssets = assets.length;

  const averageHealthScore = numberUtils.calculateAverage(
    assets.map((asset) => asset.healthscore)
  );

  return (
    <div>
      <h1>
        Total assets: <span>{totalAssets}</span>{" "}
      </h1>
      <h2>
        Average Health Score : <span>{averageHealthScore}</span>{" "}
      </h2>
    </div>
  );
});
