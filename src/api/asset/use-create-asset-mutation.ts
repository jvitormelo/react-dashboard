import { AssetStatus } from "@/constants/asset-status";
import { httpClient } from "@/infra/http-client";
import { queryClient } from "@/infra/query-client";
import { Asset } from "@/types/entities/asset";
import { useMutation } from "@tanstack/react-query";

type CreateAsset = Omit<
  Asset,
  "id" | "healthHistory" | "healthscore" | "metrics" | "status"
>;

const createAsset = (
  input: CreateAsset
): Promise<CreateAsset & { id: number }> => {
  return httpClient.post("/assets", input);
};

export const useCreateAssetMutation = () => {
  return useMutation(createAsset, {
    onSuccess: (data) => {
      // TODO - move to a factory
      const assetWithRandomData: Asset = {
        ...data,
        healthHistory: [
          {
            status: AssetStatus.InOperation,
            timestamp: "2023-01-01T16:25:28.989Z",
          },
        ],
        healthscore: 99,
        metrics: {
          lastUptimeAt: "2023-01-01T16:25:28.989Z",
          totalCollectsUptime: 9999,
          totalUptime: 9999,
        },
        status: AssetStatus.InOperation,
      };

      queryClient.setQueryData<Asset[]>(["assets"], (oldData) => {
        return [...(oldData || []), assetWithRandomData];
      });
    },
  });
};
