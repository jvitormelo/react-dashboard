import { Routes } from "@/router/routes";
import { useCompanyStore } from "@/store/company";
import { Breadcrumb } from "antd";
import { Link, useParams } from "react-router-dom";

type Item = {
  name: string;
  href: string;
};

export const Navigation = () => {
  const { companyId, assetId } = useParams();

  const { company } = useCompanyStore();

  const items = [
    {
      name: "Companies",
      href: "/companies",
    },
    companyId && {
      name: company.name,
      href: Routes.company(companyId),
    },
    assetId && {
      name: "Asset",
      href: `/companies/${companyId}/units/${assetId}`,
    },
  ].filter(Boolean) as Item[];

  return (
    <Breadcrumb>
      {items.map((item: Item) => {
        return (
          <Breadcrumb.Item key={item.href}>
            <Link to={item.href}>{item.name}</Link>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};
