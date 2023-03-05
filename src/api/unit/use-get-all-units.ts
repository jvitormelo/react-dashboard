import { getAllUnits } from "./use-get-units-by-company";
import { useQuery } from "@tanstack/react-query";

export const useGetAllUnits = () => {
  return useQuery(["units"], getAllUnits);
};
