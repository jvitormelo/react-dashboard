import { SkeletonCard } from "@/components/cards/skeleton-card";
import { useTheme } from "@/hooks/use-theme";

export const AssetSkeleton = () => {
  const { theme } = useTheme();
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: theme.marginMD,
          minHeight: 275,
        }}
      >
        <SkeletonCard></SkeletonCard>
        <SkeletonCard></SkeletonCard>
        <SkeletonCard></SkeletonCard>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "50vh",
          gap: theme.marginMD,
          marginTop: theme.marginMD,
        }}
      >
        <SkeletonCard></SkeletonCard>
        <SkeletonCard></SkeletonCard>
      </div>
    </div>
  );
};
