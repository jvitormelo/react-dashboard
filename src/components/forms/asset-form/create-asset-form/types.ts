import { AssetSchema } from "../schema";

export type SubmitCreateAssetParams = {
  assetInfo: AssetSchema;
  image: File;
};
