import { AssetStatus } from "@/constants/asset-status";
import { useFeedbackColors } from "@/hooks/use-colors";
import { Asset } from "@/types/entities/asset";
import { chartUtils } from "@/utils/charts";
import { namesUtils } from "@/utils/names";

interface Props {
  assets: Asset[];
}

type Hook = (props: Props) => {
  formattedAssets: FormattedAsset[];
};

type FormattedAsset = {
  status: AssetStatus;
  name: string;
  y: number;
  color: string;
};

// TODO - create tests
export const useAssetsStatusChart: Hook = ({ assets }) => {
  const { assetStatusToColor } = useFeedbackColors();

  const formattedAssets = chartUtils.groupData<Asset, FormattedAsset>(
    assets,
    (formattedAsset, asset) => formattedAsset.status === asset.status,
    (asset) => ({
      status: asset.status,
      name: namesUtils.getAssetStatusName(asset.status),
      y: 1,
      color: assetStatusToColor(asset.status),
    }),
    (formattedAsset) => {
      formattedAsset.y += 1;
    }
  );

  return {
    formattedAssets,
  };
};
