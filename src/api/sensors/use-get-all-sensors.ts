import { useGetAllAssets } from "./../asset/use-get-all-assets";

export const useGetAllSensors = () => {
  const response = useGetAllAssets();

  const data = response.data?.map((asset) => asset.sensors) || [];

  const uniqueModels = new Set(data.flat(2));

  return {
    ...response,
    data: Array.from(uniqueModels),
  };
};
