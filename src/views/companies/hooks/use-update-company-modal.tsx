import { useUpdateCompanyMutation } from "@/api/company/use-update-company";
import { BaseModal } from "@/components/modals/base-modal";
import { toast } from "@/infra/toast";
import { Company } from "@/types/entities/company";
import { useState } from "react";
import { CompanyForm } from "../components/form";
import { CompanyFormSchema } from "../components/form/schema";

export const useUpdateCompanyModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [company, setCompany] = useState<Company | null>(null);

  const { mutateAsync: update, isLoading } = useUpdateCompanyMutation();

  const openUpdateModal = (company: Company) => {
    setCompany(company);
    setIsOpen(true);
  };

  const onSubmit = async (values: CompanyFormSchema) => {
    try {
      await update({ id: company?.id || 0, ...values });
      toast.success(`Company ${values.name} updated!`);
      setIsOpen(false);
    } catch (err) {
      toast.error(`Failed to update company ${values.name}!`);
    }
  };

  const modal = company && (
    <BaseModal
      open={isOpen}
      setIsOpen={setIsOpen}
      title={`Update company ${company.name}`}
      body={
        <CompanyForm
          loading={isLoading}
          onSubmit={onSubmit}
          defaultValues={company}
        />
      }
    />
  );

  return {
    openUpdateModal,
    updateModal: modal,
  };
};
