import { useGetAsset } from "@/api/asset/useGetAsset";
import { useGetCompany } from "@/api/company/useGetCompany";
import { useGetUnit } from "@/api/unit/useGetUnit";
import { Routes } from "@/router/routes";
import { Breadcrumb } from "antd";
import { Link, useParams } from "react-router-dom";

type Item = {
  name: string;
  href: string;
};

export const Navigation = () => {
  const { companyId, assetId, unitId } = useParams();

  const { data: company } = useGetCompany(Number(companyId));
  const { data: asset } = useGetAsset(Number(assetId));
  const { data: unit } = useGetUnit(Number(unitId));

  const items = [
    {
      name: "Companies",
      href: "/companies",
    },
    companyId &&
      company && {
        name: company.name,
        href: Routes.company(company.id),
      },
    unitId &&
      unit && {
        name: unit.name,
        href: Routes.unit(unit.companyId, unitId),
      },
    assetId &&
      asset && {
        name: asset.name,
        href: Routes.asset(asset.companyId, asset.unitId, assetId),
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
