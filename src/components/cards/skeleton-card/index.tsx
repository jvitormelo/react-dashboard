import { Card, Skeleton } from "antd";

interface Props {
  style?: React.CSSProperties;
}

export const SkeletonCard = ({ style }: Props) => {
  return (
    <Card
      style={{
        ...style,
      }}
    >
      <Skeleton active />
    </Card>
  );
};
