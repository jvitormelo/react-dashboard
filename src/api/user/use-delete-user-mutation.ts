import { httpClient } from "@/infra/http-client";
import { queryClient } from "@/infra/query-client";
import { User } from "@/types/entities/user";
import { useMutation } from "@tanstack/react-query";

const deleteUser = (id: number) => {
  return httpClient.delete(`/users/${id}`);
};

export const useDeleteUserMutation = () => {
  return useMutation(deleteUser, {
    onSuccess: (_, id) => {
      queryClient.setQueryData(["users"], (oldData?: User[]) => {
        return oldData?.filter((user) => user.id !== id);
      });

      queryClient.setQueryData(["user", id], undefined);
    },
  });
};
