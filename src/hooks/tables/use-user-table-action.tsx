import { useDeleteUserMutation } from "@/api/user/use-delete-user-mutation";
import { UserForm } from "@/components/forms/user-form";
import { UserSchema } from "@/components/forms/user-form/schema";
import { toast } from "@/infra/toast";
import { User } from "@/types/entities/user";
import { useModal } from "../use-modal";

export const useUserTableAction = () => {
  const { closeModal, openModal } = useModal();
  const { mutateAsync: deleteUser } = useDeleteUserMutation();

  const onSelect = (user: User) => {
    console.log(user);
  };

  const onEdit = (user: User) => {
    const onSubmitHandler = async (values: UserSchema) => {
      console.log(values);
      closeModal();
    };

    openModal({
      title: "Edit User",
      body: <UserForm defaultValues={user} onSubmitHandler={onSubmitHandler} />,
    });
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
