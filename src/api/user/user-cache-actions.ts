import { arrayUtils } from "./../../utils/array/index";
import { queryClient } from "@/infra/query-client";
import { User } from "@/types/entities";

const usersKey = ["users"];

const userKey = (id: number) => ["user", id];

const setUser = (user: User) => {
  queryClient.setQueryData(userKey(user.id), user);

  queryClient.setQueryData<User[]>(usersKey, (users) => {
    return arrayUtils.updateOrCreate<User>({
      array: users,
      item: user,
      key: "id",
    });
  });
};

const deleteUser = (id: number) => {
  queryClient.removeQueries(userKey(id), {
    exact: true,
  });

  queryClient.setQueryData<User[]>(usersKey, (users) => {
    return arrayUtils.remove<User>({
      array: users,
      item: { id } as User,
      key: "id",
    });
  });
};

export const userCacheActions = {
  setUser,
  deleteUser,
  usersKey,
  userKey,
};
