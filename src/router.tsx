import { createBrowserRouter } from "react-router-dom";
import { BaseLayout } from "./layouts/base-layout";
import { CompaniesView } from "./views/companies";

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
        path: "companies/:id",
        element: <CompaniesView />,
      },
    ],
  },
]);
