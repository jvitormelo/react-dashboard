import { DataTable } from "@/components/data-table";
import { Company } from "@/types/entities/company";
import { Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { ComponentProps } from "react";
import { Link } from "react-router-dom";

type TableProps = ComponentProps<typeof DataTable>;
interface Props {
  companies?: Company[];
  isLoading: TableProps["loading"];
  selectCompany: (company: Company) => void;
}

export const CompanyTable = ({
  companies,
  isLoading,
  selectCompany,
}: Props) => {
  console.log("companies", companies);

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
          onClick={() => selectCompany(company)}
          to={`/companies/${company.id}`}
        >
          {text}
        </Link>
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Edit</a>
          <a>Delete</a>
          <a>Open</a>
        </Space>
      ),
    },
  ];

  return (
    <DataTable<Company>
      dataSource={companies}
      loading={isLoading}
      columns={columns}
    />
  );
};
