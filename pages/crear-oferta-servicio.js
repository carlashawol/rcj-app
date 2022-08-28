import Head from "next/head";
import Layout, { siteTitle } from "../components/Layout";
import utilStyles from "../styles/utils.module.css";
import { Typography, Box, Stack } from "@mui/material";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import ServiceOfferForm from "../components/ServiceOfferForm";
import dynamic from "next/dynamic";
import useClients from "./../hooks/useClients";
import React, { useEffect, useState} from "react";

const GeneratePDF = dynamic(() => import("../components/GeneratePDF"), {
  ssr: false,
});

export default function addClient() {
  const { getClients } = useClients();
  const [generate, setGenerate] = React.useState(false);
  const [clients, setClients] = React.useState([]);

  const onHandleGenerate = (value) => {
    setGenerate(value);
  };
  const ref = React.useRef();

  useEffect(() => {
    const getClientsResponse = async () => {
      const apiResponse = await getClients();
      if (!apiResponse.error && apiResponse.data) {
        //mostrar popup de que se creo correctamente
        setClients(apiResponse.data)
      }
    };
    getClientsResponse();
  }, [getClients, setClients]);

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

      <ServiceOfferForm onHandleGenerate={onHandleGenerate} clientsData={clients} />

      <div className="main" style={{ visibility: "hidden" }}>
        <div className="content" ref={ref}>
          <div id="pdf-data">
            <img src="/images/header.png" width="209" height="25" />

            <h1 className="titlee">Hello PDF</h1>
            <p id="text">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam
              animi, molestiae quaerat assumenda neque culpa ab aliquam facilis
              eos nesciunt! Voluptatibus eligendi vero amet dolorem omnis
              provident beatae nihil earum! Lorem, ipsum dolor sit amet
              consectetur adipisicing elit. Ea, est. Magni animi fugit
              voluptates mollitia officia libero in. Voluptatibus nisi assumenda
              accusamus deserunt sunt quidem in, ab perspiciatis ad rem. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Nihil
              accusantium reprehenderit, quasi dolorum deserunt, nisi dolores
              quae officiis odio vel natus! Pariatur enim culpa velit
              consequatur sapiente natus dicta alias! Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Consequatur, asperiores error
              laudantium corporis sunt earum incidunt expedita quo quidem
              delectus fugiat facilis quia impedit sit magni quibusdam ipsam
              reiciendis quaerat! Lorem ipsum dolor sit, amet consectetur
              adipisicing elit. Quisquam animi, molestiae quaerat assumenda
              neque culpa ab aliquam facilis eos nesciunt!
            </p>
            {/* <table id="table">
              <tr>
                <th>Company</th>
                <th>Contact</th>
                <th>Country</th>
              </tr>
              <tr>
                <td>Alfreds Futterkiste</td>
                <td>Maria Anders</td>
                <td>Germany</td>
              </tr>
              <tr>
                <td>Centro comercial Moctezuma</td>
                <td>Francisco Chang</td>
                <td>Mexico</td>
              </tr>
              <tr>
                <td>Centro comercial Moctezuma</td>
                <td>Francisco Chang</td>
                <td>Mexico</td>
              </tr>
              <tr>
                <td>Centro comercial Moctezuma</td>
                <td>Francisco Chang</td>
                <td>Mexico</td>
              </tr>
              <tr>
                <td>Centro comercial Moctezuma</td>
                <td>Francisco Chang</td>
                <td>Mexico</td>
              </tr>
            </table> */}
          </div>
        </div>
        <GeneratePDF html={ref} generate={generate} />
      </div>
    </Layout>
  );
}
