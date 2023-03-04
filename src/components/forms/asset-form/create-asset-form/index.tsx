import { BackArrowIcon } from "@/components/icons/back-icon";
import { useTheme } from "@/hooks/use-theme";
import { Button, Divider, Steps } from "antd";
import { AssetImageForm } from "../asset-image";
import { AssetInfoForm } from "../asset-info";
import { useCreateAssetFormStore } from "../../../../store/create-asset-form-store";
import { NextArrowIcon } from "@/components/icons/next-icon";

const steps = [
  {
    title: "Asset info",
  },
  {
    title: "Image",
  },
  {
    title: "Users",
  },
];

export const CreateAssetForm = () => {
  const { theme } = useTheme();

  const {
    currentStep,
    showNextButton,
    showPrevButton,
    prevStep,
    nextStep,
    setAssetInfo,
    setImage,
  } = useCreateAssetFormStore();

  const components = [
    <AssetInfoForm
      key={1}
      onSubmitHandler={async (data) => {
        setAssetInfo(data);
        nextStep();
      }}
    />,
    <AssetImageForm
      key={2}
      saveImage={async (file) => {
        setImage(file);
        nextStep();
        return true;
      }}
    />,
    <div key={3}>lmao</div>,
  ];
  return (
    <div>
      <Steps current={currentStep} items={steps} />

      <Divider />

      <section
        style={{
          marginBottom: theme.marginMD,
          display: "flex",
        }}
      >
        {showPrevButton() && (
          <Button onClick={prevStep}>
            <BackArrowIcon />
          </Button>
        )}
        {showNextButton() && (
          <Button onClick={nextStep} style={{ marginLeft: "auto" }}>
            <NextArrowIcon />
          </Button>
        )}
      </section>

      {components.map((component, index) => {
        return (
          <div
            key={index}
            style={{
              display: index === currentStep ? "block" : "none",
            }}
          >
            {component}
          </div>
        );
      })}
    </div>
  );
};
