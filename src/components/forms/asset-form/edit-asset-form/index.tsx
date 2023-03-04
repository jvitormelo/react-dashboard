import { AssetUsersTransfer } from "@/components/transfer/asset-users-transfer";
import { Asset } from "@/types/entities/asset";
import { Tabs } from "antd";
import { AssetImageForm } from "../asset-image";
import { AssetInfoForm, AssetInfoFormProps } from "../asset-info";
interface Props {
  defaultValues: Asset;
  onSubmit: AssetInfoFormProps["onSubmitHandler"];
  saveImage: AssetImageForm["saveImage"];
}

export const EditAssetForm = ({
  defaultValues,
  onSubmit,
  saveImage,
}: Props) => {
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
        {
          label: "Assigned Users",
          key: "assigned-users",
          children: <AssetUsersTransfer asset={defaultValues} />,
        },
      ]}
    />
  );
};
