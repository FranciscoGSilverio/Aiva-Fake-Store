import { FC, PropsWithChildren } from "react";
import { DataContextProvider } from "./DataContext";
import { RouteProtector } from "./RouteProtector";

export const Providers: FC<PropsWithChildren> = ({ children }) => (
  <DataContextProvider>
    <RouteProtector>{children}</RouteProtector>
  </DataContextProvider>
);
