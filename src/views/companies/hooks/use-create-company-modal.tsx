import { useModal } from "@/hooks/use-modal";
import { Company } from "@/types/entities/company";
import { useRef } from "react";
import { CompanyForm } from "../components/forms/company-form";

export const useCreateCompanyModal = () => {
  const { openModal, closeModal } = useModal();
  const modalId = useRef<string>();

  const onSubmit = (values: Company) => {
    console.log(values);
    closeModal(modalId.current);
  };

  const openCreateModal = () => {
    modalId.current = openModal({
      title: "Create company",
      body: <CompanyForm onSubmit={onSubmit} />,
    });
  };

  return {
    openCreateModal,
  };
};
