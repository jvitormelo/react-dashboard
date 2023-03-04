import { Asset } from "@/types/entities/asset";
import { Tabs } from "antd";
import { AssetImageForm } from "./asset-image";
import { AssetInfoForm } from "./asset-info";
interface Props {
  defaultValues?: Partial<Asset>;
}

export const AssetForm = ({ defaultValues }: Props) => {
  return (
    <Tabs
      destroyInactiveTabPane
      items={[
        {
          label: "Info",
          key: "asset-info",
          children: <AssetInfoForm defaultValues={defaultValues} />,
        },
        {
          label: "Image",
          key: "image",
          children: <AssetImageForm image={defaultValues?.image} />,
        },
      ]}
    />
  );
};
