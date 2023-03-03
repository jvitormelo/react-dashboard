import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import { queryClient } from "./infra/query-client";
import { router } from "./router";
import { theme } from "./styles/theme";
import { ModalProvider } from "./components/modals/modal-provider";

function App() {
  return (
    <ConfigProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ModalProvider />
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;
