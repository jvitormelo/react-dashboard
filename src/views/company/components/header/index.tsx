import { useGetCompany } from "@/api/company/use-get-company";
import { AssetsStatusPieChart } from "@/components/charts/assets-status-chart";
import { ResourcesBarChart } from "@/components/charts/resources-bar-chart";
import { useTheme } from "@/hooks/use-theme";
import { Asset } from "@/types/entities/asset";
import { useGetCompanyResources } from "@/views/company/hooks/use-get-company-resources";
import { CompanyInfoCard } from "../company-info-card";

interface Props {
  companyId: number;
  assets: Asset[];
  isAssetsLoading: boolean;
}

export const CompanyViewHeader = ({
  assets,
  companyId,
  isAssetsLoading,
}: Props) => {
  const { theme } = useTheme();
  const { chartData } = useGetCompanyResources(companyId);

  const { data: company, isLoading: isCompanyLoading } =
    useGetCompany(companyId);

  return (
    <header
      style={{
        display: "grid",
        gap: theme.marginMD,
        gridTemplateColumns: "1fr 1fr 1fr",
        marginBottom: theme.marginMD,
      }}
    >
      <CompanyInfoCard
        company={company}
        assets={assets}
        loading={isAssetsLoading || isCompanyLoading}
      />

      <ResourcesBarChart {...chartData} />
      <AssetsStatusPieChart title={"Assets Status"} assets={assets} />
    </header>
  );
};
