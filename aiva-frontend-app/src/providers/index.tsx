import { FC, PropsWithChildren } from "react";
import { DataContextProvider } from "./DataContext";

export const Providers: FC<PropsWithChildren> = ({ children }) => (
  <DataContextProvider>{children}</DataContextProvider>
);
