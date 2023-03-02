import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import { queryClient } from "./infra/query-client";
import { router } from "./router";
import { theme } from "./styles/theme";

function App() {
  return (
    <ConfigProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;
