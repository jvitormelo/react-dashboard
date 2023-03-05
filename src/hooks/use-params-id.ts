import { useParams } from "react-router-dom";

const formatParam = (param?: string) => {
  if (!param) return 0;

  const parsedParams = Number(param);

  return Number.isNaN(parsedParams) ? 0 : parsedParams;
};

export const useParamsId = () => {
  const { unitId, assetId, companyId, userId } = useParams();

  return {
    unitId: formatParam(unitId),
    assetId: formatParam(assetId),
    companyId: formatParam(companyId),
    userId: formatParam(userId),
  };
};
