import Head from "next/head";
import Layout, { siteTitle } from "../components/Layout";
import utilStyles from "../styles/utils.module.css";
import { Typography, Box, Stack } from "@mui/material";
import DocumentScannerRoundedIcon from "@mui/icons-material/DocumentScannerRounded";
import CalibrationCertificateForm from "../components/CalibrationCertificateForm";
import dynamic from "next/dynamic";
import useItemReceptionReport from "../hooks/useItemReceptionReport";
import React, { useEffect, useState } from "react";
import useClients from "./../hooks/useClients";
import useInstruments from "../hooks/useInstruments";
import useSpecification from "../hooks/useSpecifications";

const GeneratePDF = dynamic(() => import("../components/GeneratePDF"), {
  ssr: false,
});

export default function createCalibrationCertificate() {
  const { getItemReports } = useItemReceptionReport();
  const [generate, setGenerate] = React.useState(false);
  const [calibratioCertificateData, seCalibrationCertificateData] =
    React.useState({});
  const { getClient } = useClients();
  const { getSpecification } = useSpecification();
  const { getInstrument } = useInstruments();
  const [instrument, setInstrument] = React.useState({});
  const [clientData, setClientData] = React.useState({});
  const [specificationData, setSpecificationData] = React.useState({});
  const [items, setItems] = React.useState([]);
  const ref = React.useRef();

  const onHandleGenerate = async (value, calibrationCertificateData) => {
    console.log(
      "this is the calibration certificate Data",
      calibrationCertificateData
    );
    seCalibrationCertificateData(calibrationCertificateData);
    const apiResponseClient = await getClient(
      calibrationCertificateData.client_name
    );

    const apiResponseSpecification = await getSpecification(
      calibrationCertificateData.specification_name
    );
    const apiResponseInstrument = await getInstrument(
      calibrationCertificateData.instrument_id
    );

    if (
      !apiResponseClient.error &&
      apiResponseClient.data &&
      !apiResponseSpecification.error &&
      apiResponseSpecification.data &&
      !apiResponseInstrument.error &&
      apiResponseInstrument.data
    ) {
      setClientData(apiResponseClient.data);
      setSpecificationData(apiResponseSpecification.data);
      setInstrument(apiResponseInstrument.data);
    }
    console.log(clientData, specificationData, instrument);

    if (clientData && specificationData && instrument) {
      setGenerate(value);
    }
  };

  useEffect(() => {
    const getItemsResponse = async () => {
      const apiResponse = await getItemReports();
      if (!apiResponse.error && apiResponse.data) {
        setItems(apiResponse.data);
      }
    };
    getItemsResponse();
  }, [getItemReports, setItems]);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Box
        className={utilStyles.formsHeading}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Stack justifyContent="center" alignItems="center">
          <DocumentScannerRoundedIcon
            sx={{ color: "white", fontSize: "100px" }}
          />
          <Typography variant="h5" color="white">
            Generar Certificado de calibración
          </Typography>
        </Stack>
      </Box>

      <CalibrationCertificateForm
        onHandleGenerate={onHandleGenerate}
        items={items}
      />
      <div className="main" style={{ visibility: "hidden" }}>
        <div className="content" ref={ref}>
          <div id="pdf-data">
            <img src="/images/header.png" width="209" height="25" />
            <h1 className="calibration-title ">
              CERTIFICADO DE CALIBRACIÓN N° LCC--{calibratioCertificateData.id}
            </h1>

            <div
              className="client-container reduce-font"
              id="calibration_client"
            >
              <div className="sub-container">
                <p className="data_title">1.-Datos del Cliente:</p>

                <div className="row">
                  <div className="info_data">
                    <b>Cliente:</b>
                    <div className="especific_data">
                      <p>{clientData.name}</p>
                    </div>
                  </div>

                  <div className="info_data">
                    <b>Nit:</b>
                    <div className="especific_data">
                      <p>{clientData.nit}</p>
                    </div>
                  </div>

                  <div className="info_data">
                    <b>Rif:</b>
                    <div className="especific_data">
                      <p>{clientData.rif}</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="info_data">
                      <b>Teléfono:</b>
                      <div className="especific_data">
                        <p>{clientData.telephone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="info_data">
                    <b>Ciudad:</b>
                    <div className="especific_data">
                      <p>{clientData.city}</p>
                    </div>
                  </div>

                  <div className="info_data">
                    <b>País:</b>
                    <div className="especific_data">
                      <p>{clientData.country}</p>
                    </div>
                  </div>

                  <div className="info_data">
                    <b>Dirección:</b>
                    <div className="especific_data">
                      <p>{clientData.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={
                calibratioCertificateData.secure_image_url
                  ? "instrument_container reduce-font"
                  : "instrument_no_image_container reduce-font"
              }
            >
              <p className="data_title">2.-Datos del ítem recibido:</p>
              <div className="row ">
                <div
                  className={
                    calibratioCertificateData.secure_image_url
                      ? "instrument_data_container"
                      : "instrument_data_container_no_image"
                  }
                >
                  <div className="row">
                    <div className="info_data">
                      <b>Nombre:</b>
                      <div className="especific_data">
                        <p>{specificationData.name}</p>
                      </div>
                    </div>

                    <div className="info_data">
                      <b>Marca: </b>
                      <div className="especific_data">
                        <p>{specificationData.brand}</p>
                      </div>
                    </div>

                    <div className="info_data">
                      <b>Modelo: </b>
                      <div className="especific_data">
                        <p>{specificationData.model}</p>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="info_data">
                      <b>Serial:</b>
                      <div className="especific_data">
                        <p>{instrument.serial}</p>
                      </div>
                    </div>

                    <div className="info_data">
                      <b>Tipo Sensor: </b>
                      <div className="especific_data">
                        <p>{instrument.sensor_type}</p>
                      </div>
                    </div>

                    <div className="info_data">
                      <b>Serial Sensor: </b>
                      <div className="especific_data">
                        <p>{instrument.sensor_serial}</p>
                      </div>
                    </div>
                  </div>
                </div>
                {calibratioCertificateData.secure_image_url && (
                  <div className="image_container reduce_top">
                    <b className="data_title">Foto del instrumento</b>
                    <img
                      src={calibratioCertificateData.secure_image_url}
                      width="40"
                      height="30"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="principal-container measurement-range">
              <p className="bold reduce_top_small">
                Rango de medición del item /Measurement range of the item:
              </p>

              <div className="info_data">
                <b>Inicio: </b>
                <div className="especific_data">
                  <p>
                    {specificationData.start_range} {specificationData.unity}
                  </p>
                </div>
              </div>
              <div className="info_data">
                <b>Fin: </b>
                <div className="especific_data">
                  <p>
                    {specificationData.end_range} {specificationData.unity}
                  </p>
                </div>
              </div>
            </div>

            <div className="principal-container measurement-range">
              <p className="bold reduce_top_small">
                Condiciones ambientales /Environmental conditions:
              </p>

              <div className="info_data">
                <b>Tamb (°C): </b>
                <div className="especific_data">
                  <p>
                    {calibratioCertificateData.environmental_temperature} ±{" "}
                    {calibratioCertificateData.temperature_uncertainty}
                  </p>
                </div>
              </div>
              <div className="info_data">
                <b>Humedad (% Hr): </b>
                <div className="especific_data">
                  <p>
                    {calibratioCertificateData.humidity} ±{" "}
                    {calibratioCertificateData.humidity_uncertainty}
                  </p>
                </div>
              </div>
            </div>

            <div id="data_calibration_container">
              <p className="data_title">2.-Datos del ítem recibido:</p>

              <table id="data_calibration_table">
                <thead>
                  <tr>
                    <th>N° </th>
                    <th>Lect Inst</th>
                    <th>Valor Patrón</th>
                    <th>Unidad</th>
                    <th>Error</th>
                    <th>Uexp</th>
                    <th>IErrI + Uexp</th>
                    <th>E.M.P</th>
                    <th>Conformidad</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>{calibratioCertificateData.lec_inst1}</td>
                    <td>{calibratioCertificateData.val_pattern1}</td>
                    <td>{specificationData.unity}</td>
                    <td>{calibratioCertificateData.error1}</td>
                    <td>{calibratioCertificateData.uexp1}</td>
                    <td>{calibratioCertificateData.ierri_uexp1}</td>
                    <td>{calibratioCertificateData.emp1}</td>
                    <td>{calibratioCertificateData.conformity1}</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>{calibratioCertificateData.lec_inst2}</td>
                    <td>{calibratioCertificateData.val_pattern2}</td>
                    <td>{specificationData.unity}</td>
                    <td>{calibratioCertificateData.error2}</td>
                    <td>{calibratioCertificateData.uexp2}</td>
                    <td>{calibratioCertificateData.ierri_uexp2}</td>
                    <td>{calibratioCertificateData.emp2}</td>
                    <td>{calibratioCertificateData.conformity2}</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>{calibratioCertificateData.lec_inst3}</td>
                    <td>{calibratioCertificateData.val_pattern3}</td>
                    <td>{specificationData.unity}</td>
                    <td>{calibratioCertificateData.error3}</td>
                    <td>{calibratioCertificateData.uexp3}</td>
                    <td>{calibratioCertificateData.ierri_uexp3}</td>
                    <td>{calibratioCertificateData.emp3}</td>
                    <td>{calibratioCertificateData.conformity3}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="important_data_container">
              <div className="calibration_method_container">
                <p className="bold">
                  5.- Método de calibración / Calibration Method:
                </p>
                <p className="calibration_method_detail">
                  Calibración por comparación directa utilizando patrones de
                  referencia trazables al Sistema Internacional de unidades
                  (SI), de acuerdo a lo establecido en el método de calibración.
                </p>
              </div>
              <div className="pattern_data_container">
                <p className="bold">
                  6.- Patrón de calibración / Calibration Standard:
                </p>
                <div className="row">
                  <div className="info_data">
                    <b>Código:</b>
                    <div className="especific_data">
                      <p>
                        {calibratioCertificateData.calibration_pattern_code}
                      </p>
                    </div>
                  </div>
                  <div className="info_data">
                    <b>Cert N°:</b>
                    <div className="especific_data">
                      <p>
                        {calibratioCertificateData.number_certificate_pattern}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="info_data">
                  <b>Trazabilidad:</b>
                  <div className="especific_data">
                    <p>{calibratioCertificateData.pattern_traceability}</p>
                  </div>
                </div>
              </div>
            </div>

            <table id="calibration_table">
              <thead>
                <tr>
                  <th>Lugar de calibración </th>
                  <th>Fecha de recepción de ítem</th>
                  <th>Fecha de Calibración</th>
                  <th>Fecha de emisión</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{calibratioCertificateData.calibration_place}</td>
                  <td>{calibratioCertificateData.reception_date}</td>
                  <td>{calibratioCertificateData.calibration_date}</td>
                  <td>{calibratioCertificateData.generation_date}</td>
                </tr>
              </tbody>
            </table>

            <table id="authorization_table">
              <thead>
                <tr>
                  <th>Calibración ejecutada por: </th>
                  <th>Sello de aprobación</th>
                  <th>Autorizado por el Gerente Técnico:</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Firma:_________________________ </td>
                  <td id="approval_calibration_image">
                    <img src="/images/sello.png" width="27" height="22" />
                  </td>
                  <td> Firma:_________________________ </td>
                </tr>
              </tbody>
            </table>

            {/* <div id="calibration_footer_pdf_container">
              <p>
                RCJ SERVICES/Lab central de calibraciones:CCP, piso 1 pasillo
                amarillo S21 Maturín.
              </p>
            </div> */}
          </div>
        </div>
        <GeneratePDF html={ref} generate={generate} type="CertificadoCalibracion"/>
      </div>
    </Layout>
  );
}
