import { httpClient } from "@/infra/http-client";
import { queryClient } from "@/infra/query-client";
import { Asset } from "@/types/entities/asset";
import { useMutation } from "@tanstack/react-query";

type UpdateAsset = Omit<Asset, "image">;

const updateAsset = async (asset: UpdateAsset): Promise<Asset> => {
  return httpClient.put(`/assets/${asset.id}`, asset);
};

export const useUpdateAssetMutation = () => {
  return useMutation(updateAsset, {
    onSuccess: (data) => {
      queryClient.setQueryData<Asset[]>(["assets"], (assets) => {
        return assets?.map((cachedAsset) =>
          cachedAsset.id === data.id
            ? {
                ...data,
                image: cachedAsset.image,
              }
            : cachedAsset
        );
      });

      queryClient.setQueryData<Asset>(
        ["asset", data.id],
        (oldData) =>
          oldData && {
            ...data,
            image: oldData?.image,
          }
      );
    },
  });
};
