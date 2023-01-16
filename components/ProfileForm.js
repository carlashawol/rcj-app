import {
  Typography,
  Stack,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import StyledInputLabel from "./StyledInputLabel";
import StyledInput from "./StyledInput";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SuccessConfirmationModal from "./SuccessConfirmationModal";
import ErrorModal from "./ErrorModal";
import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import useChangePassword from "./../hooks/useChangePassword";
import { signOut } from "next-auth/react";

export default function ProfileForm({ userData }) {
  const [confirmationMessage, setConfirmationMessage] = useState(false);
  const [titlePopup, setTitlePopup] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const [showPrevius, setShowPrevius] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const [incorrectPrevius, setIncorrectPrevius] = React.useState(false);
  const [errorConfirm, setErrorConfirm] = React.useState(false);

  const { updatePassword } = useChangePassword();

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const schema = yup.object({
    previus_password: yup.string().required("Este campo es requerido"),
    new_password: yup.string().required("Este campo es requerido"),
    confirm_password: yup.string().required("Este campo es requerido"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleCloseSuccessConfirmationModal = () => {
    signOut();
  };

  const handleCloseErrorModal = () => {
    setErrorMessage(false);
  };

  const handleChangePassword = async (values) => {
    if (values.new_password === values.confirm_password) {
      setErrorConfirm(false);
      const changePasswordData = {
        previus_password: values.previus_password,
        new_password: values.new_password,
        username: userData.username,
      };

      const apiResponse = await updatePassword(changePasswordData);
      console.log(apiResponse);
      if (!apiResponse.error && apiResponse.data) {
        setIncorrectPrevius(false);
        setTitlePopup(apiResponse.data.username);
        setConfirmationMessage(true);
      } else if (apiResponse.status === 401) {
        setIncorrectPrevius(true);
      } else {
        setErrorMessage(true);
      }
    } else {
      setErrorConfirm(true);
    }
  };

  return (
    <>
      <Stack
        justifyContent="center"
        alignItems="center"
        padding={4}
        component="form"
        onSubmit={handleSubmit(handleChangePassword)}
      >
        <Stack>
          <Stack
            justifyContent="center"
            alignItems="flex-start"
            spacing={4}
            pt={5}
          >
            <Stack
              direction={"row"}
              justifyContent="center"
              alignItems={"flex-end"}
              spacing={3}
            >
              <FormControl variant="standard">
                <StyledInputLabel htmlFor="name" label="NOMBRE COMPLETO" />
                <StyledInput
                  id="name"
                  sx={{ "& .MuiInputBase-input": { width: "400px" } }}
                  value={userData?.first_name + " " + userData?.last_name}
                  disabled
                />
              </FormControl>

              <FormControl variant="standard">
                <StyledInputLabel
                  htmlFor="username"
                  label="NOMBRE DE USUARIO"
                />
                <StyledInput
                  id="username"
                  sx={{ "& .MuiInputBase-input": { width: "400px" } }}
                  value={userData?.username}
                  disabled
                />
              </FormControl>
            </Stack>

            <Stack spacing={3}>
              <Stack
                direction={"row"}
                spacing={3}
                justifyContent="center"
                alignItems="flex-end"
              >
                <FormControl variant="standard">
                  <StyledInputLabel
                    htmlFor="email"
                    label="CORREO ELECTRÓNICO"
                  />
                  <StyledInput
                    id="email"
                    sx={{ "& .MuiInputBase-input": { width: "400px" } }}
                    value={userData?.email}
                    disabled
                  />
                </FormControl>

                <FormControl variant="standard">
                  <StyledInputLabel htmlFor="job" label="CARGO" />
                  <StyledInput
                    id="job"
                    sx={{ "& .MuiInputBase-input": { width: "400px" } }}
                    value={userData?.job}
                    disabled
                  />
                </FormControl>
              </Stack>
            </Stack>

            {changePassword ? (
              <Stack spacing={2}>
                <FormControl
                  variant="standard"
                  error={!!errors["previus_password"]}
                >
                  <StyledInputLabel
                    htmlFor="previus"
                    label="ANTERIOR CONTRASEÑA"
                  />
                  <StyledInput
                    id="previus"
                    sx={{ "& .MuiInputBase-input": { width: "400px" } }}
                    type={showPrevius ? "text" : "password"}
                    autoComplete="new-password"
                    endAdornment={
                      <InputAdornment position="start" sx={{ ml: -5, mt: 1 }}>
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPrevius((show) => !show)}
                          onMouseDown={handleMouseDownPassword}
                          edge="start"
                        >
                          {showPrevius ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    {...register("previus_password")}
                  />
                  <FormHelperText sx={{ color: "#D32F2F" }}>
                    {errors["previus_password"]
                      ? errors["previus_password"].message
                      : ""}
                  </FormHelperText>
                </FormControl>

                <FormHelperText sx={{ color: "#D32F2F" }}>
                  {incorrectPrevius
                    ? "Contraseña previa incorrecta, intente nuevamente."
                    : ""}
                </FormHelperText>

                <FormControl
                  variant="standard"
                  error={!!errors["new_password"]}
                >
                  <StyledInputLabel
                    htmlFor="password"
                    label="NUEVA CONTRASEÑA"
                  />
                  <StyledInput
                    id="password"
                    sx={{ "& .MuiInputBase-input": { width: "400px" } }}
                    type={showPassword ? "text" : "password"}
                    {...register("new_password")}
                    endAdornment={
                      <InputAdornment position="start" sx={{ ml: -5, mt: 1 }}>
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword((show) => !show)}
                          onMouseDown={handleMouseDownPassword}
                          edge="start"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText sx={{ color: "#D32F2F" }}>
                    {errors["new_password"]
                      ? errors["new_password"].message
                      : ""}
                  </FormHelperText>
                </FormControl>

                <FormControl
                  variant="standard"
                  error={!!errors["confirm_password"]}
                >
                  <StyledInputLabel
                    htmlFor="confirm"
                    label="CONFIRMACIÓN DE CONTRASEÑA"
                  />
                  <StyledInput
                    id="confirm"
                    sx={{ "& .MuiInputBase-input": { width: "400px" } }}
                    type={showConfirmation ? "text" : "password"}
                    {...register("confirm_password")}
                    endAdornment={
                      <InputAdornment position="start" sx={{ ml: -5, mt: 1 }}>
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowConfirmation((show) => !show)}
                          onMouseDown={handleMouseDownPassword}
                          edge="start"
                        >
                          {showConfirmation ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText sx={{ color: "#D32F2F" }}>
                    {errors["confirm_password"]
                      ? errors["confirm_password"].message
                      : ""}
                  </FormHelperText>
                </FormControl>

                <FormHelperText sx={{ color: "#D32F2F" }}>
                  {errorConfirm
                    ? "La confirmación de la contraseña no coincide."
                    : ""}
                </FormHelperText>
              </Stack>
            ) : null}
          </Stack>

          {changePassword === false ? (
            <Button
              onClick={() => {
                if (changePassword) {
                  setChangePassword(false);
                } else {
                  setChangePassword(true);
                }
              }}
              variant="contained"
              sx={{
                alignSelf: "start",
                backgroundColor: "#27749C",
                borderRadius: 20,
                fontWeight: 500,
                marginTop: 5,
                px: 4,
                py: 1.5,
                mb: "30px !important",
              }}
            >
              Cambiar Contraseña
            </Button>
          ) : null}

          {changePassword ? (
            <Stack direction={"row"} spacing={2} mt={2}>
              <Button
                onClick={() => {
                  setChangePassword(false);
                  reset();
                }}
                variant="contained"
                sx={{
                  alignSelf: "start",
                  backgroundColor: "#27749C",
                  borderRadius: 20,
                  fontWeight: 500,
                  px: 4,
                  py: 1.5,
                  mb: "30px !important",
                }}
              >
                Cancelar
              </Button>

              <Button
                type="submit"
                variant="contained"
                sx={{
                  alignSelf: "end",
                  backgroundColor: "#27749C",
                  borderRadius: 20,
                  fontWeight: 500,
                  px: 4,
                  py: 1.5,
                  mb: "30px !important",
                }}
              >
                Aceptar
              </Button>
            </Stack>
          ) : null}
        </Stack>
      </Stack>
      <SuccessConfirmationModal
        title={titlePopup}
        modalTitle="La contraseña fue actualizada exitosamente"
        buttonTitle="Cerrar"
        admin={false}
        openModal={confirmationMessage}
        changePassword={true}
        closeModal={handleCloseSuccessConfirmationModal}
      />
      <ErrorModal
        title="Error"
        modalTitle="El instrumento no fue creado, intente más tarde."
        buttonTitle="Cerrar"
        admin={false}
        openModal={errorMessage}
        closeModal={handleCloseErrorModal}
      />
    </>
  );
}
