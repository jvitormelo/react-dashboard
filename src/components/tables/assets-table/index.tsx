import { Routes } from "@/router/routes";
import { Asset } from "@/types/entities/asset";
import { dateUtils } from "@/utils/date";
import { namesUtils } from "@/utils/names";
import { Image, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { DataTable } from "../common/data-table";
import { AssetsTableProps } from "./types";

type DataTableAsset = Asset & {
  totalUptime: number;
  lastUptimeAt: Date;
  rpm: number | null;
  power: number | null;
  maxTemp: number | null;
  numberOfAssignedUsers: number;
};

export const AssetsTable = memo(
  ({ assets = [], onSelect, ...props }: AssetsTableProps) => {
    const columns: ColumnsType<DataTableAsset> = [
      {
        title: "Id",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Image",
        dataIndex: "image",
        key: "image",
        render: (image, asset) => (
          <Image src={image} width={100} alt={asset.name} />
        ),
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (name, asset) => (
          <Link
            onClick={() => onSelect && onSelect(asset)}
            to={Routes.asset(asset.companyId, asset.unitId, asset.id)}
          >
            {name}
          </Link>
        ),
      },
      {
        title: "Health Score",
        dataIndex: "healthscore",
        key: "healthscore",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        // TODO convert status to color
        render: (status) => (
          <Tag color={"green"}>{namesUtils.getAssetStatusName(status)}</Tag>
        ),
      },
      {
        title: "Model",
        dataIndex: "model",
        key: "model",
      },
      {
        title: "Last Uptime At",
        dataIndex: "lastUptimeAt",
        key: "lastUptimeAt",
        render: (uptime) => dateUtils.formatDistance(uptime),
      },
      {
        title: "Uptime",
        dataIndex: "totalUptime",
        key: "totalUptime",
        render: (uptime) => dateUtils.formatHoursDistance(uptime),
        // TODO convert to Days
      },
      {
        title: "RPM",
        dataIndex: "rpm",
        key: "rpm",
        render: (rpm) => rpm ?? "Unknown",
      },
      {
        title: "Power",
        dataIndex: "power",
        key: "power",
        render: (power) => power ?? "Unknown",
      },
      {
        title: "Max Temp",
        dataIndex: "maxTemp",
        key: "maxTemp",
      },
      {
        title: "Assigned users",
        dataIndex: "numberOfAssignedUsers",
        key: "numberOfAssignedUsers",
      },
    ];

    const formattedAssets: DataTableAsset[] = useMemo(
      () =>
        assets.map((asset) => ({
          ...asset,
          maxTemp: asset.specifications?.maxTemp ?? null,
          power: asset.specifications?.power ?? null,
          rpm: asset.specifications?.rpm ?? null,
          totalUptime: asset.metrics?.totalUptime ?? 0,
          lastUptimeAt: new Date(asset.metrics?.lastUptimeAt),
          numberOfAssignedUsers: asset.assignedUserIds.length,
        })),
      [assets]
    );

    return (
      <DataTable<DataTableAsset>
        dataSource={formattedAssets}
        columns={columns}
        {...props}
      />
    );
  }
);
