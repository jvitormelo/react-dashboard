import { useGetCompany } from "@/api/company/useGetCompany";
import { useParams } from "react-router-dom";

export const CompanyView = () => {
  const { companyId } = useParams();

  const { data } = useGetCompany(Number(companyId));

  return <div></div>;
};
