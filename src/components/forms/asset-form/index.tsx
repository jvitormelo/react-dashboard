import { Asset } from "@/types/entities/asset";
import { Tabs } from "antd";
import { AssetImageForm } from "./asset-image";
import { AssetInfoForm, AssetInfoFormProps } from "./asset-info";
interface Props {
  defaultValues?: Partial<Asset>;
  onSubmit: AssetInfoFormProps["onSubmitHandler"];
  saveImage: AssetImageForm["saveImage"];
}

export const AssetForm = ({ defaultValues, onSubmit, saveImage }: Props) => {
  return (
    <Tabs
      items={[
        {
          label: "Info",
          key: "asset-info",
          children: (
            <AssetInfoForm
              onSubmitHandler={onSubmit}
              defaultValues={defaultValues}
            />
          ),
        },
        {
          label: "Image",
          key: "image",
          children: (
            <AssetImageForm
              saveImage={saveImage}
              image={defaultValues?.image}
            />
          ),
        },
      ]}
    />
  );
};
