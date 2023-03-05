import { Routes } from "@/router/routes";
import { Company } from "@/types/entities/company";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { addBaseTableActions } from "../common/add-base-table-actions";
import { BaseTableActions } from "../common/add-base-table-actions/types";
import { BaseTableProps, DataTable } from "../common/data-table";
import { useGetColumnSearchProps } from "../common/search";

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
  const { getColumnSearchProps } = useGetColumnSearchProps<Company>();
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
      ...getColumnSearchProps("name"),
    },
    addBaseTableActions({
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
