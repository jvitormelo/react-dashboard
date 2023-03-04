import { AssetModels } from "@/constants/asset-models";
import zod from "@/infra/zod";

export const assetSchema = zod.object({
  name: zod.string(),
  model: zod.nativeEnum(AssetModels),
  sensors: zod.array(zod.string()),
  specifications: zod.object({
    maxTemp: zod.number(),
    power: zod.number().optional().nullable(),
    rpm: zod.number().optional().nullable(),
  }),
});

export type AssetSchema = zod.infer<typeof assetSchema>;