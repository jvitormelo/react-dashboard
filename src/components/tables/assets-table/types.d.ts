import { Asset } from "@/types/entities/asset";
import { BaseTableProps } from "../data-table";

export interface AssetsTableProps extends BaseTableProps {
  assets: Asset[] | undefined;
  onSelect: (asset: Asset) => void;
}
