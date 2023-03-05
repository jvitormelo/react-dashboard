import { AssetView } from "@/views/asset";
import { UnitView } from "@/views/unit";
import { UserView } from "@/views/user";
import { createBrowserRouter } from "react-router-dom";
import { BaseLayout } from "../layouts/base-layout";
import { CompaniesView } from "../views/companies";
import { CompanyView } from "../views/company";

// TODO - Need to read about dynamic imports (next do it automatically)
export const router = createBrowserRouter([
  {
    path: "/",
    element: <CompaniesView />,
  },
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        path: "users/:userId",
        element: <UserView />,
      },
      {
        path: "companies",
        element: <CompaniesView />,
      },
      {
        path: "companies/:companyId",
        element: <CompanyView />,
      },
      {
        path: "companies/:companyId/units/:unitId",
        element: <UnitView />,
      },
      {
        path: "companies/:companyId/units/:unitId/assets/:assetId",
        element: <AssetView />,
      },
    ],
  },
]);
