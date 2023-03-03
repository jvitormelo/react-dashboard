import { BaseTableProps } from "../data-table";
import { DefaultActionColProps } from "../default-action-col/types";

export type UsersTableProps = BaseTableProps &
  DefaultActionColProps<User> & {
    users: User[] | undefined;
  };
