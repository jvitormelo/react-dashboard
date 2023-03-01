import { QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { queryClient } from "./infra/query-client";
import { CompaniesView } from "./views/companies";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CompaniesView />
    </QueryClientProvider>
  );
}

export default App;
