import { defaultActionCol } from "@/components/tables/common/base-table-actions";
import { Routes } from "@/router/routes";
import { Company } from "@/types/entities/company";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { BaseTableActions } from "../common/base-table-actions/types";
import { BaseTableProps, DataTable } from "../common/data-table";

interface Props extends BaseTableProps, BaseTableActions<Company> {
  companies?: Company[];
}

export const CompanyTable = ({
  companies,
  loading,
  onSelect,
  onDelete,
  onEdit,
  ...baseProps
}: Props) => {
  const columns: ColumnsType<Company> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, company) => (
        <Link
          onClick={() => onSelect && onSelect(company)}
          to={Routes.company(company.id)}
        >
          {text}
        </Link>
      ),
    },
    defaultActionCol({
      onDelete,
      onEdit,
    }),
  ];

  return (
    <DataTable<Company>
      dataSource={companies}
      loading={loading}
      columns={columns}
      {...baseProps}
    />
  );
};
