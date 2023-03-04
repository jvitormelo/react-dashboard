import { BackArrowIcon } from "@/components/icons/back-icon";
import { useTheme } from "@/hooks/use-theme";
import { Button, Divider, Steps } from "antd";
import { useCreateAssetFormStore } from "../../../../store/create-asset-form-store";
import { AssetImageForm } from "../asset-image";
import { AssetInfoForm } from "../asset-info";
import { AssetSchema } from "../schema";
import { SubmitCreateAssetParams } from "./types";

const steps = [
  {
    title: "Asset info",
  },
  {
    title: "Image",
  },
];

interface Props {
  submitForm: (params: SubmitCreateAssetParams) => Promise<void>;
}

export const CreateAssetForm = ({ submitForm }: Props) => {
  const { theme } = useTheme();

  const {
    assetInfo,
    currentStep,
    showPrevButton,
    prevStep,
    nextStep,
    setAssetInfo,
    setImage,
    clear,
  } = useCreateAssetFormStore();

  const assetInfoSubmit = async (data: AssetSchema) => {
    setAssetInfo(data);
    nextStep();
  };

  const assetImageSubmit = async (file: File) => {
    setImage(file);

    if (!assetInfo) return false;

    await submitHandler(assetInfo, file);
    return true;
  };

  const submitHandler = async (
    assetInfo: SubmitCreateAssetParams["assetInfo"],
    image: SubmitCreateAssetParams["image"]
  ) => {
    await submitForm({
      assetInfo,
      image,
    });

    clear();
  };

  const components = [
    <AssetInfoForm
      key={1}
      onSubmitHandler={assetInfoSubmit}
      buttonLabel="Next"
    />,
    <AssetImageForm
      key={2}
      buttonLabel="Create Asset"
      saveImage={assetImageSubmit}
    />,
  ];
  return (
    <div>
      <Steps current={currentStep} items={steps} />

      <Divider />

      {showPrevButton() && (
        <Button
          style={{
            marginBottom: theme.marginMD,
          }}
          onClick={prevStep}
        >
          <BackArrowIcon />
        </Button>
      )}

      {components.map((component, index) => (
        <div
          key={index}
          style={{
            display: index === currentStep ? "block" : "none",
          }}
        >
          {component}
        </div>
      ))}
    </div>
  );
};
