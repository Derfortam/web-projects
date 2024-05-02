let rootPoint = document.querySelector("#pdfViewerDiv")
if (rootPoint) {
   initPDFViewer = () => {
      $("#pdfViewerDiv").html("")
      pdfjsLib
         .getDocument("../book/dune.pdf")
         .promise.then(pdfDoc => {
            console.log(pdfDoc)
            let pages = pdfDoc._pdfInfo.numPages
            console.log(pages)
            //   for (let i = 0; i < pages; i++) {
            for (let i = 0; i < 20; i++) {
               pdfDoc
                  .getPage(i)
                  .then(page => {
                     console.log(page)
                     let pdfCanvas = document.createElement("canvas")
                     let context = pdfCanvas.getContext("2d")
                     let pageViewPort = page.getViewport({scale: 1})
                     console.log(pageViewPort)
                     pdfCanvas.width = pageViewPort.width
                     //   pdfCanvas.width = $("#pdfViewerDiv").width()
                     pdfCanvas.style.maxWidth = "100%"
                     pdfCanvas.height = pageViewPort.height
                     $("#pdfViewerDiv").append(pdfCanvas)
                     page.render({
                        canvasContext: context,
                        viewport: pageViewPort,
                     })
                  })
                  .catch(pageErr => console.log(pageErr))
            }
         })
         .catch(pdfErr => {
            console.log(pdfErr)
         })
   }
   // Виклик функції при завантаженні сторінки
   $(function () {
      initPDFViewer()
   })
}

// let rootPoint = document.querySelector("#pdfViewerDiv")
// if (rootPoint) {
//    initPDFViewer = () => {
//       $("#pdfViewerDiv").html("")
//       pdfjsLib
//          .getDocument("../book/curs.pdf")
//          .promise.then(pdfDoc => {
//             console.log(pdfDoc)
//             let pages = pdfDoc._pdfInfo.numPages
//             console.log(pages)
//             for (let i = 0; i < pages; i++) {
//                // for (let i = 0; i < 20; i++) {
//                pdfDoc
//                   .getPage(i)
//                   .then(page => {
//                      console.log(page)
//                      let pdfCanvas = document.createElement("canvas")
//                      let context = pdfCanvas.getContext("2d")
//                      let pageViewPort = page.getViewport({scale: 1})
//                      console.log(pageViewPort)
//                      pdfCanvas.width = pageViewPort.width
//                      //   pdfCanvas.width = $("#pdfViewerDiv").width()
//                      pdfCanvas.style.maxWidth = "100%"
//                      pdfCanvas.height = pageViewPort.height
//                      $("#pdfViewerDiv").append(pdfCanvas)
//                      page.render({
//                         canvasContext: context,
//                         viewport: pageViewPort,
//                      })
//                   })
//                   .catch(pageErr => console.log(pageErr))
//             }
//          })
//          .catch(pdfErr => {
//             console.log(pdfErr)
//          })
//    }
//    // Виклик функції при завантаженні сторінки
//    $(function () {
//       initPDFViewer()
//    })
// }
