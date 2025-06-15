import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export const useLoginContainer = () => {
  const router = useRouter();

  const [, setIsLoggedIn] = useLocalStorage<boolean>("isLoggedIn", false);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoggedIn(true);
    router.push("/");
  };

  return {
    handleLogin,
  };
};
