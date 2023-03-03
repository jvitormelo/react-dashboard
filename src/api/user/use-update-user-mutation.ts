import { httpClient } from "@/infra/http-client";
import { queryClient } from "@/infra/query-client";
import { User } from "@/types/entities/user";
import { useMutation } from "@tanstack/react-query";

type UpdateUser = User;

const updateUser = async (user: UpdateUser): Promise<User> =>
  httpClient.put(`/users/${user.id}`, user);

export const useUpdateUserMutation = () => {
  return useMutation(updateUser, {
    onSuccess: (data) => {
      queryClient.setQueryData<User>(["user", data.id], data);

      queryClient.setQueryData<User[]>(
        ["users"],
        (oldData) =>
          oldData?.map((user) => (user.id === data.id ? data : user)) ?? []
      );
    },
  });
};
