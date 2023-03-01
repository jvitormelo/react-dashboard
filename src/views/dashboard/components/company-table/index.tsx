import { DataTable } from "@/components/data-table";
import { Company } from "@/types/entities/company";

interface Props {
  users: Company[];
}

export const CompanyTable = ({ users }: Props) => {
  return (
    <DataTable
      dataSource={users}
      columns={[
        {
          title: "Id",
          dataIndex: "id",
          key: "id",
        },
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
        },
      ]}
    />
  );
};
