import { DataTable } from "@/components/data-table";
import { Company } from "@/types/entities/company";
import { ComponentProps } from "react";

type TableProps = ComponentProps<typeof DataTable>;
interface Props {
  companies?: Company[];
  isLoading: TableProps["loading"];
}

export const CompanyTable = ({ companies, isLoading }: Props) => {
  return (
    <DataTable
      dataSource={companies}
      loading={isLoading}
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
