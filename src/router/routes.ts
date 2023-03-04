type Id = string | number;

export const Routes = {
  companies: "/companies",
  company: (id: Id) => `/companies/${id}`,
  unit: (companyId: Id, id: Id) => Routes.company(companyId) + `/units/${id}`,
  asset: (companyId: Id, unitId: Id, id: Id) =>
    Routes.unit(companyId, unitId) + `/assets/${id}`,
  user: (id: Id) => `/users/${id}`,
};
