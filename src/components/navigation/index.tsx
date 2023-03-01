import { useGetAsset } from "@/api/asset/use-get-asset";
import { useGetCompany } from "@/api/company/use-get-company";
import { useGetUnit } from "@/api/unit/use-get-unit";
import { useParamsId } from "@/hooks/use-params-id";
import { Routes } from "@/router/routes";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

type Item = {
  name: string;
  href: string;
};

export const Navigation = () => {
  const { companyId, assetId, unitId } = useParamsId();

  const { data: company } = useGetCompany(companyId);
  const { data: asset } = useGetAsset(assetId);
  const { data: unit } = useGetUnit(unitId);

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
