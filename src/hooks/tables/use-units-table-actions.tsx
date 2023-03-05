import { useCreateUnitMutation } from "@/api/unit/use-create-unit-mutation";
import { useDeleteUnitMutation } from "@/api/unit/use-delete-unit-mutation";
import { setUnitCache } from "@/api/unit/use-get-unit";
import { useUpdateUnitMutation } from "@/api/unit/use-update-unit-mutation";
import { toast } from "@/utils/feedback";
import { Unit } from "@/types/entities/unit";
import { UnitForm } from "@/components/forms/unit-form";
import { UnitSchema } from "@/components/forms/unit-form/schema";
import { useModal } from "../use-modal";

export const useUnitsTableActions = (companyId: number) => {
  const { mutateAsync: deleteUnitMutation } = useDeleteUnitMutation();
  const { mutateAsync: updateUnitMutation } = useUpdateUnitMutation();
  const { mutateAsync: createUnitMutation } = useCreateUnitMutation();
  const { closeModal, openModal } = useModal();

  const deleteUnit = async (unit: Unit) => {
    try {
      await deleteUnitMutation(unit.id);
      toast.success("Unit deleted successfully");
    } catch (e) {
      toast.error("Error deleting unit");
    }
  };

  const editUnit = async (unit: Unit) => {
    const submitHandler = async (data: UnitSchema) => {
      try {
        await updateUnitMutation({ ...unit, ...data });
        toast.success("Unit updated successfully");
        closeModal();
      } catch (e) {
        toast.error("Error updating unit");
      }
    };

    openModal({
      title: "Edit Unit",
      body: <UnitForm onSubmitHandler={submitHandler} defaultValues={unit} />,
    });
  };

  const onUnitSelect = (unit: Unit) => {
    setUnitCache(unit);
  };

  const createUnit = async (data: UnitSchema) => {
    try {
      await createUnitMutation({ ...data, companyId });
      toast.success("Unit created successfully");
      closeModal();
    } catch (e) {
      toast.error("Error creating unit");
    }
  };

  const openCreateUnitModal = () => {
    openModal({
      title: "Create Unit",
      body: <UnitForm onSubmitHandler={createUnit} />,
    });
  };

  return {
    onDelete: deleteUnit,
    onEdit: editUnit,
    onSelect: onUnitSelect,
    headerProps: {
      onButtonClick: openCreateUnitModal,
      buttonLabel: "New unit",
    },
  };
};
