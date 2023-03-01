import { QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { queryClient } from "./infra/query-client";
import { DashboardView } from "./views/dashboard";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DashboardView />
    </QueryClientProvider>
  );
}

export default App;
