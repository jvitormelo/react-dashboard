import { httpClient } from "@/infra/http-client";
import { User } from "@/types/entities";
import { toast } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { userCacheActions } from "./actions";

const createUser = async (user: Omit<User, "id">): Promise<User> => {
  return httpClient.post("/users", user);
};

export const useCreateUserMutation = () => {
  return useMutation(createUser, {
    onSuccess: (user) => {
      userCacheActions.addUser(user);
      toast.success("User created successfully");
    },
    onError: () => {
      toast.error("Error creating user");
    },
  });
};
