// module imports
import ProviderWrapper from "@/store/provider";

//JSX return
export function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ProviderWrapper>
      <>{children}</>
    </ProviderWrapper>
  );
}
