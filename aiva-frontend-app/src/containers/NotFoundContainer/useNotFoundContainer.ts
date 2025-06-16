import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const useNotFoundContainer = () => {
  const [countdown, setCountdown] = useState(10);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const handleGoHome = () => {
    router.push("/");
  };

  return {
    handleGoHome,
    countdown,
  };
};
