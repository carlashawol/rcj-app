import React from "react";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import themeColors from "../theme/colors/themeColors";
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Link from "next/link";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 435,
  bgcolor: "rgba(25, 76, 100, 0.66)",
  borderRadius: "20px",
  boxShadow: 24,
};

const SuccessConfirmationModal = ({
  title = "",
  openModal,
  closeModal,
  modalTitle,
  buttonTitle,
  admin,
}) => {
  const handleClose = () => {
    closeModal();
  };

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-save-rope"
      aria-describedby="modal-save-rope"
      sx={{
        backgroundColor: "rgba(25, 76, 100, 0.66)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Box sx={style}>
        <Box
          sx={{
            width: "100%",
            borderRadius: "20px",
            backgroundColor: "#F0FDFA",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              borderRadius: "50%",
              backgroundColor: themeColors.gray,
              width: 32,
              height: 32,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "flex-end",
            }}
          >
            <IconButton size="small" onClick={handleClose}>
              <CloseRoundedIcon
                sx={{ color: "#FFFFFF", fontSize: 16, fontWeight: 500 }}
              />
            </IconButton>
          </Box>
          <Stack alignItems="center">
            <CheckCircleIcon color="primary" sx={{ fontSize: 72 }} />
            <Typography
              sx={{ fontSize: 22, color: themeColors.greyDarkText }}
            >
              {modalTitle}
            </Typography>
            <Typography
              sx={{
                fontSize: 24,
                fontWeight: 700,
                color: themeColors.greyDarkText,
              }}
            >
              {title}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            sx={{ mt: 3 }}
            spacing={1}
          >
            <Button
              variant="contained"
              onClick={handleClose}
              sx={{ fontSize: 18, padding: "11px 14px", borderRadius: 10 }}
            >
              {buttonTitle}
            </Button>
            <Link href="/" passHref>
              <Button
                variant="outlined"
                sx={{ fontSize: 18, padding: "11px 14px", borderRadius: 10 }}
              >
                Página de inicio
              </Button>
            </Link>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
};

export default SuccessConfirmationModal;
