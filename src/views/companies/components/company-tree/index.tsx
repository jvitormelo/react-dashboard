import { SkeletonCard } from "@/components/cards/skeleton-card";
import { Card, Tree } from "antd";
import { useCompanyTree } from "../../hooks/use-company-tree";

export const CompanyTree = () => {
  const { tree, isLoading, defaultExpandedKeys } = useCompanyTree();

  if (isLoading) return <SkeletonCard />;

  return (
    <Card>
      <Tree
        defaultExpandedKeys={defaultExpandedKeys}
        showLine
        showIcon
        treeData={tree}
      />
    </Card>
  );
};
