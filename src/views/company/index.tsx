import { useGetCompany } from "@/api/company/useGetCompany";
import { useGetUnitsByCompany } from "@/api/unit/useGetUnitsByCompany";
import { useGetUsersByCompany } from "@/api/user/useGetUsersByCompany";
import { useParams } from "react-router-dom";

export const CompanyView = () => {
  const { companyId } = useParams();

  const { data } = useGetCompany(Number(companyId));

  const { data: users } = useGetUsersByCompany(Number(companyId));

  const { data: units } = useGetUnitsByCompany(Number(companyId));

  return (
    <div>
      {JSON.stringify(data)}
      {JSON.stringify(users)}
      {JSON.stringify(units)}
    </div>
  );
};
