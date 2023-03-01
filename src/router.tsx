import { createBrowserRouter } from "react-router-dom";
import { CompaniesView } from "./views/companies";

// TODO - Need to read about dynamic imports (next do it automatically)
export const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello World!</div>,
  },
  {
    path: "/companies",
    element: <CompaniesView />,
  },
  {
    path: "/companies/:id",
    element: <CompaniesView />,
  },
]);
