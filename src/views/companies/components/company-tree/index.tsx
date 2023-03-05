import { Card, Tree } from "antd";
import { useCompanyTree } from "../../hooks/use-company-tree";

export const CompanyTree = () => {
  const { tree } = useCompanyTree();

  return (
    <Card>
      <Tree showLine showIcon treeData={tree} />
    </Card>
  );
};
