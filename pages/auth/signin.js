import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { CircularProgress, Stack } from "@mui/material";

const Signin = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    } else if (status === "authenticated") {
      router.push("/");
    }
  }, [router, status]);

  return (
    <Stack flex={1} alignItems="center" justifyContent="center">
      <CircularProgress size={44} />
    </Stack>
  );
};

export default Signin;
