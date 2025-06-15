"use client";

import { FC, PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export const RouteProtector: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const [isLoggedIn] = useLocalStorage<boolean>("isLoggedIn", false);

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn, router]);

  return <>{children}</>;
};
