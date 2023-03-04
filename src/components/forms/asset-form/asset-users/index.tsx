import { ItemsTransfer } from "@/components/items-transfer";
import { useAssetUsersTransfer } from "@/hooks/transfer/use-transfer-asset-users";
import { BaseModalForm } from "../../base-modal-form";

interface Props {
  companyId: number;
  assignedUserIds?: number[];
  onSubmit: (data: number[]) => void;
}

export const AssetUsersForm = ({
  companyId,
  onSubmit,
  assignedUserIds = [],
}: Props) => {
  const transferProps = useAssetUsersTransfer({
    companyId,
    assignedUserIds,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(transferProps.target.map((item) => Number(item)));
  };

  return (
    <BaseModalForm onSubmit={handleSubmit}>
      <ItemsTransfer {...transferProps} />
    </BaseModalForm>
  );
};
