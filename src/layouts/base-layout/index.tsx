import { AssetForm } from "@/components/forms/asset-form";
import { Navigation } from "@/components/navigation";
import { useModal } from "@/hooks/use-modal";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export const BaseLayout = () => {
  const { openModal } = useModal();
  useEffect(() => {
    openModal({
      body: <AssetForm />,
    });
  }, []);

  return (
    <>
      <Navigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};
