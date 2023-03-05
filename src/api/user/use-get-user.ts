import { useGetCompany } from "./../company/use-get-company";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { httpClient } from "@/infra/http-client";
import { User, UserWithRelation } from "@/types/entities";
import { useGetUnit } from "../unit/use-get-unit";

const getUserById = (userId: number): Promise<User> => {
  return httpClient.get(`users/${userId}`);
};

type Options = {
  relations?: boolean;
};

type OptionsWithRelation = {
  relations: true;
};

type UserResult = UseQueryResult<User, unknown>;
type UserWithRelationResult = UseQueryResult<UserWithRelation, unknown>;

export function useGetUser(userId: number): UserResult;
export function useGetUser(
  userId: number,
  options?: OptionsWithRelation
): UserWithRelationResult;

export function useGetUser(
  userId: number,
  options?: Options
): UseQueryResult<User, unknown>;

export function useGetUser(userId: number, options?: Options) {
  const response = useQuery(["user", userId], () => getUserById(userId), {
    enabled: !!userId,
  });

  const companyId = response.data?.companyId;

  const unitId = response.data?.unitId;

  const { data: company } = useGetCompany(companyId || 0);

  const { data: unit } = useGetUnit(unitId || 0);

  if (options?.relations) {
    return {
      ...response,
      isLoading: response.isLoading || !company || !unit,
      data: {
        ...response.data,
        unit,
        company,
      },
    } as UserWithRelationResult;
  }

  return response;
}
