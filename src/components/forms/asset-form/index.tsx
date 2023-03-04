import { Image, Tabs } from "antd";
import { AssetInfoForm } from "./asset-info";

export const AssetForm = () => {
  return (
    <Tabs
      destroyInactiveTabPane
      items={[
        {
          label: "Info",
          key: "asset-info",
          children: <AssetInfoForm />,
        },
        {
          label: "Image",
          key: "image",
          children: (
            <div>
              <Image
                height={400}
                src="https://tractian-img.s3.amazonaws.com/dc8a497655c688ce381d6a3ba4af684d.jpeg"
              />
            </div>
          ),
        },
      ]}
    />
  );
};
