import { useCreateCompany } from "@/api/company/use-create-company";
import { BaseModal } from "@/components/modals/base-modal";
import { toast } from "@/infra/toast";
import { useState } from "react";
import { CompanyForm } from "../components/forms/company-form";
import { CompanyFormSchema } from "../components/forms/schema";

export const useCreateCompanyModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutateAsync: create, isLoading } = useCreateCompany();

  const onSubmit = async (values: CompanyFormSchema) => {
    try {
      await create(values);
      // Should the message be here or separated?
      toast.success(`Company ${values.name} created!`);
      setIsOpen(false);
    } catch (err) {
      toast.error("Failed to create company!");
    }
  };

  const modal = (
    <BaseModal
      open={isOpen}
      setIsOpen={setIsOpen}
      title="Create company"
      body={<CompanyForm onSubmit={onSubmit} loading={isLoading} />}
    />
  );

  const openCreateModal = () => {
    setIsOpen(true);
  };

  return {
    createdModal: modal,
    openCreateModal,
  };
};
