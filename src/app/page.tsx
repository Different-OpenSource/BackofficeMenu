"use client";

import Button from "@/components/Button";
import APICaller from "@/utils/APICaller";
import { useAuthRedirect } from "@/utils/isAuthenticated";

export default function Home() {
  const isAuth = useAuthRedirect();

  async function helloWorld() {
    try {
      const response = await APICaller("/api/helloworld", "GET");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div>
      Home page
      {isAuth && (
        <Button
          onClick={helloWorld}
          text="hello world (needs auth)"
          style="primary"
        />
      )}
    </div>
  );
}
