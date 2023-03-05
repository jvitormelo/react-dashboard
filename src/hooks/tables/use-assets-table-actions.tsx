import { setAssetCache } from "@/api/asset/set-asset-cache";
import { useDeleteAssetMutation } from "@/api/asset/use-delete-asset-mutation";
import { useUpdateAssetMutation } from "@/api/asset/use-update-asset-mutation";
import { useUploadAssetImageMutation } from "@/api/asset/use-upload-asset-image-mutation";
import { EditAssetForm } from "@/components/forms/asset-form/edit-asset-form";
import { AssetSchema } from "@/components/forms/asset-form/schema";
import { toast } from "@/utils/feedback";
import { Asset } from "@/types/entities/asset";
import { useModal } from "../use-modal";

export const useAssetsTable = () => {
  const { openModal } = useModal();
  const { mutateAsync: updateAsset } = useUpdateAssetMutation();
  const { uploadImage } = useUploadAssetImageMutation();
  const { mutateAsync: deleteAsset } = useDeleteAssetMutation();

  const onSelect = (asset: Asset) => {
    setAssetCache(asset);
  };

  const onEdit = (asset: Asset) => {
    const onSubmit = async (values: AssetSchema) => {
      try {
        await updateAsset({
          ...asset,
          ...values,
          specifications: {
            ...asset.specifications,
            power: values.specifications.power ?? undefined,
            rpm: values.specifications.rpm ?? undefined,
          },
        });
        toast.success("Asset updated successfully");
      } catch (e) {
        toast.error("Asset updated successfully");
      }
    };

    const saveImage = async (file: File) => {
      try {
        await uploadImage(asset.id, file);
        toast.success("Image uploaded successfully");
        return true;
      } catch (e) {
        toast.error("Image uploaded successfully");
        return false;
      }
    };

    openModal({
      title: "Edit Asset",
      width: "700px",
      body: (
        <EditAssetForm
          onSubmit={onSubmit}
          saveImage={saveImage}
          defaultValues={asset}
        />
      ),
      maskClosable: false,
    });
  };

  const onDelete = async (asset: Asset) => {
    try {
      await deleteAsset(asset.id);
      toast.success("Asset deleted successfully");
    } catch (e) {
      toast.error("Asset deleted successfully");
    }
  };

  return {
    onSelect,
    onEdit,
    onDelete,
  };
};
