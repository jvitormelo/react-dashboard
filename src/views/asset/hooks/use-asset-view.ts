import { useGetAsset } from "@/api/asset/use-get-asset";
import { useParams } from "react-router-dom";

export const useAssetView = () => {
  const { assetId } = useParams();

  const { data, isLoading: isAssetLoading } = useGetAsset(Number(assetId));

  return {
    asset: data,

    isAssetLoading,
  };
};
