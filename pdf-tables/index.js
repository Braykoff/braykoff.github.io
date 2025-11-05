const fileInputContainer = document.getElementById("fileInputContainer");
const fileInput = document.getElementById("fileInput");
const fileTitle = document.getElementById("fileTitle");
const pageCountElem = document.getElementById("pageCount");
const columnEntry = document.getElementById("columnEntry");
const rowEntry = document.getElementById("rowEntry");
const applyAllButton = document.getElementById("applyToAllAction");
const extractButton = document.getElementById("extractAction");

const canvasContainer = document.getElementById("canvasContainer");

var pdfFile = undefined;

// File input
fileInput.addEventListener("change", async () => {
  pdfjsLib.GlobalWorkerOptions.workerSrc = "https://www.raykoff.org/pdf-tables/pdfjs-5.4.394-legacy-dist/build/pdf.worker.mjs";

  if (fileInput.files.length != 0) {
    pdfFile = fileInput.files[0]
    fileTitle.innerText = pdfFile.name;
    document.title = "PDFTables - " + pdfFile.name;
    fileInput.setAttribute("disabled", "Y");
    fileInputContainer.classList.remove("action");

    canvasContainer.style.display = "block";
    canvasContainer.innerHTML = "";

    // Load PDF
    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1 });

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      canvas.style.display = "block";
      canvas.style.margin = "10px auto";

      await page.render({ canvasContext: ctx, viewport }).promise;
      container.appendChild(canvas);
    }
  }
});