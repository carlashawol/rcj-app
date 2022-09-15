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
import StyledInputLabel from "./StyledInputLabel";
import StyledInput from "./StyledInput";
import useClients from "./../hooks/useClients";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SuccessConfirmationModal from "./SuccessConfirmationModal";
import ErrorModal from "./ErrorModal";
import React, {useState} from "react";

export default function FormAddClients() {
  const { createClient } = useClients();

  const [confirmationMessage, setConfirmationMessage] = useState(false);
  const [titlePopup, setTitlePopup] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const payment_method = [
    "Contado contra entrega",
    "Crédito 7 días",
    "Crédito 15 días",
  ];

  const schema = yup.object({
    name: yup.string().required("Este campo es requerido"),
    nit: yup.string().required("Este campo es requerido"),
    rif: yup.string().required("Este campo es requerido"),
    address: yup.string().required("Este campo es requerido"),
    city: yup.string().required("Este campo es requerido"),
    department: yup.string().required("Este campo es requerido"),
    country: yup.string().required("Este campo es requerido"),
    contact: yup.string().required("Este campo es requerido"),
    telephone: yup
      .string()
      .required("Este campo es requerido")
      .matches(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
        "En este campo se debe ingresar un número de teléfono válido"
      ),
    cellphone: yup
      .string()
      .required("Este campo es requerido")
      .matches(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
        "En este campo se debe ingresar un número de teléfono válido"
      ),
    email: yup
      .string()
      .email("En este campo se debe ingresar un correo electrónico válido")
      .required("Este campo es requerido"),
    payment_method: yup.string().required("Este campo es requerido"),

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
    setConfirmationMessage(false);
  };

  const handleCloseErrorModal = () => {
    setErrorMessage(false);
  };

  const handleCreateUser = async (values) => {

    const apiResponse = await createClient(values);

    if (!apiResponse.error && apiResponse.data) {
      reset()
      setTitlePopup(apiResponse.data.name);
      setConfirmationMessage(true);
    } else {
      setErrorMessage(true);
    }
  };

  return (
    <>
      <Stack justifyContent="center" pt={5} alignItems="center" pb={5}>
        <Stack
          spacing={4}
          maxWidth={1080}
          component="form"
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Stack direction={"row"} paddingTop={2} spacing={3}>
            <FormControl variant="standard" error={!!errors["name"]}>
              <StyledInputLabel htmlFor="name" label="NOMBRE" />
              <StyledInput id="name" {...register("name")} />
              <FormHelperText sx={{ color: "#D32F2F" }}>
                {errors["name"] ? errors["name"].message : ""}
              </FormHelperText>
            </FormControl>

            <FormControl variant="standard" error={!!errors["nit"]}>
              <StyledInputLabel htmlFor="nit" label="NIT" />
              <StyledInput id="nit" {...register("nit")} />
              <FormHelperText sx={{ color: "#D32F2F" }}>
                {errors["nit"] ? errors["nit"].message : ""}
              </FormHelperText>
            </FormControl>

            <FormControl variant="standard" error={!!errors["rif"]}>
              <StyledInputLabel htmlFor="rif" label="RIF" />
              <StyledInput id="rif" {...register("rif")} />
              <FormHelperText sx={{ color: "#D32F2F" }}>
                {errors["rif"] ? errors["rif"].message : ""}
              </FormHelperText>
            </FormControl>
          </Stack>

          <FormControl variant="standard" error={!!errors["address"]}>
            <StyledInputLabel htmlFor="direction" label="DIRECCIÓN" />
            <StyledInput
              id="direction"
              sx={{ "& .MuiInputBase-input": { width: "1037px" } }}
              {...register("address")}
            />
            <FormHelperText sx={{ color: "#D32F2F" }}>
              {errors["address"] ? errors["address"].message : ""}
            </FormHelperText>
          </FormControl>

          <Stack direction={"row"} spacing={3}>
            <FormControl variant="standard" error={!!errors["city"]}>
              <StyledInputLabel htmlFor="city" label="CIUDAD" />
              <StyledInput id="city" {...register("city")} />
              <FormHelperText sx={{ color: "#D32F2F" }}>
                {errors["city"] ? errors["city"].message : ""}
              </FormHelperText>
            </FormControl>

            <FormControl variant="standard" error={!!errors["department"]}>
              <StyledInputLabel htmlFor="state" label="DEPARTAMENTO" />
              <StyledInput id="state" {...register("department")} />
              <FormHelperText sx={{ color: "#D32F2F" }}>
                {errors["department"] ? errors["department"].message : ""}
              </FormHelperText>
            </FormControl>

            <FormControl variant="standard" error={!!errors["country"]}>
              <StyledInputLabel htmlFor="country" label="PAIS" />
              <StyledInput id="country" {...register("country")} />
              <FormHelperText sx={{ color: "#D32F2F" }}>
                {errors["country"] ? errors["country"].message : ""}
              </FormHelperText>
            </FormControl>
          </Stack>

          <Stack direction={"row"}  spacing={3}>
            <FormControl variant="standard" error={!!errors["contact"]}>
              <StyledInputLabel
                htmlFor="contact"
                label="PERSONA CONTACTO"
                error={!!errors["contact"]}
              />
              <StyledInput id="contact" {...register("contact")} />
              <FormHelperText sx={{ color: "#D32F2F" }}>
                {errors["contact"] ? errors["contact"].message : ""}
              </FormHelperText>
            </FormControl>

            <FormControl variant="standard" error={!!errors["telephone"]}>
              <StyledInputLabel htmlFor="telephone" label="TELÉFONO" />
              <StyledInput id="telephone" {...register("telephone")} />
              <FormHelperText sx={{ color: "#D32F2F" }}>
                {errors["telephone"] ? errors["telephone"].message : ""}
              </FormHelperText>
            </FormControl>

            <FormControl variant="standard" error={!!errors["cellphone"]}>
              <StyledInputLabel htmlFor="cellphone" label="CELULAR" />
              <StyledInput id="cellphone" {...register("cellphone")} />
              <FormHelperText sx={{ color: "#D32F2F" }}>
                {errors["cellphone"] ? errors["cellphone"].message : ""}
              </FormHelperText>
            </FormControl>
          </Stack>

          <Stack
            direction={"row"}
            paddingTop={2}
            justifyContent="space-between"
            alignItems={"center"}
          >
            <FormControl variant="standard" error={!!errors["email"]}>
              <StyledInputLabel htmlFor="email" label="CORREO ELECTRÓNICO" />
              <StyledInput
                id="email"
                sx={{ "& .MuiInputBase-input": { width: "450px" } }}
                {...register("email")}
              />
              <FormHelperText sx={{ color: "#D32F2F" }}>
                {errors["email"] ? errors["email"].message : ""}
              </FormHelperText>
            </FormControl>

            <FormControl
              sx={{
                marginTop: "8px",
              }}
            >
              <InputLabel
                shrink={true}
                id="payment-method"
                sx={{
                  color: "#42A0CE",
                  fontWeight: 700,
                  fontSize: "1.125rem",
                }}
                error={!!errors["payment_method"]}
              >
                FORMA DE PAGO
              </InputLabel>
              <Select
                id="payment_method"
                labelId="payment-method"
                label="PRIMARY ACTIVITY"
                displayEmpty
                {...register("payment_method")}
                input={
                  <OutlinedInput
                    sx={{
                      width: 500,
                      height: 48,
                      border: "1px solid #ced4da",
                      borderRadius: 5,
                      marginTop: 2.5,
                      bgcolor: "white",
                    }}
                  />
                }
              >
                {payment_method.map((data) => (
                  <MenuItem
                    key={data}
                    value={data}
                    sx={{
                      "&.Mui-selected": {
                        backgroundColor: "#DDF2F9",
                        "&:hover": {
                          backgroundColor: "#DDF2F9",
                        },
                      },
                      "&:hover": {
                        backgroundColor: "#DDF2F9",
                      },
                    }}
                  >
                    {data}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText sx={{ color: "#D32F2F" }}>
                {errors["payment_method"]
                  ? errors["payment_method"].message
                  : ""}
              </FormHelperText>
            </FormControl>
          </Stack>

          
          <Button
            type="submit"
            variant="contained"
            sx={{
              alignSelf: "end",
              width: 300,
              backgroundColor: "#27749C",
              borderRadius: 20,
              fontWeight: 500,
              px: 4,
              py: 1.5,
              mt: "30px !important",
            }}
          >
            Crear cliente
          </Button>
        </Stack>
      </Stack>
      <SuccessConfirmationModal
        title={titlePopup}
        modalTitle="El cliente se ha creado exitosamente"
        buttonTitle="Cerrar"
        admin={false}
        openModal={confirmationMessage}
        closeModal={handleCloseSuccessConfirmationModal}
      />
      <ErrorModal
        title="Error"
        modalTitle="El cliente no fue creada, intente más tarde."
        buttonTitle="Cerrar"
        admin={false}
        openModal={errorMessage}
        closeModal={handleCloseErrorModal}
      />
    </>
  );
}
