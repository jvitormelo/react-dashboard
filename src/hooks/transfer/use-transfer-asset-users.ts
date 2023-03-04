import { useGetUsersByCompany } from "@/api/user/use-get-users-by-company";
import { ItemTransfer } from "@/components/items-transfer";
import { Asset } from "@/types/entities/asset";
import { useState } from "react";

interface Props {
  assignedUserIds?: Asset["assignedUserIds"];
  companyId: Asset["companyId"];
}

export const useAssetUsersTransfer = ({
  assignedUserIds = [],
  companyId,
}: Props) => {
  const { data: users = [] } = useGetUsersByCompany(companyId);

  const [targetItems, setTargetItems] = useState<string[]>(
    assignedUserIds?.map((value) => value.toString())
  );

  const sourceItems: ItemTransfer[] = users.map((user) => ({
    description: user.email,
    key: user.id.toString(),
    title: user.name,
  }));

  return {
    titles: ["Users", "Assigned Users"] as [string, string],
    source: sourceItems,
    target: targetItems,
    setTarget: setTargetItems,
  };
};
