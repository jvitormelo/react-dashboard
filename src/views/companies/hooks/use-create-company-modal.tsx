import { useCreateCompanyMutation } from "@/api/company/use-create-company";
import { useModal } from "@/hooks/use-modal";
import { toast } from "@/infra/toast";
import { CompanyForm } from "@/components/forms/company-form";
import { CompanyFormSchema } from "@/components/forms/company-form/schema";

export const useCreateCompanyModal = () => {
  const { closeModal, openModal } = useModal();

  const { mutateAsync: create } = useCreateCompanyMutation();

  const onSubmit = async (values: CompanyFormSchema) => {
    try {
      await create(values);
      // Should the message be here or separated?
      toast.success(`Company ${values.name} created!`);
      closeModal();
    } catch (err) {
      toast.error("Failed to create company!");
    }
  };

  const openCreateModal = () => {
    openModal({
      title: "Create Company",
      body: <CompanyForm onSubmitHandler={onSubmit} />,
    });
  };

  return {
    openCreateModal,
  };
};
