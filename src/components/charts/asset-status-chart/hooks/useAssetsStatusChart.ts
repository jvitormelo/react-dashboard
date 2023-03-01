import {
  assetsStatusColorMapper,
  assetsStatusNameMapper,
  AssetStatus,
} from "@/constants/asset-status";
import { Asset } from "@/types/entities/asset";

interface Props {
  assets: Asset[];
}

type Hook = (props: Props) => {
  formattedAssets: FormattedAssets;
};

type FormattedAssets = {
  status: AssetStatus;
  name: string;
  y: number;
  color: string;
}[];

// TODO - create tests
export const useAssetsStatusChart: Hook = ({ assets }) => {
  const formattedAssets: FormattedAssets = [];

  assets.forEach((asset) => {
    const { status } = asset;

    const assetIndex = formattedAssets.findIndex(
      (formattedAsset) => formattedAsset.status === status
    );

    if (assetIndex === -1) {
      formattedAssets.push({
        status,
        name: assetsStatusNameMapper[status],
        y: 1,
        color: assetsStatusColorMapper[status],
      });
    } else {
      formattedAssets[assetIndex].y += 1;
    }
  });

  return {
    formattedAssets,
  };
};
