// シートを名前の順に並び替える
function sortSheet() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheets = ss.getSheets();
    const sheetNames = sheets.map(sheet => sheet.getName());
    sheetNames.sort();
    sheetNames.forEach((sheetName, index) => {
        ss.setActiveSheet(ss.getSheetByName(sheetName));
        ss.moveActiveSheet(index + 1);
    });
}
