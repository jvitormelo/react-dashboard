import { BaseModal } from "@/components/modals/base-modal";
import { useState } from "react";
import { CompanyForm } from "../components/forms/company-form";
import { CompanyFormSchema } from "../components/forms/schema";

export const useCreateCompanyModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = (values: CompanyFormSchema) => {
    console.log(values);
  };

  const modal = (
    <BaseModal
      open={isOpen}
      setIsOpen={setIsOpen}
      title="Create company"
      body={<CompanyForm onSubmit={onSubmit} />}
    />
  );

  const openCreateModal = () => {
    setIsOpen(true);
  };

  return {
    modal,
    openCreateModal,
  };
};
