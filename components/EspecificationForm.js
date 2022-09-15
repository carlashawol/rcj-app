import {
  Box,
  Stack,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
} from "@mui/material";
import StyledInputLabel from "./StyledInputLabel";
import StyledInput from "./StyledInput";
import useSpecification from "./../hooks/useSpecifications";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SuccessConfirmationModal from "./SuccessConfirmationModal";
import ErrorModal from "./ErrorModal";
import React, { useState } from "react";

export default function EspecificationForm() {
  const calibratio_type = [
    "Digital",
    "Analógico",
    "Material de Referencia",
    "Patrón Analógico",
    "Patrón Analógico",
    "Equipo de calibración",
  ];
  const unity = ["g", "G", "Hz", "L", "m", "N"];
  const calibration_method = [
    "Comparación directa",
  ];

  const { createSpecification } = useSpecification();

  const [confirmationMessage, setConfirmationMessage] = useState(false);
  const [titlePopup, setTitlePopup] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const schema = yup.object({
    name: yup.string().required("Este campo es requerido"),
    brand: yup.string().required("Este campo es requerido"),
    model: yup.string().required("Este campo es requerido"),
    instrument_type: yup.string().required("Este campo es requerido"),
    accuracy_class: yup.string().required("Este campo es requerido"),
    start_range: yup
      .number()
      .required("Campo requerido")
      .typeError("Campo numérico"),
    end_range: yup
      .number()
      .required("Campo requerido")
      .typeError("Campo numérico"),
    unity: yup.string().required("Campo requerido"),
    resolution: yup
      .number()
      .required("Campo requerido")
      .typeError("Campo numérico"),
    division_value: yup
      .number()
      .required("Campo requerido")
      .typeError("Campo numérico"),
    emp: yup.number().required("Campo requerido").typeError("Campo numérico"),
    emp_unity: yup.string().required("Campo requerido"),
    calibration_method: yup.string().required("Este campo es requerido"),
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

  const handleCreateSpecification = async (values) => {
    console.log(values);

    const apiResponse = await createSpecification(values);

    if (!apiResponse.error && apiResponse.data) {
      setTitlePopup(apiResponse.data.name);
      setConfirmationMessage(true);
      console.log(apiResponse);
    } else {
      setErrorMessage(true);
    }
  };

  return (
    <>
      <Stack
        justifyContent="center"
        pt={5}
        alignItems="center"
        pb={5}
        component="form"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(handleCreateSpecification)}
      >
        <Stack spacing={4} maxWidth={1090}>
          <Stack direction={"row"} paddingTop={2} spacing={5}>
            <FormControl variant="standard" error={!!errors["name"]}>
              <StyledInputLabel htmlFor="name" label="NOMBRE" />
              <StyledInput id="name" {...register("name")} />
              <FormHelperText sx={{ color: "#D32F2F" }}>
                {errors["name"] ? errors["name"].message : ""}
              </FormHelperText>
            </FormControl>

            <FormControl variant="standard" error={!!errors["brand"]}>
              <StyledInputLabel htmlFor="brand" label="MARCA" />
              <StyledInput id="brand" {...register("brand")} />
              <FormHelperText sx={{ color: "#D32F2F" }}>
                {errors["brand"] ? errors["brand"].message : ""}
              </FormHelperText>
            </FormControl>

            <FormControl variant="standard" error={!!errors["model"]}>
              <StyledInputLabel htmlFor="model" label="MODELO" />
              <StyledInput id="model" {...register("model")} />
              <FormHelperText sx={{ color: "#D32F2F" }}>
                {errors["model"] ? errors["model"].message : ""}
              </FormHelperText>
            </FormControl>
          </Stack>

          <Stack
            direction={"row"}
            paddingTop={2}
            justifyContent="space-between"
          >
            <FormControl
              sx={{
                marginTop: "8px",
              }}
            >
              <InputLabel
                shrink={true}
                id="instrument_type"
                sx={{
                  color: "#42A0CE",
                  fontWeight: 700,
                  fontSize: "1.125rem",
                  marginLeft: "-10px",
                }}
                error={!!errors["instrument_type"]}
              >
                TIPO DE INSTRUMENTO
              </InputLabel>
              <Select
                id="instrument_type"
                labelId="instrument_type"
                label="TIPO DE INSTRUMENTO"
                displayEmpty
                {...register("instrument_type")}
                input={
                  <OutlinedInput
                    sx={{
                      width: 450,
                      height: 48,
                      border: "1px solid #ced4da",
                      borderRadius: 5,
                      marginTop: 2.5,
                      bgcolor: "white",
                    }}
                  />
                }
              >
                {calibratio_type.map((data) => (
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
                {errors["instrument_type"]
                  ? errors["instrument_type"].message
                  : ""}
              </FormHelperText>
            </FormControl>

            <FormControl variant="standard" error={!!errors["accuracy_class"]}>
              <StyledInputLabel
                htmlFor="accuracy_class"
                label="CLASE DE EXATITUD"
              />
              <StyledInput
                id="accuracy_class"
                sx={{ "& .MuiInputBase-input": { width: "500px" } }}
                {...register("accuracy_class")}
              />
              <FormHelperText sx={{ color: "#D32F2F" }}>
                {errors["accuracy_class"]
                  ? errors["accuracy_class"].message
                  : ""}
              </FormHelperText>
            </FormControl>
          </Stack>

          <Stack
            bgcolor={"#DDF2F9"}
            p={3}
            alignItems="center"
            justifyContent={"center"}
            borderRadius={10}
            spacing={3}
            padding={3}
          >
            <Stack
              direction={"row"}
              spacing={3}
              justifyContent={"center"}
              alignItems="end"
            >
              <FormControl variant="standard" error={!!errors["start_range"]}>
                <StyledInputLabel htmlFor="direction" label="RANGO INICIO" />
                <StyledInput
                  id="direction"
                  sx={{ "& .MuiInputBase-input": { width: "120px" } }}
                  {...register("start_range")}
                />
                <FormHelperText sx={{ color: "#D32F2F" }}>
                  {errors["start_range"] ? errors["start_range"].message : ""}
                </FormHelperText>
              </FormControl>
              <FormControl variant="standard" error={!!errors["end_range"]}>
                <StyledInputLabel htmlFor="direction" label="RANGO FIN" />
                <StyledInput
                  id="direction"
                  sx={{ "& .MuiInputBase-input": { width: "120px" } }}
                  {...register("end_range")}
                />
                <FormHelperText sx={{ color: "#D32F2F" }}>
                  {errors["end_range"] ? errors["end_range"].message : ""}
                </FormHelperText>
              </FormControl>
              <FormControl>
                <InputLabel
                  shrink={true}
                  id="unity"
                  sx={{
                    color: "#42A0CE",
                    fontWeight: 700,
                    fontSize: "1.125rem",
                    marginLeft: "-10px",
                  }}
                  error={!!errors["unity"]}
                >
                  UNIDAD
                </InputLabel>
                <Select
                  id="unity"
                  labelId="unity"
                  label="UNIDAD"
                  displayEmpty
                  {...register("unity")}
                  input={
                    <OutlinedInput
                      sx={{
                        width: 125,
                        height: 48,
                        border: "1px solid #ced4da",
                        borderRadius: 5,
                        marginTop: 2.5,
                        padding: 0,
                        bgcolor: "white",
                      }}
                    />
                  }
                >
                  {unity.map((data) => (
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
                <FormHelperText sx={{ color: "#D32F2F", mx: 0 }}>
                  {errors["unity"] ? errors["unity"].message : ""}
                </FormHelperText>
              </FormControl>

              <FormControl variant="standard" error={!!errors["resolution"]}>
                <StyledInputLabel htmlFor="direction" label="RESOLUCIÓN" />
                <StyledInput
                  id="direction"
                  sx={{ "& .MuiInputBase-input": { width: "120px" } }}
                  {...register("resolution")}
                />
                <FormHelperText sx={{ color: "#D32F2F" }}>
                  {errors["resolution"] ? errors["resolution"].message : ""}
                </FormHelperText>
              </FormControl>
              <FormControl
                variant="standard"
                error={!!errors["division_value"]}
              >
                <StyledInputLabel
                  htmlFor="division_value"
                  label="VAL DIVISIÓN"
                />
                <StyledInput
                  id="division_value"
                  sx={{ "& .MuiInputBase-input": { width: "120px" } }}
                  {...register("division_value")}
                />
                <FormHelperText sx={{ color: "#D32F2F" }}>
                  {errors["division_value"]
                    ? errors["division_value"].message
                    : ""}
                </FormHelperText>
              </FormControl>
              <FormControl variant="standard" error={!!errors["emp"]}>
                <StyledInputLabel htmlFor="emp" label="EMP" />
                <StyledInput
                  id="emp"
                  sx={{ "& .MuiInputBase-input": { width: "120px" } }}
                  {...register("emp")}
                />
                <FormHelperText sx={{ color: "#D32F2F" }}>
                  {errors["emp"] ? errors["emp"].message : ""}
                </FormHelperText>
              </FormControl>

              <FormControl
                sx={{
                  marginTop: "8px",
                }}
              >
                <InputLabel
                  shrink={true}
                  id="emp_unity"
                  sx={{
                    color: "#42A0CE",
                    fontWeight: 700,
                    fontSize: "1.125rem",
                    marginLeft: "-10px",
                  }}
                  error={!!errors["emp_unity"]}
                >
                  UNIDAD EMP
                </InputLabel>
                <Select
                  id="emp_unity"
                  labelId="emp_unity"
                  label="UNIDAD EMP"
                  displayEmpty
                  {...register("emp_unity")}
                  input={
                    <OutlinedInput
                      sx={{
                        width: 125,
                        height: 48,
                        border: "1px solid #ced4da",
                        borderRadius: 5,
                        marginTop: 2.5,
                        bgcolor: "white",
                      }}
                    />
                  }
                >
                  {unity.map((data) => (
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
                <FormHelperText sx={{ color: "#D32F2F", mx: 0 }}>
                  {errors["emp_unity"] ? errors["emp_unity"].message : ""}
                </FormHelperText>
              </FormControl>
            </Stack>
          </Stack>

          <Stack
            direction={"row"}
            paddingTop={2}
            alignItems="end"
            justifyContent="space-between"
          >

            <FormControl
              sx={{
                marginTop: "8px",
              }}
            >
              <InputLabel
                shrink={true}
                id="calibration_method"
                sx={{
                  color: "#42A0CE",
                  fontWeight: 700,
                  fontSize: "1.125rem",
                  marginLeft: "-10px",
                }}
                error={!!errors["calibration_method"]}
              >
                METODO DE CALIBRACIÓN
              </InputLabel>
              <Select
                id="calibration_method"
                labelId="calibration_method"
                label="METODO DE CALIBRACIÓN"
                displayEmpty
                {...register("calibration_method")}
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
                {calibration_method.map((data) => (
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
                {errors["calibration_method"]
                  ? errors["calibration_method"].message
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
              px: 4,
              py: 1.5,
              mb: "30px !important",
            }}
          >
            Crear Especificación
          </Button>
        </Stack>
      </Stack>
      <SuccessConfirmationModal
        title={titlePopup}
        modalTitle="La especificación se creó exitosamente"
        buttonTitle="Cerrar"
        admin={false}
        openModal={confirmationMessage}
        closeModal={handleCloseSuccessConfirmationModal}
      />
      <ErrorModal
        title="Error"
        modalTitle="La especificación no fue creada, intente más tarde."
        buttonTitle="Cerrar"
        admin={false}
        openModal={errorMessage}
        closeModal={handleCloseErrorModal}
      />
    </>
  );
}
