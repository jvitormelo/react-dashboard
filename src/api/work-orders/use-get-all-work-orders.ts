import { useQuery } from "@tanstack/react-query";
import { getWorkOrders } from "./get-work-orders";
export const useGetAllWorkOrders = () => {
  return useQuery(["workorders"], getWorkOrders);
};
