import Head from "next/head";
import Layout, { siteTitle } from "../components/Layout";
import utilStyles from "../styles/utils.module.css";
import { Typography, Box, Stack } from "@mui/material";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import ServiceOfferForm from "../components/ServiceOfferForm";
import dynamic from "next/dynamic";
import useClients from "./../hooks/useClients";
import useActivity from "../hooks/useActivity";
import React, { useEffect, useState } from "react";

const GeneratePDF = dynamic(() => import("../components/GeneratePDF"), {
  ssr: false,
});

export default function addClient() {
  const { getClients } = useClients();
  const { getActivities } = useActivity();
  const [generate, setGenerate] = React.useState(false);
  const [clients, setClients] = React.useState([]);
  const [activities, setActivities] = React.useState([]);
  const [offerData, setOfferData] = React.useState({});

  const onHandleGenerate = (value, serviceOfferdata) => {
    setOfferData(serviceOfferdata);
    setGenerate(value);
  };
  const ref = React.useRef();

  useEffect(() => {
    const getClientsResponse = async () => {
      const apiResponse = await getClients();
      if (!apiResponse.error && apiResponse.data) {
        setClients(apiResponse.data);
      }
    };
    getClientsResponse();
  }, [getClients, setClients]);

  useEffect(() => {
    const getActivitiesResponse = async () => {
      const apiResponse = await getActivities();
      if (!apiResponse.error && apiResponse.data) {
        setActivities(apiResponse.data);
      }
    };
    getActivitiesResponse();
  }, [getActivities, setActivities]);

  console.log("this are the activities", activities);

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
          <InventoryRoundedIcon sx={{ color: "white", fontSize: "100px" }} />
          <Typography variant="h5" color="white">
            Generar oferta de servicio
          </Typography>
        </Stack>
      </Box>

      <ServiceOfferForm
        onHandleGenerate={onHandleGenerate}
        clientsData={clients}
        activities={activities}
      />

      <div className="main" style={{ visibility: "hidden" }}>
        <div className="content" ref={ref}>
          <div id="pdf-data">
            <img src="/images/header.png" width="209" height="25" />
            <h1 className="offer-title">OFERTA DE SERVICIO</h1>
            <div className="principal-container">
              <div className="info_data">
                <b>Fecha de la Oferta: </b>
                <div className="especific_data">
                  <p>{offerData.offer_date}</p>
                </div>
              </div>
              <div className="info_data">
                <b>N° de Solicitud: </b>
                <div className="especific_data">
                  <p>{offerData.id}</p>
                </div>
              </div>
              <div className="info_data">
                <b>Código Registro: </b>
                <div className="especific_data">
                  <p> FCP-{offerData.id}</p>
                </div>
              </div>
            </div>

            <div className="client-container">
              <div className="sub-container">
                <p className="data_title">1.-Datos del Cliente:</p>

                <div className="row">
                  <div className="info_data">
                    <b>Cliente:</b>
                    <div className="especific_data">
                      <p>{offerData.client_name?.name}</p>
                    </div>
                  </div>

                  <div className="info_data">
                    <b>Nit:</b>
                    <div className="especific_data">
                      <p>{offerData.client_name?.nit}</p>
                    </div>
                  </div>

                  <div className="info_data">
                    <b>Rif:</b>
                    <div className="especific_data">
                      <p>{offerData.client_name?.rif}</p>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="info_data">
                    <b>Dirección:</b>
                    <div className="especific_data">
                      <p>{offerData.client_name?.address}</p>
                    </div>
                  </div>

                  <div className="info_data">
                    <b>Ciudad:</b>
                    <div className="especific_data">
                      <p>{offerData.client_name?.city}</p>
                    </div>
                  </div>

                  <div className="info_data">
                    <b>Departamento:</b>
                    <div className="especific_data">
                      <p>{offerData.client_name?.department}</p>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="info_data">
                    <b>País:</b>
                    <div className="especific_data">
                      <p>{offerData.client_name?.country}</p>
                    </div>
                  </div>

                  <div className="info_data">
                    <b>Teléfono:</b>
                    <div className="especific_data">
                      <p>{offerData.client_name?.telephone}</p>
                    </div>
                  </div>

                  <div className="info_data">
                    <b>Contacto Cliente:</b>
                    <div className="especific_data">
                      <p>{offerData.client_name?.contact}</p>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="info_data">
                    <b>Celular Contacto:</b>
                    <div className="especific_data">
                      <p>{offerData.client_name?.cellphone}</p>
                    </div>
                  </div>

                  <div className="info_data">
                    <b>Correo electrónico:</b>
                    <div className="especific_data">
                      <p>{offerData.client_name?.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="principal-container">
              <div className="info_data">
                <p className="data_title">
                  2.-Fecha para el ingreso de los items o inicio de la
                  actividad:{" "}
                </p>
                <div className="especific_data">
                  <p className="important_date">{offerData?.date_item_reception}</p>
                </div>
              </div>
            </div>

            <div className="principal-container">
              <div className="info_data">
                <p className="data_title">3.-Actividades a efectuarse en: </p>
                <div className="especific_data">
                  <p className="bold"> En Sitio (In Situ)</p>
                </div>
              </div>
            </div>

            <div className="principal-container">
              <div className="info_data">
                <p className="data_title">4.-Tipo de servicio a efectuar: </p>
                <div className="especific_data">
                  <p className="bold">Calibración</p>
                </div>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>N° </th>
                  <th>Item</th>
                  <th>Marca</th>
                  <th>Modelo</th>
                  <th>Rango</th>
                  <th>Método de calibración</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                {offerData.activities?.map((data, index) => {
                  if (index === 1) {
                    return (
                      <>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{data.service_type.item}</td>
                          <td>{data.brand}</td>
                          <td>{data.model}</td>
                          <td>
                            ({data.start_range}......{data.end_range}){" "}
                            {data.unity}
                          </td>
                          <td>{data.service_type.method}</td>
                          <td>{data.quantity}</td>
                          <td>{data.price * data.quantity} {offerData.coin}</td>
                        </tr>
                        <tr>
                          <td colspan="8">
                            Requisitos del cliente: {data.client_requirements}{" "}
                            &nbsp;Estatus de reconocimiento: {data.status}{" "}
                            &nbsp;Declaración de conformidad?: {data.conformity}
                          </td>
                        </tr>
                        <tr>
                          <td colspan="8">
                            <b>
                              Buen estado operativo: Si:___No:___Buen estado
                              físico: Si:___No:___Identificación Unica:
                              Si:___No:___Manual Oper: Si:___No:___
                              Otra:____________Si:___No:___
                            </b>
                          </td>
                        </tr>
                        <div className="box"></div>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{data.service_type.item}</td>
                          <td>{data.brand}</td>
                          <td>{data.model}</td>
                          <td>
                            ({data.start_range}......{data.end_range}){" "}
                            {data.unity}
                          </td>
                          <td>{data.service_type.method}</td>
                          <td>{data.quantity}</td>
                          <td>{data.price * data.quantity} {offerData.coin}</td>
                        </tr>
                        <tr>
                          <td colspan="8">
                            Requisitos del cliente: {data.client_requirements}{" "}
                            &nbsp;Estatus de reconocimiento: {data.status}{" "}
                            &nbsp;Declaración de conformidad?: {data.conformity}
                          </td>
                        </tr>
                        <tr>
                          <td colspan="8">
                            <b>
                              Buen estado operativo: Si:___No:___Buen estado
                              físico: Si:___No:___Identificación Unica:
                              Si:___No:___Manual Oper: Si:___No:___
                              Otra:____________Si:___No:___
                            </b>
                          </td>
                        </tr>
                      </>
                    );
                  }
                })}
              </tbody>
            </table>

            <div className="aproval_info_container">
              <div className="aproval_info">
                <p className="conditions_title">
                  CONDICIONES ACORDADAS CON EL CLIENTE
                </p>
                <div className="row">
                  <div className="info_data">
                    <b>Disponibilidad:</b>
                    <div className="especific_data">
                      <p>{offerData.disponibility}</p>
                    </div>
                  </div>
                  <div className="info_data">
                    <b>Tiempo de entrega de Certificados (días):</b>
                    <div className="especific_data">
                      <p>{offerData.certificate_time}</p>
                    </div>
                  </div>
                </div>
                <p className="important_date no_margin">
                  Regla de decisión para la declaración de conformidad, con una
                  probabilidad de conformidad de al menos del 97,7 % :
                </p>
                <p className="bold no_margin">
                  1.- CONFORME si se cumple el siguiente condición: │ecal │+
                  Uexp cal ≤ E.M.P.
                </p>
                <p className="bold no_margin">
                  2.- NO CONFORME si se cumple el siguiente condición: E.M.P. │
                  ecal │- Uexp cal
                </p>
                <p className="bold no_margin">
                  3.- NO DETERMINADO si se cumple el siguiente condición: │ecal
                  │- Uexp cal E.M.P. │ ecal │+ Uexp cal
                </p>
              </div>

              <p className="bold table_title">
                Esta oferta de servicio es elaborada, revisada y aprobada por:
              </p>
              <table id="aproval_table">
                <thead>
                  <tr>
                    <th>Nombre </th>
                    <th>Cargo</th>
                    <th>Firma</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{offerData.offer_created_by?.name}</td>
                    <td>{offerData.offer_created_by?.charge}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div id="footer_pdf_container">
              <div id="footer_pdf_first">
                <div className="especific_data">
                  <p>Código: FT-SC-{offerData.id}</p>
                </div>
                <div className="especific_data">
                  <p>Fecha Emisión: {offerData.date_reception}</p>
                </div>
                <div className="especific_data">
                  <p>Revisado y aprobado: Gerente de la calidad</p>
                </div>
              </div>
              <p>
                RCJ SERVICES/Lab central de calibraciones:CCP, piso 1 pasillo
                amarillo S21 Maturín.
              </p>
              <p>Teléfonos:(0291)3143107/3150897/04147644092</p>
              <p>e-mail:atencionalcliente@rcjservices.com</p>
            </div>
          </div>
        </div>
        <GeneratePDF html={ref} generate={generate} type="OfertaServicio"/>
      </div>
    </Layout>
  );
}
