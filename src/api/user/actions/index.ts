import { queryClientHelpers } from "@/infra/query-client";
import { User } from "@/types/entities";

const usersKey = ["users"];

const userKey = (id: number) => ["user", id];

const setUser = (user: User) => {
  queryClientHelpers.addOrUpdate<User>({
    arrayKey: usersKey,
    item: user,
    itemKey: userKey(user.id),
  });
};

const selectUser = (user: User) => {
  queryClientHelpers.select(userKey(user.id), user);
};

const deleteUser = (id: number) => {
  queryClientHelpers.removeFromCache<User>({
    id,
    arrayKey: usersKey,
    itemKey: userKey(id),
  });
};

export const userCacheActions = {
  setUser,
  deleteUser,
  selectUser,
  usersKey,
  userKey,
};
