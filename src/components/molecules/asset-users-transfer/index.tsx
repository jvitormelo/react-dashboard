import { useUpdateAssetMutation } from "@/api/asset/use-update-asset-mutation";
import { useGetUsersByCompany } from "@/api/user/use-get-users-by-company";
import { UserAvatar } from "@/components/atoms/user-avatar";
import { UserPopOver } from "@/components/molecules/user-pop-over";
import { BaseModalForm } from "@/components/forms/base-modal-form";
import { ItemsTransfer, ItemTransfer } from "@/components/atoms/items-transfer";
import { useModal } from "@/hooks/use-modal";
import { useTheme } from "@/hooks/use-theme";
import { toast } from "@/utils/feedback";
import { Asset } from "@/types/entities/asset";
import { useState } from "react";

interface Props {
  asset: Asset;
}

export const AssetUsersTransfer = ({ asset }: Props) => {
  const { theme } = useTheme();
  const { closeModal } = useModal();
  const { data: users = [] } = useGetUsersByCompany(asset.companyId);

  const { mutateAsync: updateAsset, isLoading } = useUpdateAssetMutation();

  const [target, setTarget] = useState<string[]>(
    asset.assignedUserIds.map((value) => value.toString())
  );

  const source: ItemTransfer[] = users.map((user) => ({
    description: user.email,
    key: user.id.toString(),
    title: user.name,
  }));

  const onSubmit = async () => {
    try {
      await updateAsset({
        ...asset,
        assignedUserIds: target.map((value) => parseInt(value)),
      });
      toast.success("Assignments updated");

      closeModal();
    } catch (e) {
      toast.error("Error assigning users to asset");
    }
  };

  return (
    <BaseModalForm
      buttonProps={{
        loading: isLoading,
      }}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <ItemsTransfer
        setTarget={setTarget}
        source={source}
        target={target}
        titles={["Users from company", "Assigned Users"]}
        render={(item) => (
          <UserPopOver
            user={{
              email: item.description,
              name: item.title,
            }}
          >
            <UserAvatar
              style={{
                marginRight: theme.marginSM,
              }}
              email={item.description}
            />
            {item.title}
          </UserPopOver>
        )}
      />
    </BaseModalForm>
  );
};
