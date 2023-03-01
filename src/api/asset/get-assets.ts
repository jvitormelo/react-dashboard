import { httpClient } from "@/infra/http-client";
import { Asset } from "@/types/entities/asset";

export const getAllAssets = async (): Promise<Asset[]> =>
  httpClient.get("/assets");
