import { AssetModels } from "@/constants/asset-models";
import zod from "@/infra/zod";

export const assetSchema = zod.object({
  name: zod.string().min(1).max(50),
  model: zod.nativeEnum(AssetModels),
  sensors: zod.array(zod.string()).min(1),
  specifications: zod.object({
    maxTemp: zod.number(),
    power: zod.number().optional(),
    rpm: zod.number().optional(),
  }),
});

export type AssetSchema = zod.infer<typeof assetSchema>;
