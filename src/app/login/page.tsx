"use client";

import { Suspense } from "react";
import Loader from "@/components/ui/Loader";
import LoginContent from "./LoginContent";

function LoginLayout() {
  return (
    <Suspense fallback={<Loader />}>
      <LoginContent />
    </Suspense>
  );
}

export default LoginLayout;
