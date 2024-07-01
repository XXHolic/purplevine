import { getSheetList, sheetEventInit } from "./sheet.js";

const init  = () => {
  getSheetList().then(() => {
    setTimeout(() => {
      sheetEventInit();
    }, 500);
  });
}

export { init };