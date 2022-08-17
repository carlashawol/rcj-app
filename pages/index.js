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
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

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

    </>
  );
}
