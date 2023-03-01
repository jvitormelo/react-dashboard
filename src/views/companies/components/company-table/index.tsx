import { DataTable } from "@/components/data-table";
import { Routes } from "@/router/routes";
import { Company } from "@/types/entities/company";
import { Button, Popconfirm, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { ComponentProps } from "react";
import { Link } from "react-router-dom";

type TableProps = ComponentProps<typeof DataTable>;
interface Props {
  companies?: Company[];
  isLoading: TableProps["loading"];
  selectCompany: (company: Company) => void;
  deleteCompany: (company: Company) => void;
  editCompany: (company: Company) => void;
}

export const CompanyTable = ({
  companies,
  isLoading,
  selectCompany,
  deleteCompany,
  editCompany,
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
          onClick={() => selectCompany(company)}
          to={Routes.company(company.id)}
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
          <Button onClick={() => editCompany(record)}>Edit</Button>

          <Popconfirm
            placement="bottomLeft"
            title={"Delete Company?"}
            description={`
              Are you sure you want to delete ${record.name}?
            `}
            onConfirm={() => deleteCompany(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button>Delete</Button>
          </Popconfirm>
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
