import {
  Typography,
  Box,
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
import useInstruments from "./../hooks/useInstruments";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SuccessConfirmationModal from "./SuccessConfirmationModal";
import ErrorModal from "./ErrorModal";
import React, { useState } from "react";

export default function AddInstrumentForm({ clients, specifications }) {
  const operative_status = ["Operativo", "Fuera de servicio"];

  const metrological_status = ["Conforme", "No Conforme"];

  const sensor_type = [
    "Proximidad",
    "Fotoeléctrico",
    "Acústico",
    "Acidez",
    "Luz",
  ];

  const { createInstrument } = useInstruments();

  const [confirmationMessage, setConfirmationMessage] = useState(false);
  const [titlePopup, setTitlePopup] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const schema = yup.object({
    client_name: yup.string().required("Este campo es requerido"),
    operative_status: yup.string().required("Este campo es requerido"),
    metrologic_status: yup.string().required("Este campo es requerido"),
    specification_name: yup.string().required("Este campo es requerido"),
    serial: yup.string().required("Este campo es requerido"),
    inventary: yup.string().required("Este campo es requerido"),
    calibration_frecuency: yup
      .number()
      .required("Este campo es requerido")
      .moreThan(-1, "Se debe ingresar un número positivo")
      .integer()
      .typeError("En este campo se debe ingresar un número"),
    internal_code: yup.string().required("Este campo es requerido"),
    sensor_type: yup.string().required("Este campo es requerido"),
    maintenance_frecuency: yup
      .number()
      .required("Este campo es requerido")
      .moreThan(-1, "Se debe ingresar un número positivo")
      .integer()
      .typeError("En este campo se debe ingresar un número"),
    sensor_serial: yup.string().required("Este campo es requerido"),
    sensor_ubication: yup.string().required("Este campo es requerido"),
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

  const handleCreateInstrument = async (values) => {
    console.log(values);
    const apiResponse = await createInstrument(values);
    if (!apiResponse.error && apiResponse.data) {
      setTitlePopup(apiResponse.data.specification_name);
      setConfirmationMessage(true);
    } else {
      setErrorMessage(true);
    }
  };

  return (
    <>
      <Stack
        justifyContent="center"
        alignItems="center"
        padding={4}
        component="form"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(handleCreateInstrument)}
      >
        <Stack>
          <Stack
            justifyContent="center"
            alignItems="flex-end"
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
                <StyledInputLabel
                  htmlFor="image"
                  label="IMAGEN DEL INSTRUMENTO (OPCIONAL)"
                />
                <StyledInput
                  id="image"
                  inputProps={{ accept: "image/*" }}
                  type="file"
                  sx={{ "& .MuiInputBase-input": { width: "500px" } }}
                />
              </FormControl>

              <FormControl>
                <InputLabel
                  shrink={true}
                  id="client_name"
                  sx={{
                    color: "#42A0CE",
                    fontWeight: 700,
                    fontSize: "1.125rem",
                  }}
                  error={!!errors["client_name"]}
                >
                  NOMBRE DEL CLIENTE
                </InputLabel>
                <Select
                  id="client_name"
                  labelId="client_name"
                  label="NOMBRE DEL CLIENTE"
                  displayEmpty
                  {...register("client_name")}
                  input={
                    <OutlinedInput
                      sx={{
                        width: 514,
                        height: 48,
                        border: "1px solid #ced4da",
                        borderRadius: 5,
                        marginTop: 2.5,
                        bgcolor: "white",
                      }}
                    />
                  }
                >
                  {clients.map((data) => (
                    <MenuItem
                      key={data}
                      value={data.name}
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
                      {data.name}
                    </MenuItem>
                  ))}
                </Select>

                <FormHelperText sx={{ color: "#D32F2F" }}>
                  {errors["client_name"] ? errors["client_name"].message : ""}
                </FormHelperText>
              </FormControl>
            </Stack>

            <Stack spacing={3}>
              <Stack
                direction={"row"}
                spacing={3}
                justifyContent="center"
                alignItems="flex-end"
              >
                <FormControl>
                  <InputLabel
                    shrink={true}
                    id="operative_status"
                    sx={{
                      color: "#42A0CE",
                      fontWeight: 700,
                      fontSize: "1.125rem",
                    }}
                    error={!!errors["operative_status"]}
                  >
                    ESTATUS OPERATIVO
                  </InputLabel>
                  <Select
                    id="operative_status"
                    labelId="operative_status"
                    label="ESTATUS OPERATIVO"
                    displayEmpty
                    {...register("operative_status")}
                    input={
                      <OutlinedInput
                        sx={{
                          width: 514,
                          height: 48,
                          border: "1px solid #ced4da",
                          borderRadius: 5,
                          marginTop: 2.5,
                          bgcolor: "white",
                        }}
                      />
                    }
                  >
                    {operative_status.map((data) => (
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
                    {errors["operative_status"]
                      ? errors["operative_status"].message
                      : ""}
                  </FormHelperText>
                </FormControl>

                <FormControl>
                  <InputLabel
                    shrink={true}
                    id="metrologic_status"
                    sx={{
                      color: "#42A0CE",
                      fontWeight: 700,
                      fontSize: "1.125rem",
                    }}
                    error={!!errors["metrologic_status"]}
                  >
                    ESTATUS METROLÓGICO
                  </InputLabel>
                  <Select
                    id="metrologic_status"
                    labelId="metrologic_status"
                    label="ESTATUS METROLÓGICO"
                    displayEmpty
                    {...register("metrologic_status")}
                    input={
                      <OutlinedInput
                        sx={{
                          width: 514,
                          height: 48,
                          border: "1px solid #ced4da",
                          borderRadius: 5,
                          marginTop: 2.5,
                          bgcolor: "white",
                        }}
                      />
                    }
                  >
                    {metrological_status.map((data) => (
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
                    {errors["metrologic_status"]
                      ? errors["metrologic_status"].message
                      : ""}
                  </FormHelperText>
                </FormControl>
              </Stack>
              <Stack direction={"row"} paddingTop={2} spacing={3}>
                <FormControl
                  sx={{
                    marginTop: "8px",
                  }}
                >
                  <InputLabel
                    shrink={true}
                    id="specification_name"
                    sx={{
                      color: "#42A0CE",
                      fontWeight: 700,
                      fontSize: "1.125rem",
                    }}
                    error={!!errors["specification_name"]}
                  >
                    ESPECIFICACIÓN DEL INSTRUMENTO
                  </InputLabel>
                  <Select
                    id="specification_name"
                    labelId="specification_name"
                    label="ESPECIFICACIÓN DEL INSTRUMENTO"
                    displayEmpty
                    {...register("specification_name")}
                    input={
                      <OutlinedInput
                        sx={{
                          width: 514,
                          height: 48,
                          border: "1px solid #ced4da",
                          borderRadius: 5,
                          marginTop: 2.5,
                          bgcolor: "white",
                        }}
                      />
                    }
                  >
                    {specifications.map((data) => (
                      <MenuItem
                        key={data}
                        value={data.name}
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
                        {data.name}
                      </MenuItem>
                    ))}
                  </Select>

                  <FormHelperText sx={{ color: "#D32F2F" }}>
                    {errors["specification_name"]
                      ? errors["specification_name"].message
                      : ""}
                  </FormHelperText>
                </FormControl>

                <Link href="/crear-especificacion" passHref>
                  <Button
                    variant="contained"
                    sx={{
                      height: 55,
                      backgroundColor: "#27749C",
                      borderRadius: 20,
                      fontWeight: 500,
                      px: 17,
                      py: 1.5,
                      mt: "22px !important",
                    }}
                  >
                    CREAR UNA ESPECIFICACIÓN
                  </Button>
                </Link>
              </Stack>
            </Stack>
          </Stack>
          <Stack direction={"row"} paddingTop={4} spacing={5}>
            <FormControl variant="standard" error={!!errors["serial"]}>
              <StyledInputLabel htmlFor="serial" label="SERIAL" />
              <StyledInput id="serial" {...register("serial")} />
              <FormHelperText sx={{ color: "#D32F2F" }}>
                {errors["serial"] ? errors["serial"].message : ""}
              </FormHelperText>
            </FormControl>

            <FormControl variant="standard" error={!!errors["inventary"]}>
              <StyledInputLabel htmlFor="inventary" label="PLACA INVETARIO" />
              <StyledInput id="inventary" {...register("inventary")} />
              <FormHelperText sx={{ color: "#D32F2F" }}>
                {errors["inventary"] ? errors["inventary"].message : ""}
              </FormHelperText>
            </FormControl>

            <FormControl
              variant="standard"
              error={!!errors["calibration_frecuency"]}
            >
              <StyledInputLabel
                htmlFor="calibration_frecuency"
                label="FRECUENCIA CALIBRACIÓN"
              />
              <StyledInput
                id="calibration_frecuency"
                sx={{ "& .MuiInputBase-input": { width: "285px" } }}
                {...register("calibration_frecuency")}
                endAdornment={
                  <InputAdornment>
                    <Typography
                      fontSize={18}
                      fontWeight={500}
                      ml={-6}
                      mt={1}
                      zIndex={3}
                    >
                      Días
                    </Typography>
                  </InputAdornment>
                }
              />

              <FormHelperText sx={{ color: "#D32F2F" }}>
                {errors["calibration_frecuency"]
                  ? errors["calibration_frecuency"].message
                  : ""}
              </FormHelperText>
            </FormControl>
          </Stack>
          <Stack
            direction={"row"}
            paddingTop={3}
            spacing={5}
            justifyContent="center"
            alignItems="flex-end"
          >
            <FormControl variant="standard" error={!!errors["internal_code"]}>
              <StyledInputLabel
                htmlFor="internal_code"
                label="CÓDIGO INTERNO"
              />
              <StyledInput id="internal_code" {...register("internal_code")} />
              <FormHelperText sx={{ color: "#D32F2F" }}>
                {errors["internal_code"] ? errors["internal_code"].message : ""}
              </FormHelperText>
            </FormControl>

            <FormControl>
              <InputLabel
                shrink={true}
                id="sensor_type"
                sx={{
                  color: "#42A0CE",
                  fontWeight: 700,
                  fontSize: "1.125rem",
                }}
                error={!!errors["sensor_type"]}
              >
                TIPO SENSOR
              </InputLabel>
              <Select
                id="sensor_type"
                labelId="sensor_type"
                label="TIPO SENSOR"
                displayEmpty
                {...register("sensor_type")}
                input={
                  <OutlinedInput
                    sx={{
                      width: 340,
                      height: 48,
                      border: "1px solid #ced4da",
                      borderRadius: 5,
                      marginTop: 2.5,
                      bgcolor: "white",
                    }}
                  />
                }
              >
                {sensor_type.map((data) => (
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
                {errors["sensor_type"] ? errors["sensor_type"].message : ""}
              </FormHelperText>
            </FormControl>

            <FormControl
              variant="standard"
              error={!!errors["maintenance_frecuency"]}
            >
              <StyledInputLabel
                htmlFor="maintenance_frecuency"
                label="FRECUENCIA MANTENIMIENTO"
              />
              <StyledInput
                id="maintenance_frecuency"
                sx={{ "& .MuiInputBase-input": { width: "285px" } }}
                {...register("maintenance_frecuency")}
                endAdornment={
                  <InputAdornment>
                    <Typography
                      fontSize={18}
                      fontWeight={500}
                      ml={-6}
                      mt={1}
                      zIndex={3}
                    >
                      Días
                    </Typography>
                  </InputAdornment>
                }
              />
              <FormHelperText sx={{ color: "#D32F2F" }}>
                {errors["maintenance_frecuency"]
                  ? errors["maintenance_frecuency"].message
                  : ""}
              </FormHelperText>
            </FormControl>
          </Stack>
          <Stack direction={"row"} paddingTop={4} spacing={3}>
            <FormControl variant="standard" error={!!errors["sensor_serial"]}>
              <StyledInputLabel
                htmlFor="sensor_serial"
                label="SERIAL DEL SENSOR"
              />
              <StyledInput
                id="sensor_serial"
                sx={{ "& .MuiInputBase-input": { width: "500px" } }}
                {...register("sensor_serial")}
              />
              <FormHelperText sx={{ color: "#D32F2F" }}>
                {errors["sensor_serial"] ? errors["sensor_serial"].message : ""}
              </FormHelperText>
            </FormControl>

            <FormControl
              variant="standard"
              error={!!errors["sensor_ubication"]}
            >
              <StyledInputLabel
                htmlFor="sensor_ubication"
                label="UBICACION DEL SENSOR"
              />
              <StyledInput
                id="sensor_ubication"
                sx={{ "& .MuiInputBase-input": { width: "500px" } }}
                {...register("sensor_ubication")}
              />
              <FormHelperText sx={{ color: "#D32F2F" }}>
                {errors["sensor_ubication"]
                  ? errors["sensor_ubication"].message
                  : ""}
              </FormHelperText>
            </FormControl>
          </Stack>
          <Button
            type="submit"
            variant="contained"
            sx={{
              alignSelf: "end",
              backgroundColor: "#27749C",
              borderRadius: 20,
              fontWeight: 500,
              marginTop: 5,
              px: 4,
              py: 1.5,
              mb: "30px !important",
            }}
          >
            Crear Instrumento
          </Button>
        </Stack>
      </Stack>
      <SuccessConfirmationModal
        title={titlePopup}
        modalTitle="El instrumento se creó exitosamente"
        buttonTitle="Cerrar"
        admin={false}
        openModal={confirmationMessage}
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
