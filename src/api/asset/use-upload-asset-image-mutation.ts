import { queryClient } from "@/infra/query-client";
import { Asset } from "@/types/entities/asset";
import { imageUtils } from "@/utils";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// TODO refactor
export const useUploadAssetImageMutation = () => {
  const uploadImage = async (assetId: number, file: File) => {
    const url = imageUtils.createObjectURL(file);

    await wait(1000);
    // TODO - create merge fn in the cache manager
    queryClient.setQueryData<Asset[]>(["assets"], (assets) => {
      return assets?.map((cachedAsset) =>
        cachedAsset.id === assetId
          ? { ...cachedAsset, image: url }
          : cachedAsset
      );
    });

    queryClient.setQueryData<Asset>(["asset", assetId], (asset) => {
      return asset && { ...asset, image: url };
    });
  };

  return {
    uploadImage,
  };
};
