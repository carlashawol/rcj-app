import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Typography,
  Box,
  Stack,
  Button,
  FormControl,
  InputAdornment,
  FormHelperText,
  Select,
  OutlinedInput,
  MenuItem,
  InputLabel,
} from "@mui/material";
import StyledInputLabel from "../../components/StyledInputLabel";
import StyledInput from "../../components/StyledInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Image from "next/image";
import Images from "../../public/images/logo.png";

const Signin = (props) => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [router, status]);

  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const schema = yup.object({
    username: yup.string().required("Este campo es requerido"),
    password: yup.string().required("Este campo es requerido"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSignin = async (values) => {
    // validate your userinfo

    const res = await signIn("credentials", {
      username: values.username,
      password: values.password,
      redirect: false,
    });

    if (res.error) {
      setInvalidCredentials(true);
    }
  };
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      height="100vh"
      spacing={2}
    >
      <Stack
        justifyContent="center"
        px={6}
        py={4}
        alignItems="center"
        spacing={2}
        component="form"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(handleSignin)}
        border="1px solid #ced4da"
        borderRadius={5}
      >
        <Image src={Images} width={150} height={150} />
        <FormControl variant="standard" error={!!errors["username"]}>
          <StyledInputLabel htmlFor="username" label="NOMBRE DE USUARIO" />
          <StyledInput id="username" {...register("username")} />
          <FormHelperText sx={{ color: "#D32F2F" }}>
            {errors["username"] ? errors["username"].message : ""}
          </FormHelperText>
        </FormControl>

        <FormControl variant="standard" error={!!errors["password"]}>
          <StyledInputLabel htmlFor="password" label="CONTRASEÑA" />
          <StyledInput
            id="password"
            {...register("password")}
            type="password"
          />
          <FormHelperText sx={{ color: "#D32F2F" }}>
            {errors["password"] ? errors["password"].message : ""}
          </FormHelperText>
        </FormControl>

        <FormHelperText sx={{ color: "#D32F2F" }}>
          {invalidCredentials
            ? "Credenciales incorrectas, intenta con usuario y contraseña válidos."
            : ""}
        </FormHelperText>

        <Button
          type="submit"
          variant="contained"
          sx={{
            width: 300,
            backgroundColor: "#27749C",
            borderRadius: 20,
            fontWeight: 500,
            px: 4,
            py: 1.5,
          }}
        >
          Iniciar sesión
        </Button>
      </Stack>
    </Stack>
  );
};

export default Signin;
