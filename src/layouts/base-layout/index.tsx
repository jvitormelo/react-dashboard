import { Navigation } from "@/components/navigation";
import { Outlet } from "react-router-dom";

export const BaseLayout = () => {
  return (
    <>
      <Navigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};
