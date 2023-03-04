import { httpClient } from "@/infra/http-client";
import { queryClient } from "@/infra/query-client";
import { Asset } from "@/types/entities/asset";
import { useMutation } from "@tanstack/react-query";

const deleteAsset = async (id: number): Promise<void> => {
  return httpClient.delete(`/assets/${id}`);
};

export const useDeleteAssetMutation = () => {
  return useMutation(deleteAsset, {
    onSuccess: (_, id) => {
      queryClient.setQueryData<Asset[]>(["assets"], (oldData) => {
        return oldData?.filter((asset) => asset.id !== id) ?? [];
      });

      // TODO > change to this in all place
      // Better way to remove
      queryClient.removeQueries(["asset", id]);
    },
  });
};
