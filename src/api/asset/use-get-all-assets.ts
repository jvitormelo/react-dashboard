import { useQuery } from "@tanstack/react-query";
import { getAllAssets } from "./get-assets";

export const useGetAllAssets = () => {
  return useQuery(["assets"], getAllAssets);
};
