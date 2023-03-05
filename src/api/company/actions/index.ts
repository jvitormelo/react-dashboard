import { queryClientHelpers } from "@/infra/query-client";
import { Company } from "@/types/entities";

const companyKey = (id: number) => ["company", id];

const companyArrayKey = ["companies"];

const selectCompany = (company: Company) => {
  queryClientHelpers.select(companyKey(company.id), company);
};

const deleteCompany = (id: number) => {
  queryClientHelpers.removeFromCache<Company>({
    id,
    arrayKey: companyArrayKey,
    itemKey: companyKey(id),
  });
};

const addOrUpdateCompany = (company: Company) => {
  queryClientHelpers.addOrUpdate<Company>({
    arrayKey: companyArrayKey,
    item: company,
    itemKey: companyKey(company.id),
  });
};

export const companyCacheActions = {
  selectCompany,
  deleteCompany,
  addOrUpdateCompany,
};
