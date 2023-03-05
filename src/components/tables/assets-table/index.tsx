import { useGetAllAssetModels } from "@/api/asset-model/use-get-all-asset-models";
import { StatusTag } from "@/components/atoms/status-tag";
import { assetStatusArray } from "@/constants/asset-status";
import { useTheme } from "@/hooks";
import { Routes } from "@/router/routes";
import { Asset } from "@/types/entities/asset";
import { dateUtils } from "@/utils/date";
import { nameUtils } from "@/utils/name";
import { Image } from "antd";
import { ColumnsType } from "antd/es/table";
import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { addBaseTableActions } from "../common/add-base-table-actions";
import { BaseTableActions } from "../common/add-base-table-actions/types";
import { BaseTableProps, DataTable } from "../common/data-table";
import { useGetColumnSearchProps } from "../common/search";

type DataTableAsset = Asset & {
  totalUptime: number;
  lastUptimeAt: Date;
  rpm: number;
  power: number;
  maxTemp: number;
  numberOfAssignedUsers: number;
};

export interface Props extends BaseTableProps, BaseTableActions<Asset> {
  assets: Asset[] | undefined;
}

export const AssetsTable = memo(
  ({ assets = [], onSelect, onDelete, onEdit, ...props }: Props) => {
    const { data: assetModels = [] } = useGetAllAssetModels();
    const { getColumnSearchProps } = useGetColumnSearchProps<DataTableAsset>();
    const { theme } = useTheme();

    const columns: ColumnsType<DataTableAsset> = [
      {
        title: "Id",
        dataIndex: "id",
        key: "id",
        //  TODO - decide how to display the ID and the image
        render: (id, asset) => (
          <div
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <span
              style={{
                marginRight: theme.marginSM,
                color: theme.colorPrimary,
                fontWeight: "bold",
              }}
            >
              {id}
            </span>
            <Image src={asset.image} width={50} alt={asset.name} />
          </div>
        ),
        sorter: (a, b) => a.id - b.id,
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
        ...getColumnSearchProps("name"),
      },
      {
        title: "Health Score",
        dataIndex: "healthscore",
        key: "healthscore",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.healthscore - b.healthscore,
        render: (healthscore) => (
          <StatusTag status={healthscore} text={`${healthscore}%`} />
        ),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        filterMode: "menu",
        filterSearch: true,
        width: 150,
        filters: assetStatusArray.map((item) => ({
          text: nameUtils.getAssetStatusName(item),
          value: item,
        })),
        onFilter: (value, record) => record.status === value,
        render: (status) => (
          <StatusTag
            status={status}
            text={nameUtils.getAssetStatusName(status)}
          />
        ),
      },
      {
        title: "Model",
        dataIndex: "model",
        key: "model",
        render: (model) => nameUtils.getAssetModelName(model),
        filters: assetModels.map((item) => ({
          text: item.label,
          value: item.value,
        })),
        onFilter: (value, record) => record.model === value,
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
        sorter: (a, b) => a.totalUptime - b.totalUptime,
      },
      {
        title: "RPM",
        dataIndex: "rpm",
        key: "rpm",
        align: "center",
        render: (rpm) => nameUtils.getSpecificationName(rpm, "rpm"),
        sorter: (a, b) => a.rpm - b.rpm,
      },
      {
        title: "Power",
        dataIndex: "power",
        key: "power",
        align: "center",
        render: (power) => nameUtils.getSpecificationName(power, "power"),
        sorter: (a, b) => a.power - b.power,
      },
      {
        title: "Max Temp",
        dataIndex: "maxTemp",
        key: "maxTemp",
        align: "center",
        render: (maxTemp) => nameUtils.getSpecificationName(maxTemp, "maxTemp"),
        sorter: (a, b) => a.maxTemp - b.maxTemp,
      },
      {
        title: "Assigned users",
        dataIndex: "numberOfAssignedUsers",
        key: "numberOfAssignedUsers",
        align: "center",
        sorter: (a, b) => a.numberOfAssignedUsers - b.numberOfAssignedUsers,
      },
      addBaseTableActions({
        onDelete,
        onEdit,
        deleteOptions: {
          placement: "left",
        },
      }),
    ];

    const formattedAssets: DataTableAsset[] = useMemo(
      () =>
        assets.map((asset) => ({
          ...asset,
          maxTemp: asset.specifications.maxTemp,
          power: asset.specifications?.power ?? -1,
          rpm: asset.specifications?.rpm ?? -1,
          totalUptime: asset.metrics.totalUptime ?? 0,
          lastUptimeAt: new Date(asset.metrics.lastUptimeAt),
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
