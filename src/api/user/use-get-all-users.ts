import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "./get-all-users";

export const useGetAllUsers = () => {
  return useQuery(["users"], getAllUsers);
};
