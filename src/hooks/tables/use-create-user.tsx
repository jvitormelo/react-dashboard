import { useCreateUserMutation } from "@/api/user/use-create-user-mutation";
import { UserForm } from "@/components/forms/user-form";
import { UserSchema } from "@/components/forms/user-form/schema";
import { useModal } from "../use-modal";

interface Params {
  companyId: number;
  unitId: number;
}

export const useCreateUserModal = ({ companyId, unitId }: Params) => {
  const { mutateAsync: createUser } = useCreateUserMutation();
  const { openModal, closeModal } = useModal();

  const submitUser = async (values: UserSchema) => {
    await createUser({
      ...values,
      companyId,
      unitId,
    });
    closeModal();
  };

  const openCreateUserModal = () => {
    openModal({
      title: "Create User",
      body: <UserForm onSubmitHandler={submitUser} />,
    });
  };

  return {
    openCreateUserModal,
  };
};
