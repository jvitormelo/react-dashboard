import { useGetAllAssetModels } from "@/api/asset-model/use-get-all-asset-models";
import { useGetAllSensors } from "@/api/sensors/use-get-all-sensors";
import { ControlledNumberInput } from "@/components/controlled/controlled-number-input";
import { ControlledSelect } from "@/components/controlled/controlled-select";
import { ControlledTextField } from "@/components/controlled/controlled-text-field";
import { KwhIcon } from "@/components/icons/kwh-icon";
import { RPMIcon } from "@/components/icons/rpm-icon";
import { useFormResolver } from "@/hooks/use-form-resolver";
import { BaseModalForm } from "../../base-modal-form";
import { AssetSchema, assetSchema } from "../schema";

export interface AssetInfoFormProps {
  defaultValues?: Partial<AssetSchema>;
  onSubmitHandler: (values: AssetSchema) => Promise<void>;
}

export const AssetInfoForm = ({
  defaultValues,
  onSubmitHandler,
}: AssetInfoFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useFormResolver<AssetSchema>(assetSchema, {
    defaultValues,
  });

  const onSubmit = handleSubmit(onSubmitHandler);

  const { data: assetModels, isLoading: isAssetModelsLoading } =
    useGetAllAssetModels();

  const { data: sensors = [], isLoading: isSensorsLoading } =
    useGetAllSensors();

  const sensorOptions = sensors.map((sensor) => ({
    label: sensor,
    value: sensor,
  }));

  return (
    <BaseModalForm
      onSubmit={onSubmit}
      buttonProps={{
        loading: isSubmitting,
      }}
    >
      <ControlledTextField label="Name" control={control} name="name" />
      <ControlledSelect
        control={control}
        label="Model"
        name="model"
        loading={isAssetModelsLoading}
        options={assetModels}
      />
      <ControlledSelect
        control={control}
        label="Sensors"
        name="sensors"
        options={sensorOptions}
        loading={isSensorsLoading}
        mode="multiple"
      />

      <div
        style={{
          display: "flex",
          gap: "1rem",
        }}
      >
        <ControlledNumberInput
          addonAfter="℃"
          label="Max Temp"
          control={control}
          name="specifications.maxTemp"
          min={0}
          step={5}
        />
        <ControlledNumberInput
          addonAfter={<RPMIcon />}
          label="RPM"
          control={control}
          step={100}
          min={0}
          name="specifications.rpm"
        />
        <ControlledNumberInput
          label="Power (kWh)"
          control={control}
          step={0.5}
          addonAfter={<KwhIcon />}
          min={0}
          name="specifications.power"
        />
      </div>
    </BaseModalForm>
  );
};
