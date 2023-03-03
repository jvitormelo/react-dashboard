import { BaseTableProps } from "../data-table";

export interface UsersTableProps extends BaseTableProps {
  users: User[] | undefined;
}
