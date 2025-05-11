"use client";
// module import
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// file import
import store from "./index";

// Create a client
const queryClient = new QueryClient();
// redux persist
let persistor = persistStore(store);
// the component or page wrapped inside this will have access to Redux Store and Next Ui configuration
export default function ProviderWrapper({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // jsx
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <HeroUIProvider locale="en-GB">{children}</HeroUIProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
