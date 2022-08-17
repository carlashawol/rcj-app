import Head from "next/head";
import Layout, { siteTitle } from "../components/Layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import {
  Typography,
  Box,
  Stack,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
} from "@mui/material";
import CardActions from "../components/CardActions";
import * as React from "react";
import dynamic from "next/dynamic";

const GeneratePDF = dynamic(() => import("../components/GeneratePDF"), {
  ssr: false,
});

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
};
const colstyle = {
  width: "30%",
};
const tableStyle = {
  width: "100%",
};

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  const ref = React.useRef();
  return (
    <>
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <Box
          className={utilStyles.headingMd}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Stack justifyContent="center" alignItems="center">
            <Typography variant="h2" color="white">
              Bienvenido!
            </Typography>
            <Typography variant="h5" color="white">
              Qué deseas hacer hoy?
            </Typography>
          </Stack>
        </Box>
        <Stack spacing={1}>
          <Stack direction="row" justifyContent="center" spacing={5} p={3}>
            <CardActions type="orderGeneration" />
            <CardActions type="itemsReception" />
            <CardActions type="calibrationGeneration" />
          </Stack>

          <Stack direction="row" justifyContent="center" spacing={5} p={3}>
            <CardActions type="addClient" />
            <CardActions type="addInstrument" />
            <CardActions type="addEspecification" />
          </Stack>
        </Stack>
      </Layout>

      <div className="main">
        <div className="content" ref={ref}>
          <div id="pdf-data">
            <img src="/images/header.png" width="209" height="25"/>
           
            <h1 className="titlee">
              Hello PDF
            </h1>
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
        <GeneratePDF html={ref} />
      </div>
    </>
  );
}
