import { AppNavigation } from "@/components/molecules/app-navigation";
import { Outlet } from "react-router-dom";

export const BaseLayout = () => {
  return (
    <>
      <AppNavigation />

      <main>
        <Outlet />
      </main>
    </>
  );
};
