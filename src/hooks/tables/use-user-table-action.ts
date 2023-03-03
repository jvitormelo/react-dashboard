import { useDeleteUserMutation } from "@/api/user/use-delete-user-mutation";
import { toast } from "@/infra/toast";
import { User } from "@/types/entities/user";

export const useUserTableAction = () => {
  const { mutateAsync: deleteUser } = useDeleteUserMutation();

  const onSelect = (user: User) => {
    console.log(user);
  };

  const onEdit = (user: User) => {
    console.log(user);
  };

  const onDelete = async (user: User) => {
    try {
      await deleteUser(user.id);
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Error deleting user");
      console.log(error);
    }

    console.log(user);
  };

  return {
    onSelect,
    onEdit,
    onDelete,
  };
};
