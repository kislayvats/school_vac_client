// module imports
import ProviderWrapper from "@/store/provider";
import DashboardWrapper from "./wireframe/DashboardWireframe";

//JSX return
export function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ProviderWrapper>
      <DashboardWrapper>{children}</DashboardWrapper>
    </ProviderWrapper>
  );
}
