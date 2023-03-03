import { useTheme } from "@/hooks/use-theme";
import { Asset } from "@/types/entities/asset";
import { Company } from "@/types/entities/company";
import { colorsUtils, numberUtils } from "@/utils";
import { Card, Skeleton } from "antd";
import { memo } from "react";
import { StatisticsCard } from "../statistics-card";

interface Props {
  company: Company | undefined;
  assets: Asset[] | undefined;
  loading?: boolean;
}

export const CompanyInfoCard = memo(({ assets, loading, company }: Props) => {
  const { theme } = useTheme();

  if (loading || !assets || !company) {
    return (
      <Card>
        <Skeleton active />
      </Card>
    );
  }

  const totalAssets = assets.length;

  const averageHealthScore = numberUtils.calculateAverage(
    assets.map((asset) => asset.healthscore)
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: theme.marginMD,
      }}
    >
      <StatisticsCard
        colProps={{
          span: 12,
        }}
        statistics={[
          {
            title: "ID",
            value: company.id,
          },
          {
            title: "Company",
            value: company.name,
          },
        ]}
      />

      <StatisticsCard
        rowProps={{
          style: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: theme.marginMD,
          },
        }}
        statistics={[
          {
            title: "Total Assets",
            value: totalAssets,
          },
          {
            title: "Average Health Score",
            value: averageHealthScore,
            valueStyle: {
              fontWeight: "bold",
              color: colorsUtils.getAssetHealthColor(averageHealthScore),
            },
          },
        ]}
        colProps={{
          span: 12,
        }}
      />
      {/* 
        think about any other statistics that could be useful here

      */}
    </div>
  );
});
