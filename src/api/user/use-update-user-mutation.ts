import { httpClient } from "@/infra/http-client";
import { User } from "@/types/entities/user";
import { useMutation } from "@tanstack/react-query";
import { userCacheActions } from "./actions";

type UpdateUser = User;

const updateUser = async (user: UpdateUser): Promise<User> =>
  httpClient.put(`/users/${user.id}`, user);

export const useUpdateUserMutation = () => {
  return useMutation(updateUser, {
    onSuccess: (data) => userCacheActions.updateUser(data),
  });
};
