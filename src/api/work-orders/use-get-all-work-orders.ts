import { httpClient } from "@/infra/http-client";
import { WorkOrder, WorkOrderWithUsers } from "@/types/entities";
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { useGetAllUsers } from "../user/use-get-all-users";

export const getWorkOrders = (): Promise<WorkOrder[]> =>
  httpClient.get("/workorders");

type DefaultResult = UseQueryResult<WorkOrder[]>;

type ResultWithRelations = UseQueryResult<WorkOrderWithUsers[]>;

type DefaultParams = UseQueryOptions<WorkOrder[]> & {
  relations?: false;
};

type ParamWIthRelations = UseQueryOptions<WorkOrder[]> & {
  relations: true;
};

export function useGetAllWorkOrders(): DefaultResult;

export function useGetAllWorkOrders(options: DefaultParams): DefaultResult;

export function useGetAllWorkOrders(
  options: ParamWIthRelations
): ResultWithRelations;

export function useGetAllWorkOrders(
  options?: DefaultParams | ParamWIthRelations
) {
  const response = useQuery<WorkOrder[]>(
    ["workorders"],
    getWorkOrders,
    options
  );

  const { data: users = [], isLoading: isUsersLoadings } = useGetAllUsers({
    enabled: !!options?.relations,
  });

  if (options?.relations) {
    const data = response.data?.map((workOrder) => ({
      ...workOrder,
      users: users.filter((user) =>
        workOrder.assignedUserIds.includes(user.id)
      ),
    }));

    return {
      ...response,
      data,
      isLoading: response.isLoading || isUsersLoadings,
    } as UseQueryResult<WorkOrderWithUsers[]>;
  }

  return response;
}
