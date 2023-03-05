import { useGetUserWorkOrders } from "./../../../api/work-orders/use-get-user-work-orders";
import { useGetUser } from "@/api/user/use-get-user";

export const useUserViewData = (companyId: number) => {
  const { data: userData, isLoading: isUserLoading } = useGetUser(companyId, {
    relations: true,
  });

  const { data: userWorkOrders } = useGetUserWorkOrders(companyId);
  // const userWorkOrders = useGetWorkOrdersBy;

  return {
    userWorkOrders,
    user: userData,
    isLoading: isUserLoading,
  };
};
