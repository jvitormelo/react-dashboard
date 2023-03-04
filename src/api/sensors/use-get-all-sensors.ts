import { useQuery } from "@tanstack/react-query";
import { getAllAssets } from "../asset/get-assets";

export const useGetAllSensors = () => {
  const response = useQuery(["assets"], getAllAssets);

  const data = response.data?.map((asset) => asset.sensors) || [];

  const uniqueModels = new Set(data.flat(2));

  return {
    ...response,
    data: Array.from(uniqueModels),
  };
};
