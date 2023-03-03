import { useDeleteUnitMutation } from "@/api/unit/use-delete-unit-mutation";
import { toast } from "@/infra/toast";
import { Unit } from "@/types/entities/unit";

export const useUnitsTableActions = () => {
  const { mutateAsync: deleteUnitMutation } = useDeleteUnitMutation();

  const deleteUnit = async (unit: Unit) => {
    try {
      await deleteUnitMutation(unit.id);
      toast.success("Unit deleted successfully");
    } catch (e) {
      toast.error("Error deleting unit");
    }
  };

  const editUnit = async (unit: Unit) => {
    console.log("Edit unit", unit);
  };

  return {
    onDelete: deleteUnit,
    onEdit: editUnit,
  };
};
