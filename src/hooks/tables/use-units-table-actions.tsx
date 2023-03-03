import { useDeleteUnitMutation } from "@/api/unit/use-delete-unit-mutation";
import { useUpdateUnitMutation } from "@/api/unit/use-update-unit-mutation";
import { toast } from "@/infra/toast";
import { Unit } from "@/types/entities/unit";
import { UnitForm } from "@/views/company/components/form/index";
import { UnitSchema } from "@/views/company/components/form/schema";
import { useModal } from "../use-modal";

export const useUnitsTableActions = () => {
  const { mutateAsync: deleteUnitMutation } = useDeleteUnitMutation();
  const { mutateAsync: updateUnitMutation } = useUpdateUnitMutation();
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
      body: <UnitForm onSubmit={submitHandler} defaultValues={unit} />,
    });
  };

  return {
    onDelete: deleteUnit,
    onEdit: editUnit,
  };
};
