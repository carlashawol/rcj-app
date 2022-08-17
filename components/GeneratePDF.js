import React from "react";
import { jsPDF, HTMLOptionImage, addHTML } from "jspdf";
import { toPng, toCanvas } from "html-to-image";
import autoTable from "jspdf-autotable";

const GeneratePdf = ({ html, generate }) => {
  //TODO REMEMBER ADD VALIDATIONS
  if (generate) {
    const doc = new jsPDF({
      encryption: {
        userPassword: "1234",
        userPermissions: ["print", "modify", "copy", "annot-forms"],
      },
      margin: "10px",
    });

    //let image = document.getElementById("image").getAttribute("src");
    //doc.text(document.querySelector(".content > h1").innerHTML, 75, 5);
    //doc.addImage(image, 70, 7, 60, 60);
    //doc.text(split, 5, 75);
    //doc.addPage()
    //autoTable(doc, {
    // html: "#table",
    // margin: { top: 60 },
    //});
    var options = {
      pagesplit: true,
    };

    doc.html(document.getElementById("pdf-data"), {
      callback: function (doc) {
        doc.save("orderCompra");
      },
    });
  }

  return <></>;
};

export default GeneratePdf;
