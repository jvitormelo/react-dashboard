import { useGetAllUsers } from "./use-get-all-users";

export const useGetUsersByUnit = (unitId: number) => {
  const response = useGetAllUsers({
    enabled: !!unitId,
  });

  const data = response.data?.filter((user) => user.unitId === unitId);

  return {
    ...response,
    data,
  };
};
