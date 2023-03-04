import { BackArrowIcon } from "@/components/icons/back-icon";
import { Button, Divider, Steps } from "antd";
import { useState } from "react";
import { AssetImageForm } from "../asset-image";
import { AssetInfoForm } from "../asset-info";

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

enum CreateAssetSteps {
  AssetInfo,
  Image,
  Users,
}

// TODO - Refactor to use Zustand to manage state
export const CreateAssetForm = () => {
  const [currentStep, setCurrentStep] = useState(CreateAssetSteps.AssetInfo);

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => {
      return prev - 1;
    });
  };

  const components = [
    <AssetInfoForm
      key={CreateAssetSteps.AssetInfo}
      onSubmitHandler={async (data) => {
        console.log(data);
        nextStep();
      }}
    />,
    <AssetImageForm
      key={CreateAssetSteps.Image}
      saveImage={async (file) => {
        console.log(file);
        nextStep();
        return true;
      }}
    />,
    <div key={CreateAssetSteps.Users}>lmao</div>,
  ];
  return (
    <div>
      <Steps current={currentStep} items={steps} />

      <Divider />

      <section>
        {currentStep ? (
          <Button
            style={{
              marginBottom: 24,
            }}
            onClick={prevStep}
          >
            <BackArrowIcon />
          </Button>
        ) : null}
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
