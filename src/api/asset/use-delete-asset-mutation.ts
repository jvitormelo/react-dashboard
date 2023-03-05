import { httpClient } from "@/infra/http-client";
import { useMutation } from "@tanstack/react-query";
import { assetCacheActions } from "./actions";

const deleteAsset = async (id: number): Promise<void> => {
  return httpClient.delete(`/assets/${id}`);
};

export const useDeleteAssetMutation = () => {
  return useMutation(deleteAsset, {
    onSuccess: (_, id) => {
      assetCacheActions.deleteAsset(id);
    },
  });
};
