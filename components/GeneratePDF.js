import React from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const GeneratePdf = ({ html, generate, type }) => {
  if (generate) {
    const doc = new jsPDF({
      // encryption: {
      //   userPassword: "1234",
      //   userPermissions: ["print", "modify", "copy", "annot-forms"],
      // },
      margin: "10px",
    });
    window.html2canvas = html2canvas;

    doc.html(document.getElementById("pdf-data"), {
      margin: [0, 0, 10, 0],
      pagesplit: true,
      callback: function (doc) {
        if (type === "OfertaServicio") {
          doc.addPage();
          var img = new Image();
          img.src = "/images/end-page.png";
          doc.addImage(img, "png", 5, 12, 203, 170);
        }

        const pageCount = doc.internal.getNumberOfPages();
        doc.setFontSize(11);

        for (var i = 1; i <= pageCount; i++) {
          doc.setPage(i);
          doc.text(
            "Página " + String(i) + " de " + String(pageCount),
            200,
            287,
            null,
            null,
            "right"
          );
        }

        doc.save(type);
      },
    });
  }

  return <></>;
};

export default GeneratePdf;
