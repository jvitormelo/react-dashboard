import { useGetUser } from "@/api/user/use-get-user";

export const useUserViewData = (companyId: number) => {
  const { data: userData, isLoading: isUserLoading } = useGetUser(companyId, {
    relations: true,
  });

  // const userWorkOrders = useGetWorkOrdersBy;

  return {
    user: userData,
    isLoading: isUserLoading,
  };
};
