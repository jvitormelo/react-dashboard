import { httpClient } from "@/infra/http-client";
import { User } from "@/types/entities";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { userCacheActions } from "./actions";

const getAllUsers = async (): Promise<User[]> => httpClient.get("/users");

type Options = UseQueryOptions<User[]>;

export const useGetAllUsers = (options?: Options) => {
  return useQuery<User[]>(userCacheActions.usersKey, getAllUsers, {
    ...options,
  });
};
