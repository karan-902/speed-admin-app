import type { ReactNode } from "react";

interface IRenderWithFallbackProps {
  loading: boolean;
  skeleton: ReactNode;
  children: ReactNode;
}
export default function RenderWithFallBack({
  loading,
  skeleton,
  children,
}: IRenderWithFallbackProps) {
  const renderWithFallBackBody = () => {
    if (loading) return skeleton;
    if (!loading) return children;
  };
  return <>{renderWithFallBackBody()}</>;
}
