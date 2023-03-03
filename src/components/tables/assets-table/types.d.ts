import { Asset } from "@/types/entities/asset";
import { BaseTableActions } from "../common/base-table-actions/types";
import { BaseTableProps } from "../common/data-table";

export interface AssetsTableProps
  extends BaseTableProps,
    BaseTableActions<Asset> {
  assets: Asset[] | undefined;
}
