import { useGetAllWorkOrders } from "./use-get-all-work-orders";

export const useGetUserWorkOrders = (userId: number) => {
  const response = useGetAllWorkOrders({
    enabled: !!userId,
    relations: true,
  });

  const data = response.data?.filter((workOrder) =>
    workOrder.assignedUserIds.includes(userId)
  );

  return {
    ...response,
    data,
  };
};
