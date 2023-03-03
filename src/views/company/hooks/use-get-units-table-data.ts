import { useGetAssetsByCompany } from "@/api/asset/use-get-assets-by-company";
import { useGetUnitsByCompany } from "@/api/unit/use-get-units-by-company";
import { useGetUsersByCompany } from "@/api/user/use-get-users-by-company";
import { IUnitTable } from "../components/unit-table";
import { numberUtils } from "@/utils";
import { Asset } from "@/types/entities/asset";
import { User } from "@/types/entities/user";

type Hook = (companyId: number) => {
  unitsTable: IUnitTable[];
  assets: Asset[];
  users: User[];
  isUnitsLoading: boolean;
  isAssetsLoading: boolean;
  isUsersLoading: boolean;
};

export const useGetUnitsTableData: Hook = (companyId: number) => {
  const { data: units = [], isLoading: isUnitsLoading } =
    useGetUnitsByCompany(companyId);

  const { data: assets = [], isLoading: isAssetsLoading } =
    useGetAssetsByCompany(companyId);

  const { data: users = [], isLoading: isUsersLoading } =
    useGetUsersByCompany(companyId);

  const unitsTable: IUnitTable[] = units.map((unit) => {
    const assetsOfUnit = assets.filter((asset) => asset.unitId === unit.id);

    const numberOfAssets = assetsOfUnit.length;

    const averageHealthScore = numberUtils.calculateAverage(
      assetsOfUnit.map((asset) => asset.healthscore)
    );

    const averageUptime = numberUtils.calculateAverage(
      assetsOfUnit.map((asset) => asset.metrics.totalUptime)
    );

    const numberOfUsers = users.filter(
      (user) => user.unitId === unit.id
    ).length;

    return {
      ...unit,
      numberOfAssets,
      numberOfUsers,
      averageHealthScore,
      averageUptime,
    };
  });

  return {
    unitsTable,
    assets,
    users,
    isUnitsLoading,
    isAssetsLoading,
    isUsersLoading,
  };
};
