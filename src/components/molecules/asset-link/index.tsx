import { StatisticsCard } from "@/components/cards/statistics-card";
import { useFeedbackColors, useTheme } from "@/hooks";
import { Routes } from "@/router/routes";
import { Asset } from "@/types/entities";
import { nameUtils } from "@/utils";
import { Avatar, Image, Popover, Space } from "antd";
import { Link } from "react-router-dom";

interface Props {
  asset: Asset;
}

export const AssetLink = ({ asset }: Props) => {
  const { theme } = useTheme();
  const { assetStatusToColor, healthScoreToColor } = useFeedbackColors();
  return (
    <Popover
      content={
        <Space
          direction="vertical"
          style={{
            width: 350,
          }}
        >
          <Image height={"auto"} src={asset.image} />
          <StatisticsCard
            rowProps={{
              gutter: theme.marginMD,
            }}
            colProps={{
              span: 24,
            }}
            statistics={[
              {
                title: "Name",
                value: asset.name,
                colProps: {
                  style: {
                    marginBottom: theme.marginMD,
                    textAlign: "center",
                  },
                },
              },
              {
                colProps: {
                  span: 12,
                },
                title: "Status",
                value: nameUtils.getAssetStatusName(asset.status),
                valueStyle: {
                  color: assetStatusToColor(asset.status),
                  fontWeight: "bold",
                },
              },
              {
                colProps: {
                  span: 12,
                },
                title: "Health score",
                value: asset.healthscore,
                valueStyle: {
                  color: healthScoreToColor(asset.healthscore),
                  fontWeight: "bold",
                },
              },
            ]}
          ></StatisticsCard>
        </Space>
      }
      placement="right"
    >
      <Link to={Routes.asset(asset.companyId, asset.unitId, asset.id)}>
        <Avatar src={asset.image} />{" "}
        <span
          style={{
            marginLeft: theme.marginXXS,
          }}
        >
          {asset.name}
        </span>
      </Link>
    </Popover>
  );
};
