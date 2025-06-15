"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Home, AlertTriangle } from "lucide-react";

export default function NotFound() {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 flex items-center justify-center p-4 mx-auto">
      <Card className="w-full max-w-md text-center shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900">
            404
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Oops! A página que você está procurando não existe.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <p className="text-sm text-gray-500">
            Não se preocupe, isso acontece com todo mundo. A página pode ter
            sido movida, excluída ou você pode ter digitado o URL
            incorretamente.
          </p>

          <div className="space-y-4">
            <Button
              onClick={handleGoHome}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
            >
              <Home className="w-4 h-4 mr-2" />
              De volta para a página inicial
            </Button>

            <div className="text-sm text-gray-500 bg-gray-50 rounded-lg p-3 border">
              <p className="font-medium mb-1">
                Redirecionamento automático em:
              </p>
              <p className="text-2xl font-bold text-blue-600">{countdown}s</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
