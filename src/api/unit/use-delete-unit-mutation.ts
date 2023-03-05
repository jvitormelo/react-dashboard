import { httpClient } from "@/infra/http-client";
import { queryClient } from "@/infra/query-client";
import { Asset } from "@/types/entities/asset";
import { User } from "@/types/entities/user";
import { useMutation } from "@tanstack/react-query";
import { unitCacheActions } from "./actions";

const deleteUnit = async (unitId: number) => {
  return httpClient.delete(`/units/${unitId}`);
};

export const useDeleteUnitMutation = () => {
  return useMutation(deleteUnit, {
    onSuccess: (_, id) => {
      unitCacheActions.deleteUnit(id);

      queryClient.setQueryData(["users"], (oldData: User[] | undefined) => {
        return oldData?.filter((user) => {
          return user.unitId !== id;
        });
      });

      queryClient.setQueryData(["assets"], (oldData: Asset[] | undefined) => {
        return oldData?.filter((asset) => {
          return asset.unitId !== id;
        });
      });
    },
  });
};
