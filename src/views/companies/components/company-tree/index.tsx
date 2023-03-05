import { SkeletonCard } from "@/components/cards/skeleton-card";
import { Card, Tree } from "antd";
import { useCompanyTree } from "../../hooks/use-company-tree";

export const CompanyTree = () => {
  const { tree, isLoading } = useCompanyTree();

  if (isLoading) return <SkeletonCard />;

  return (
    <Card>
      <Tree
        defaultExpandedKeys={["0-0", "0-1"]}
        showLine
        showIcon
        treeData={tree}
      />
    </Card>
  );
};
