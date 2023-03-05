import { httpClient } from "@/infra/http-client";
import { useMutation } from "@tanstack/react-query";
import { userCacheActions } from "./actions";

const deleteUser = (id: number) => {
  return httpClient.delete(`/users/${id}`);
};

export const useDeleteUserMutation = () => {
  return useMutation(deleteUser, {
    onSuccess: (_, id) => userCacheActions.deleteUser(id),
  });
};
