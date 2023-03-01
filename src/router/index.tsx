import { UnitView } from "@/views/unit";
import { createBrowserRouter } from "react-router-dom";
import { BaseLayout } from "../layouts/base-layout";
import { CompaniesView } from "../views/companies";
import { CompanyView } from "../views/company";

// TODO - Need to read about dynamic imports (next do it automatically)
export const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/",
    element: <BaseLayout />,
    children: [
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
    ],
  },
]);
