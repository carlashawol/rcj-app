import Head from "next/head";
import Layout, { siteTitle } from "../components/Layout";
import utilStyles from "../styles/utils.module.css";
import { Typography, Box, Stack } from "@mui/material";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import ItemReceptionForm from "../components/ItemReceptionForm";
import dynamic from "next/dynamic";
import useClients from "./../hooks/useClients";
import useOffers from "./../hooks/useOffers";
import useInstruments from "../hooks/useInstruments";
import React, { useEffect } from "react";
import useSpecification from "../hooks/useSpecifications";

const GeneratePDF = dynamic(() => import("../components/GeneratePDF"), {
  ssr: false,
});

export default function createItemReception() {
  const { getClient } = useClients();
  const { getOffers } = useOffers();
  const { getSpecification } = useSpecification();
  const { getInstruments } = useInstruments();
  const [generate, setGenerate] = React.useState(false);
  const [instruments, setInstruments] = React.useState([]);
  const [itemData, setItemData] = React.useState({});
  const [clientData, setClientData] = React.useState({});
  const [offersData, setOffersData] = React.useState([]);
  const [specificationData, setSpecificationData] = React.useState({});

  const onHandleGenerate = async (value, info) => {
    console.log("item receptio report", info);
    setItemData(info);
    const apiResponseClient = await getClient(info.instrument.client);
    console.log(info.instrument.name);
    const apiResponseSpecification = await getSpecification(
      info.instrument.name
    );
    if (
      !apiResponseClient.error &&
      apiResponseClient.data &&
      !apiResponseSpecification.error &&
      apiResponseSpecification.data
    ) {
      setClientData(apiResponseClient.data);
      setSpecificationData(apiResponseSpecification.data);
    }

    if (clientData && specificationData) {
      setGenerate(value);
    }
  };
  const ref = React.useRef();

  useEffect(() => {
    const getInstrumentsResponse = async () => {
      const apiResponse = await getInstruments();
      if (!apiResponse.error && apiResponse.data) {
        setInstruments(apiResponse.data);
      }
    };
    getInstrumentsResponse();
  }, [getInstruments, setInstruments]);

  useEffect(() => {
    const getOffersResponse = async () => {
      const apiResponse = await getOffers();
      if (!apiResponse.error && apiResponse.data) {
        setOffersData(apiResponse.data);
      }
    };
    getOffersResponse();
  }, [getOffers, setOffersData]);

  console.log("this are the istruments:", instruments);
  console.log("this is the specifucationData:", specificationData);

  const dateNow = new Date().toLocaleString().split(",")[0];

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
          <ConstructionRoundedIcon sx={{ color: "white", fontSize: "100px" }} />
          <Typography variant="h5" color="white">
            Generar expediente de recepción de Ítem
          </Typography>
        </Stack>
      </Box>

      <ItemReceptionForm
        onHandleGenerate={onHandleGenerate}
        instrumentsData={instruments}
        offersData={offersData}
      />
      <div className="main" style={{ visibility: "hidden" }}>
        <div className="content" ref={ref}>
          <div id="pdf-data">
            <img src="/images/header.png" width="209" height="25" />
            <h1 className="offer-title">
              NOTA DE ENTREGA DE ITEMS DE CALIBRACIÓN
            </h1>
            <div className="date_container">
              <div className="info_data">
                <b>Fecha de la entrega: </b>
                <div className="especific_data">
                  <p>{itemData.item_reception_date}</p>
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
                </div>

                <div className="row">
                  <div className="info_data">
                    <b>Dirección:</b>
                    <div className="especific_data">
                      <p>{clientData.address}</p>
                    </div>
                  </div>

                  <div className="info_data">
                    <b>Ciudad:</b>
                    <div className="especific_data">
                      <p>{clientData.city}</p>
                    </div>
                  </div>

                  <div className="info_data">
                    <b>Departamento:</b>
                    <div className="especific_data">
                      <p>{clientData.department}</p>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="info_data">
                    <b>País:</b>
                    <div className="especific_data">
                      <p>{clientData.country}</p>
                    </div>
                  </div>

                  <div className="info_data">
                    <b>Teléfono:</b>
                    <div className="especific_data">
                      <p>{clientData.telephone}</p>
                    </div>
                  </div>

                  <div className="info_data">
                    <b>Contacto Cliente:</b>
                    <div className="especific_data">
                      <p>{clientData.cellphone}</p>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="info_data">
                    <b>Celular Contacto:</b>
                    <div className="especific_data">
                      <p>{clientData.contact}</p>
                    </div>
                  </div>

                  <div className="info_data">
                    <b>Correo electrónico:</b>
                    <div className="especific_data">
                      <p>{clientData.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="description_title">
              <p>Descripción del ítem recibido:</p>
            </div>

            <div className="instrument_container">
              <p className="data_title">2.-Datos del ítem recibido:</p>
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
                    <p>{itemData.instrument?.serial}</p>
                  </div>
                </div>

                <div className="info_data">
                  <b>Tipo Sensor: </b>
                  <div className="especific_data">
                    <p>{itemData.instrument?.sensor_type}</p>
                  </div>
                </div>

                <div className="info_data">
                  <b>Serial Sensor: </b>
                  <div className="especific_data">
                    <p>{itemData.instrument?.sensor_serial}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="evaluation_container">
              <p className="data_title">3.-Evaluación del ítem recibido:</p>
              <div className="row">
                <div className="info_data">
                  <b>Indentifiacion única?: </b>
                  <div className="especific_data">
                    <p>{itemData.unique_id}</p>
                  </div>
                </div>

                <div className="info_data">
                  <b>Buen estado físico?: </b>
                  <div className="especific_data">
                    <p>{itemData.good_physical_state}</p>
                  </div>
                </div>

                <div className="info_data">
                  <b>Buen estado operativo?: </b>
                  <div className="especific_data">
                    <p>{itemData.good_operative_state}</p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="info_data">
                  <b>Tiene manual operaciones?: </b>
                  <div className="especific_data">
                    <p>{itemData.operation_manual}</p>
                  </div>
                </div>
                <div className="info_data">
                  <b>Observaciones/Anomalías: </b>
                  <div className="especific_data">
                    <p>{itemData.observations ? itemData.observations : ""}</p>
                  </div>
                </div>
              </div>

              {itemData.secure_image_url && (
                <div className="image_container">
                  <b className="important_date">Foto del instrumento</b>
                  <img src={itemData.secure_image_url} width="40" height="30" />
                </div>
              )}
            </div>

            <div className="aprover_sign">
              <p className="important_date">
                APROBACIÓN DEL PRESENTE DOCUMENTO:
              </p>
              <p className="bold">
                La aprobación del presente documento por parte del representante
                del laboratorio y del representante del cliente, se da mediante
                una comunicación de correo electrónico donde ambos aceptan el
                contenido de la presente nota de recepción de items de
                calibración o mediante la firma física de ambos representantes
                en la siguiente sección:
              </p>

              <div className="container_aproval">
                <div className="row">
                  <div className="info_data">
                    <b>Responsable de entregar el ítem: </b>
                    <div className="especific_data">
                      <p>{itemData.responsible_entering_item}</p>
                    </div>
                  </div>
                  <div className="sign_container">
                    <p> Firma:_________________________</p>
                  </div>
                </div>

                <div className="row">
                  <div className="info_data">
                    <b>Responsable de recibir el ítem: </b>
                    <div className="especific_data">
                      <p>{itemData.responsible_receiving_item}</p>
                    </div>
                  </div>
                  <div className="sign_container">
                    <p> Firma:_________________________</p>
                  </div>
                </div>
              </div>
            </div>

            <div id="footer_pdf_container">
              <div id="footer_pdf_first">
                <div className="especific_data">
                  <p>Código: FT-SC-{itemData.id}</p>
                </div>
                <div className="especific_data">
                  <p>Fecha Emisión: {dateNow}</p>
                </div>
                <div className="especific_data">
                  <p>Revisado y aprobado: Gerente de la calidad</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <GeneratePDF html={ref} generate={generate} type="ReporteRecepcionItem"/>
      </div>
    </Layout>
  );
}
