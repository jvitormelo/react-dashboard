type Id = string | number;

export const Routes = {
  companies: "/companies",
  company: (id: Id) => `/companies/${id}`,
  unit: (companyId: Id, id: Id) => Routes.company(companyId) + `/units/${id}`,
};
