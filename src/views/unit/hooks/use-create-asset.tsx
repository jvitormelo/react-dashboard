import { useCreateAssetMutation } from "@/api/asset/use-create-asset-mutation";
import { useUploadAssetImageMutation } from "@/api/asset/use-upload-asset-image-mutation";
import { CreateAssetForm } from "@/components/forms/asset-form/create-asset-form";
import { SubmitCreateAssetParams } from "@/components/forms/asset-form/create-asset-form/types";
import { useModal } from "@/hooks/use-modal";
import { toast } from "@/utils/feedback";
import { Routes } from "@/router/routes";
import { useCreateAssetFormStore } from "@/store/create-asset-form-store";
import { useNavigate } from "react-router-dom";

interface Props {
  companyId: number;
  unitId: number;
}

export const useCreateAsset = ({ companyId, unitId }: Props) => {
  const { closeModal, openModal } = useModal();
  const { mutateAsync: createAsset } = useCreateAssetMutation();
  const { uploadImage } = useUploadAssetImageMutation();
  const clearCreateFormStore = useCreateAssetFormStore(
    (selector) => selector.clear
  );
  const navigate = useNavigate();

  const submitForm = async (values: SubmitCreateAssetParams) => {
    try {
      const { assetInfo, image } = values;
      const createdAsset = await createAsset({
        assignedUserIds: [],
        companyId,
        unitId,
        image: "",
        ...assetInfo,
      });

      await uploadImage(createdAsset.id, image);

      toast.success("Asset created");

      closeModal();

      navigate(Routes.asset(companyId, unitId, createdAsset.id));
    } catch (e) {
      toast.error("Error creating asset");
    }
  };

  const onCreate = () => {
    openModal({
      title: "Create Asset",
      body: <CreateAssetForm submitForm={submitForm} />,
      maskClosable: false,
      afterClose: clearCreateFormStore,
      width: 600,
    });
  };

  return {
    onCreateAssetClick: onCreate,
  };
};
