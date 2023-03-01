import { useGetCompany } from "@/api/company/useGetCompany";
import { useGetUnitsByCompany } from "@/api/unit/useGetUnitsByCompany";
import { useGetUsersByCompany } from "@/api/user/useGetUsersByCompany";
import { useParams } from "react-router-dom";
import { UnitTable } from "./components/unit-table";

export const CompanyView = () => {
  const { companyId } = useParams();

  const { data: company } = useGetCompany(Number(companyId));

  const { data: users } = useGetUsersByCompany(Number(companyId));

  const { data: units, isLoading: isUnitsLoading } = useGetUnitsByCompany(
    Number(companyId)
  );

  return (
    <div>
      <div>3 cards with Info about the company</div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <div>Maybe some content in left</div>
        <div style={{ flex: 1 }}>
          <UnitTable units={units} loading={isUnitsLoading} />
        </div>
      </div>
    </div>
  );
};
