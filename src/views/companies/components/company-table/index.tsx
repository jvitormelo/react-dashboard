import { BaseTableProps, DataTable } from "@/components/tables/data-table";
import { defaultActionCol } from "@/components/tables/default-action-col";
import { Routes } from "@/router/routes";
import { Company } from "@/types/entities/company";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";

interface Props extends BaseTableProps {
  companies?: Company[];
  selectCompany: (company: Company) => void;
  deleteCompany: (company: Company) => Promise<void>;
  editCompany: (company: Company) => void;
}

export const CompanyTable = ({
  companies,
  loading,
  selectCompany,
  deleteCompany,
  editCompany,
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
          to={Routes.company(company.id)}
        >
          {text}
        </Link>
      ),
    },
    defaultActionCol({
      onDelete: deleteCompany,
      onEdit: editCompany,
    }),
  ];

  return (
    <DataTable<Company>
      dataSource={companies}
      loading={loading}
      columns={columns}
    />
  );
};
