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
  TextField,
} from "@mui/material";
import StyledInputLabel from "./StyledInputLabel";
import StyledInput from "./StyledInput";
import StyledSelect from "./StyledSelect";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs, { Dayjs } from "dayjs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useState } from "react";
import useCalibrationCerificate from "../hooks/useCalibrationCerificate";

export default function CalibrationCertificateForm({
  onHandleGenerate,
  items,
}) {
  const calibration_place = [
    "Instalaciones del Laboratorio RCJ",
    "Instalaciones del cliente (In Situ)",
  ];

  const { createCalibrationCerificate } = useCalibrationCerificate();

  const schema = yup.object({
    item_data: yup.string().required("Este campo es requerido"),
    calibration_date: yup.string().required("Este campo es requerido"),
    generation_date: yup.string().required("Este campo es requerido"),
    lec_inst1: yup
      .number()
      .required("Este campo es requerido")
      .typeError("Sólo se aceptan valores numéricos"),
    lec_inst2: yup
      .number()
      .required("Este campo es requerido")
      .typeError("Sólo se aceptan valores numéricos"),
    lec_inst3: yup
      .number()
      .required("Este campo es requerido")
      .typeError("Sólo se aceptan valores numéricos"),
    val_pattern1: yup
      .number()
      .required("Este campo es requerido")
      .typeError("Sólo se aceptan valores numéricos"),
    val_pattern2: yup
      .number()
      .required("Este campo es requerido")
      .typeError("Sólo se aceptan valores numéricos"),
    val_pattern3: yup
      .number()
      .required("Este campo es requerido")
      .typeError("Sólo se aceptan valores numéricos"),
    error1: yup
      .number()
      .required("Este campo es requerido")
      .typeError("Sólo se aceptan valores numéricos"),
    error2: yup
      .number()
      .required("Este campo es requerido")
      .typeError("Sólo se aceptan valores numéricos"),
    error3: yup
      .number()
      .required("Este campo es requerido")
      .typeError("Sólo se aceptan valores numéricos"),
    uexp1: yup
      .number()
      .required("Este campo es requerido")
      .typeError("Sólo se aceptan valores numéricos"),
    uexp2: yup
      .number()
      .required("Este campo es requerido")
      .typeError("Sólo se aceptan valores numéricos"),
    uexp3: yup
      .number()
      .required("Este campo es requerido")
      .typeError("Sólo se aceptan valores numéricos"),
    ierri_uexp1: yup
      .number()
      .required("Este campo es requerido")
      .typeError("Sólo se aceptan valores numéricos"),
    ierri_uexp2: yup
      .number()
      .required("Este campo es requerido")
      .typeError("Sólo se aceptan valores numéricos"),
    ierri_uexp3: yup
      .number()
      .required("Este campo es requerido")
      .typeError("Sólo se aceptan valores numéricos"),
    emp1: yup
      .number()
      .required("Este campo es requerido")
      .typeError("Sólo se aceptan valores numéricos"),
    emp2: yup
      .number()
      .required("Este campo es requerido")
      .typeError("Sólo se aceptan valores numéricos"),
    emp3: yup
      .number()
      .required("Este campo es requerido")
      .typeError("Sólo se aceptan valores numéricos"),
    conformity1: yup.string().required("Este campo es requerido"),
    conformity2: yup.string().required("Este campo es requerido"),
    conformity3: yup.string().required("Este campo es requerido"),
    environmental_temperature: yup
      .number()
      .required("Este campo es requerido")
      .typeError("Sólo se aceptan valores numéricos"),
    temperature_uncertainty: yup
      .number()
      .required("Este campo es requerido")
      .typeError("Sólo se aceptan valores numéricos"),
    humidity: yup
      .number()
      .required("Este campo es requerido")
      .typeError("Sólo se aceptan valores numéricos"),
    humidity_uncertainty: yup
      .number()
      .required("Este campo es requerido")
      .typeError("Sólo se aceptan valores numéricos"),
    calibration_pattern_code: yup.string().required("Este campo es requerido"),
    number_certificate_pattern: yup
      .number()
      .required("Este campo es requerido")
      .typeError("En este campo se deben ingresar números")
      .typeError("Sólo se aceptan valores numéricos"),
    pattern_traceability: yup.string().required("Este campo es requerido"),
    comments: yup.string(),
    calibration_place: yup.string().required("Este campo es requerido"),
    calibration_address: yup.string().required("Este campo es requerido"),
    calibration_created_by: yup.string().required("Este campo es requerido"),
    calibration_approved_by: yup.string().required("Este campo es requerido"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [calibrationDate, setCalibrationDate] = useState(
    dayjs("2022-08-18T21:11:54")
  );

  const [generationDate, setGenerationDate] = useState(
    dayjs("2022-08-18T21:11:54")
  );

  const handleCalibrationDate = (newValue) => {
    setCalibrationDate(newValue);
  };

  const handleGenerationDate = (newValue) => {
    setGenerationDate(newValue);
  };

  const handleGenerateCalibrationCertificate = async (values) => {
    const item = JSON.parse(values.item_data);
    console.log("entre");

    const calibrationCertificateDTO = {
      reception_date: item.reception_date,
      calibration_date: values.calibration_date,
      generation_date: values.generation_date,
      lec_inst1: values.lec_inst1,
      lec_inst2: values.lec_inst2,
      lec_inst3: values.lec_inst3,
      val_pattern1: values.val_pattern1,
      val_pattern2: values.val_pattern2,
      val_pattern3: values.val_pattern3,
      error1: values.error1,
      error2: values.error2,
      error3: values.error3,
      uexp1: values.uexp1,
      uexp2: values.uexp2,
      uexp3: values.uexp3,
      ierri_uexp1: values.ierri_uexp1,
      ierri_uexp2: values.ierri_uexp2,
      ierri_uexp3: values.ierri_uexp3,
      emp1: values.emp1,
      emp2: values.emp2,
      emp3: values.emp3,
      conformity1: values.conformity1,
      conformity2: values.conformity2,
      conformity3: values.conformity3,
      environmental_temperature: values.environmental_temperature,
      temperature_uncertainty: values.temperature_uncertainty,
      humidity: values.humidity,
      humidity_uncertainty: values.humidity_uncertainty,
      calibration_pattern_code: values.calibration_pattern_code,
      number_certificate_pattern: values.number_certificate_pattern,
      pattern_traceability: values.pattern_traceability,
      calibration_place: values.calibration_place,
      calibration_created_by: values.calibration_created_by,
      calibration_approved_by: values.calibration_approved_by,
      comments: values.comments,
      item_id: item.id,
      client_name: item.client,
      specification_name: item.specification_name,
    };

    const apiResponse = await createCalibrationCerificate(
      calibrationCertificateDTO
    );
    console.log("api response", apiResponse);

    if (!apiResponse.error && apiResponse.data) {
      if (apiResponse.data.id) {
        reset();

        const offePDFGenerationDTO = {
          id: apiResponse.data.id,
          instrument_id: item.instrument_id,
          client_name: item.client,
          specification_name: item.specification_name,
          secure_image_url: item.secure_image_url,
          lec_inst1: values.lec_inst1,
          lec_inst2: values.lec_inst2,
          lec_inst3: values.lec_inst3,
          val_pattern1: values.val_pattern1,
          val_pattern2: values.val_pattern2,
          val_pattern3: values.val_pattern3,
          error1: values.error1,
          error2: values.error2,
          error3: values.error3,
          uexp1: values.uexp1,
          uexp2: values.uexp2,
          uexp3: values.uexp3,
          ierri_uexp1: values.ierri_uexp1,
          ierri_uexp2: values.ierri_uexp2,
          ierri_uexp3: values.ierri_uexp3,
          emp1: values.emp1,
          emp2: values.emp2,
          emp3: values.emp3,
          conformity1: values.conformity1,
          conformity2: values.conformity2,
          conformity3: values.conformity3,
          environmental_temperature: values.environmental_temperature,
          temperature_uncertainty: values.temperature_uncertainty,
          humidity: values.humidity,
          humidity_uncertainty: values.humidity_uncertainty,
          calibration_pattern_code: values.calibration_pattern_code,
          number_certificate_pattern: values.number_certificate_pattern,
          pattern_traceability: values.pattern_traceability,
          reception_date: item.reception_date,
          calibration_date: values.calibration_date,
          generation_date: values.generation_date,
          calibration_place: values.calibration_place,
        };
        console.log("pdf", offePDFGenerationDTO);
        onHandleGenerate(true, offePDFGenerationDTO);
      }
    } else {
      console.log("there was an error");
    }
  };

  return (
    <Stack
      justifyContent="center"
      pt={5}
      alignItems="center"
      pb={5}
      component="form"
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit(handleGenerateCalibrationCertificate)}
    >
      <Stack spacing={4} maxWidth={1290}>
        <Stack
          direction={"row"}
          paddingTop={2}
          spacing={5}
          justifyContent="center"
          alignItems={"flex-end"}
        >
          <FormControl>
            <InputLabel
              shrink={true}
              id="instrument"
              sx={{
                color: "#42A0CE",
                fontWeight: 700,
                fontSize: "1.125rem",
              }}
              error={!!errors["item_data"]}
            >
              ITEM CALIBRADO
            </InputLabel>
            <Select
              id="instrument"
              labelId="instrument"
              label="ITEM CALIBRADO"
              {...register("item_data")}
              input={
                <OutlinedInput
                  sx={{
                    width: 390,
                    height: 48,
                    border: "1px solid #ced4da",
                    borderRadius: 5,
                    marginTop: 2.5,
                    bgcolor: "white",
                  }}
                />
              }
            >
              {items.map((data) => (
                <MenuItem
                  key={data.id}
                  value={JSON.stringify({
                    id: data.id,
                    specification_name: data.specification_name,
                    client: data.client_name,
                    instrument_id: data.instrument_id,
                    secure_image_url: data.secure_image_url,
                    reception_date: data.item_reception_date,
                  })}
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
                  N° de Reporte: {data.id} --- Item: {data.specification_name}
                </MenuItem>
              ))}
            </Select>

            <FormHelperText sx={{ color: "#D32F2F" }}>
              {errors["item_data"] ? errors["item_data"].message : ""}
            </FormHelperText>
          </FormControl>

          <FormControl variant="standard">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                shrink={true}
                inputFormat="MM/DD/YYYY"
                value={calibrationDate}
                onChange={handleCalibrationDate}
                renderInput={(params) => (
                  <>
                    <StyledInputLabel
                      htmlFor="calibration_date"
                      label="FECHA DE LA CALIBRACIÓN"
                    />
                    <TextField
                      {...params}
                      id="calibration_date"
                      {...register("calibration_date")}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 20,
                          backgroundColor: "white",
                          border: "1px solid #ced4da",
                          color: "black",
                          width: "415px",
                          height: "48px",
                          fontSize: "1rem",
                          marginTop: 3.2,
                          "&:focus": {
                            borderColor: "#42A0CE",
                          },
                        },
                      }}
                    />
                  </>
                )}
              />
            </LocalizationProvider>
            <FormHelperText sx={{ color: "#D32F2F" }}>
              {errors["calibration_date"]
                ? errors["calibration_date"].message
                : ""}
            </FormHelperText>
          </FormControl>

          <FormControl variant="standard">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                shrink={true}
                inputFormat="MM/DD/YYYY"
                value={generationDate}
                onChange={handleGenerationDate}
                renderInput={(params) => (
                  <>
                    <StyledInputLabel
                      htmlFor="generation_date"
                      label="FECHA DE EMISIÓN DEL CERTIFICADO"
                    />
                    <TextField
                      {...params}
                      id="generation_date"
                      {...register("generation_date")}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 20,
                          backgroundColor: "white",
                          border: "1px solid #ced4da",
                          color: "black",
                          width: "415px",
                          height: "48px",
                          fontSize: "1rem",
                          marginTop: 3.2,
                          "&:focus": {
                            borderColor: "#42A0CE",
                          },
                        },
                      }}
                    />
                  </>
                )}
              />
            </LocalizationProvider>
            <FormHelperText sx={{ color: "#D32F2F" }}>
              {errors["generation_date"]
                ? errors["generation_date"].message
                : ""}
            </FormHelperText>
          </FormControl>
        </Stack>

        <Stack
          bgcolor={"#DDF2F9"}
          p={3}
          alignItems="center"
          justifyContent={"flex-end"}
          borderRadius={10}
          spacing={3}
          padding={3}
        >
          <Typography color="gray" fontWeight={700}>
            Resultados de la calibración efectuada
          </Typography>
          <Stack direction={"row"} spacing={3} alignItems="flex-end">
            <Stack>
              <Typography color="#42A0CE">Lectura Inst</Typography>
              <FormControl variant="standard">
                <StyledInput
                  id="lec_inst1"
                  sx={{ "& .MuiInputBase-input": { width: "120px" } }}
                  {...register("lec_inst1")}
                />
                <FormHelperText sx={{ color: "#D32F2F" }}>
                  {errors["lec_inst1"] ? errors["lec_inst1"].message : ""}
                </FormHelperText>
              </FormControl>

              <FormControl variant="standard">
                <StyledInput
                  id="lec_inst2"
                  sx={{ "& .MuiInputBase-input": { width: "120px" } }}
                  {...register("lec_inst2")}
                />
                <FormHelperText sx={{ color: "#D32F2F" }}>
                  {errors["lec_inst2"] ? errors["lec_inst2"].message : ""}
                </FormHelperText>
              </FormControl>

              <FormControl variant="standard">
                <StyledInput
                  id="direction"
                  sx={{ "& .MuiInputBase-input": { width: "120px" } }}
                  {...register("lec_inst3")}
                />

                <FormHelperText sx={{ color: "#D32F2F" }}>
                  {errors["lec_inst3"] ? errors["lec_inst3"].message : ""}
                </FormHelperText>
              </FormControl>
            </Stack>

            <Stack>
              <Typography color="#42A0CE">Valor del patrón</Typography>
              <FormControl variant="standard">
                <StyledInput
                  id="val_pattern1"
                  sx={{ "& .MuiInputBase-input": { width: "120px" } }}
                  {...register("val_pattern1")}
                />
                <FormHelperText sx={{ color: "#D32F2F" }}>
                  {errors["val_pattern1"] ? errors["val_pattern1"].message : ""}
                </FormHelperText>
              </FormControl>
              <FormControl variant="standard">
                <StyledInput
                  id="val_pattern2"
                  sx={{ "& .MuiInputBase-input": { width: "120px" } }}
                  {...register("val_pattern2")}
                />
                <FormHelperText sx={{ color: "#D32F2F" }}>
                  {errors["val_pattern2"] ? errors["val_pattern2"].message : ""}
                </FormHelperText>
              </FormControl>
              <FormControl variant="standard">
                <StyledInput
                  id="val_pattern3"
                  sx={{ "& .MuiInputBase-input": { width: "120px" } }}
                  {...register("val_pattern3")}
                />
                <FormHelperText sx={{ color: "#D32F2F" }}>
                  {errors["val_pattern3"] ? errors["val_pattern3"].message : ""}
                </FormHelperText>
              </FormControl>
            </Stack>

            <Stack>
              <Typography color="#42A0CE">Error</Typography>
              <FormControl variant="standard">
                <StyledInput
                  id="error1"
                  sx={{ "& .MuiInputBase-input": { width: "120px" } }}
                  {...register("error1")}
                />
                <FormHelperText sx={{ color: "#D32F2F" }}>
                  {errors["error1"] ? errors["error1"].message : ""}
                </FormHelperText>
              </FormControl>
              <FormControl variant="standard">
                <StyledInput
                  id="error2"
                  sx={{ "& .MuiInputBase-input": { width: "120px" } }}
                  {...register("error2")}
                />
                <FormHelperText sx={{ color: "#D32F2F" }}>
                  {errors["error2"] ? errors["error2"].message : ""}
                </FormHelperText>
              </FormControl>
              <FormControl variant="standard">
                <StyledInput
                  id="error3"
                  sx={{ "& .MuiInputBase-input": { width: "120px" } }}
                  {...register("error3")}
                />
                <FormHelperText sx={{ color: "#D32F2F" }}>
                  {errors["error3"] ? errors["error3"].message : ""}
                </FormHelperText>
              </FormControl>
            </Stack>

            <Stack>
              <Typography color="#42A0CE">Uexp</Typography>
              <FormControl variant="standard">
                <StyledInput
                  id="uexp1"
                  sx={{ "& .MuiInputBase-input": { width: "120px" } }}
                  {...register("uexp1")}
                />
                <FormHelperText sx={{ color: "#D32F2F" }}>
                  {errors["uexp1"] ? errors["uexp1"].message : ""}
                </FormHelperText>
              </FormControl>
              <FormControl variant="standard">
                <StyledInput
                  id="uexp2"
                  sx={{ "& .MuiInputBase-input": { width: "120px" } }}
                  {...register("uexp2")}
                />
                <FormHelperText sx={{ color: "#D32F2F" }}>
                  {errors["uexp2"] ? errors["uexp2"].message : ""}
                </FormHelperText>
              </FormControl>
              <FormControl variant="standard">
                <StyledInput
                  id="uexp3"
                  sx={{ "& .MuiInputBase-input": { width: "120px" } }}
                  {...register("uexp3")}
                />
                <FormHelperText sx={{ color: "#D32F2F" }}>
                  {errors["uexp3"] ? errors["uexp3"].message : ""}
                </FormHelperText>
              </FormControl>
            </Stack>

            <Stack>
              <Typography color="#42A0CE">IErrI + Uexp</Typography>
              <FormControl variant="standard">
                <StyledInput
                  id="ierri_uexp1"
                  sx={{ "& .MuiInputBase-input": { width: "120px" } }}
                  {...register("ierri_uexp1")}
                />
                <FormHelperText sx={{ color: "#D32F2F" }}>
                  {errors["ierri_uexp1"] ? errors["ierri_uexp1"].message : ""}
                </FormHelperText>
              </FormControl>
              <FormControl variant="standard">
                <StyledInput
                  id="ierri_uexp2"
                  sx={{ "& .MuiInputBase-input": { width: "120px" } }}
                  {...register("ierri_uexp2")}
                />
                <FormHelperText sx={{ color: "#D32F2F" }}>
                  {errors["ierri_uexp2"] ? errors["ierri_uexp2"].message : ""}
                </FormHelperText>
              </FormControl>
              <FormControl variant="standard">
                <StyledInput
                  id="ierri_uexp3"
                  sx={{ "& .MuiInputBase-input": { width: "120px" } }}
                  {...register("ierri_uexp3")}
                />
                <FormHelperText sx={{ color: "#D32F2F" }}>
                  {errors["ierri_uexp3"] ? errors["ierri_uexp3"].message : ""}
                </FormHelperText>
              </FormControl>
            </Stack>

            <Stack>
              <Typography color="#42A0CE">E.M.P</Typography>
              <FormControl variant="standard">
                <StyledInput
                  id="emp1"
                  sx={{ "& .MuiInputBase-input": { width: "120px" } }}
                  {...register("emp1")}
                />
                <FormHelperText sx={{ color: "#D32F2F" }}>
                  {errors["emp1"] ? errors["emp1"].message : ""}
                </FormHelperText>
              </FormControl>
              <FormControl variant="standard">
                <StyledInput
                  id="emp2"
                  sx={{ "& .MuiInputBase-input": { width: "120px" } }}
                  {...register("emp2")}
                />
                <FormHelperText sx={{ color: "#D32F2F" }}>
                  {errors["emp2"] ? errors["emp2"].message : ""}
                </FormHelperText>
              </FormControl>
              <FormControl variant="standard">
                <StyledInput
                  id="emp3"
                  sx={{ "& .MuiInputBase-input": { width: "120px" } }}
                  {...register("emp3")}
                />
                <FormHelperText sx={{ color: "#D32F2F" }}>
                  {errors["emp3"] ? errors["emp3"].message : ""}
                </FormHelperText>
              </FormControl>
            </Stack>
            <Stack>
              <Typography color="#42A0CE">Conformidad</Typography>
              <FormControl variant="standard">
                <StyledInput
                  id="conformity1"
                  sx={{ "& .MuiInputBase-input": { width: "120px" } }}
                  {...register("conformity1")}
                />
                <FormHelperText sx={{ color: "#D32F2F" }}>
                  {errors["conformity1"] ? errors["conformity1"].message : ""}
                </FormHelperText>
              </FormControl>
              <FormControl variant="standard">
                <StyledInput
                  id="conformity2"
                  sx={{ "& .MuiInputBase-input": { width: "120px" } }}
                  {...register("conformity2")}
                />
                <FormHelperText sx={{ color: "#D32F2F" }}>
                  {errors["conformity2"] ? errors["conformity2"].message : ""}
                </FormHelperText>
              </FormControl>
              <FormControl variant="standard">
                <StyledInput
                  id="conformity3"
                  sx={{ "& .MuiInputBase-input": { width: "120px" } }}
                  {...register("conformity3")}
                />
                <FormHelperText sx={{ color: "#D32F2F" }}>
                  {errors["conformity3"] ? errors["conformity3"].message : ""}
                </FormHelperText>
              </FormControl>
            </Stack>
          </Stack>
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
          <Typography color="gray" fontWeight={700}>
            Parámetros ambientales
          </Typography>

          <Stack direction={"row"} spacing={10} alignItems="flex-end">
            <Stack direction={"row"} spacing={2}>
              <FormControl variant="standard">
                <StyledInputLabel
                  htmlFor="environmental_temperature"
                  label="Temperatura (°C)"
                />
                <StyledInput
                  id="environmental_temperature"
                  sx={{ "& .MuiInputBase-input": { width: "200px" } }}
                  {...register("environmental_temperature")}
                />
                <FormHelperText sx={{ color: "#D32F2F" }}>
                  {errors["environmental_temperature"]
                    ? errors["environmental_temperature"].message
                    : ""}
                </FormHelperText>
              </FormControl>

              <FormControl variant="standard">
                <StyledInputLabel
                  htmlFor="temperature_uncertainty"
                  label="Incertidumbre de la temperatura (±)"
                />
                <StyledInput
                  id="temperature_uncertainty"
                  sx={{ "& .MuiInputBase-input": { width: "260px" } }}
                  {...register("temperature_uncertainty")}
                />
                <FormHelperText sx={{ color: "#D32F2F" }}>
                  {errors["temperature_uncertainty"]
                    ? errors["temperature_uncertainty"].message
                    : ""}
                </FormHelperText>
              </FormControl>
            </Stack>

            <Stack direction={"row"} spacing={2}>
              <FormControl variant="standard">
                <StyledInputLabel
                  htmlFor="humidity"
                  label="Humedad Relativa (% Hr)"
                />
                <StyledInput
                  id="humidity"
                  sx={{ "& .MuiInputBase-input": { width: "200px" } }}
                  {...register("humidity")}
                />
                <FormHelperText sx={{ color: "#D32F2F" }}>
                  {errors["humidity"] ? errors["humidity"].message : ""}
                </FormHelperText>
              </FormControl>

              <FormControl variant="standard">
                <StyledInputLabel
                  htmlFor="humidity_uncertainty"
                  label="Incertidumbre de la humedad (±)"
                />
                <StyledInput
                  id="humidity_uncertainty"
                  sx={{ "& .MuiInputBase-input": { width: "250px" } }}
                  {...register("humidity_uncertainty")}
                />
                <FormHelperText sx={{ color: "#D32F2F" }}>
                  {errors["humidity_uncertainty"]
                    ? errors["humidity_uncertainty"].message
                    : ""}
                </FormHelperText>
              </FormControl>
            </Stack>
          </Stack>
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
          <Typography color="gray" fontWeight={700}>
            Datos del Patrón de Calibración
          </Typography>
          <Stack direction={"row"} spacing={10} alignItems="flex-end">
            <FormControl variant="standard">
              <StyledInputLabel
                htmlFor="calibration_pattern_code"
                label="Código del Patrón"
              />
              <StyledInput
                id="calibration_pattern_code"
                sx={{ "& .MuiInputBase-input": { width: "300px" } }}
                {...register("calibration_pattern_code")}
              />
              <FormHelperText sx={{ color: "#D32F2F" }}>
                {errors["calibration_pattern_code"]
                  ? errors["calibration_pattern_code"].message
                  : ""}
              </FormHelperText>
            </FormControl>

            <FormControl variant="standard">
              <StyledInputLabel
                htmlFor="number_certificate_pattern"
                label="N° de Certificación"
              />
              <StyledInput
                id="number_certificate_pattern"
                sx={{ "& .MuiInputBase-input": { width: "300px" } }}
                {...register("number_certificate_pattern")}
              />
              <FormHelperText sx={{ color: "#D32F2F" }}>
                {errors["number_certificate_pattern"]
                  ? errors["number_certificate_pattern"].message
                  : ""}
              </FormHelperText>
            </FormControl>

            <FormControl variant="standard">
              <StyledInputLabel
                htmlFor="pattern_traceability"
                label="Trazabilidad"
              />
              <StyledInput
                id="pattern_traceability"
                sx={{ "& .MuiInputBase-input": { width: "300px" } }}
                {...register("pattern_traceability")}
              />
              <FormHelperText sx={{ color: "#D32F2F" }}>
                {errors["pattern_traceability"]
                  ? errors["pattern_traceability"].message
                  : ""}
              </FormHelperText>
            </FormControl>
          </Stack>
        </Stack>

        <Stack
          direction={"row"}
          paddingTop={2}
          spacing={3}
          justifyContent={"center"}
          alignItems="flex-end"
        >
          <FormControl variant="standard">
            <StyledInputLabel htmlFor="comments" label="COMENTARIOS" />
            <StyledInput
              id="comments"
              sx={{ "& .MuiInputBase-input": { width: "500px" } }}
              {...register("comments")}
            />
            <FormHelperText sx={{ color: "#D32F2F" }}>
              {errors["comments"] ? errors["comments"].message : ""}
            </FormHelperText>
          </FormControl>

          <FormControl>
            <InputLabel
              shrink={true}
              id="calibration_place"
              sx={{
                color: "#42A0CE",
                fontWeight: 700,
                fontSize: "1.125rem",
              }}
              error={!!errors["calibration_place"]}
            >
              LUGAR DE LA CALIBRACIÓN
            </InputLabel>
            <Select
              id="calibration_place"
              labelId="calibration_place"
              label="LUGAR DE LA CALIBRACIÓN"
              {...register("calibration_place")}
              input={
                <OutlinedInput
                  sx={{
                    width: 550,
                    height: 48,
                    border: "1px solid #ced4da",
                    borderRadius: 5,
                    marginTop: 2.5,
                    bgcolor: "white",
                  }}
                />
              }
            >
              {calibration_place.map((data) => (
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
              {errors["calibration_place"]
                ? errors["calibration_place"].message
                : ""}
            </FormHelperText>
          </FormControl>
        </Stack>
        <Stack>
          <Stack
            direction={"row"}
            paddingTop={2}
            spacing={3}
            justifyContent={"center"}
          >
            <FormControl variant="standard">
              <StyledInputLabel
                htmlFor="calibration_created_by"
                label="CALIBRACION REALIZADA POR"
              />
              <StyledInput
                id="calibration_created_by"
                sx={{ "& .MuiInputBase-input": { width: "515px" } }}
                {...register("calibration_created_by")}
              />
              <FormHelperText sx={{ color: "#D32F2F" }}>
                {errors["calibration_created_by"]
                  ? errors["calibration_created_by"].message
                  : ""}
              </FormHelperText>
            </FormControl>

            <FormControl variant="standard">
              <StyledInputLabel
                htmlFor="calibration_approved_by"
                label="CALIBRACION APROBADA POR"
              />
              <StyledInput
                id="calibration_approved_by"
                sx={{ "& .MuiInputBase-input": { width: "515px" } }}
                {...register("calibration_approved_by")}
              />
              <FormHelperText sx={{ color: "#D32F2F" }}>
                {errors["calibration_approved_by"]
                  ? errors["calibration_approved_by"].message
                  : ""}
              </FormHelperText>
            </FormControl>
          </Stack>
        </Stack>
        <Stack alignItems={"center"}>
          <FormControl variant="standard">
            <StyledInputLabel
              htmlFor="calibration_address"
              label="DIRECCIÓN DONDE DE EFECTUO LA CALIBRACIÓN"
            />
            <StyledInput
              id="calibration_address"
              sx={{ "& .MuiInputBase-input": { width: "1080px" } }}
              {...register("calibration_address")}
            />
            <FormHelperText sx={{ color: "#D32F2F" }}>
              {errors["calibration_address"]
                ? errors["calibration_address"].message
                : ""}
            </FormHelperText>
          </FormControl>
        </Stack>
      </Stack>
      <Button
        type="submit"
        variant="contained"
        sx={{
          alignSelf: "end",
          backgroundColor: "#27749C",
          borderRadius: 20,
          fontWeight: 500,
          mr: 37,
          mt: 5,
          px: 4,
          py: 1.5,
          mb: "30px !important",
        }}
      >
        Generar Certificado de Calibración
      </Button>
    </Stack>
  );
}
