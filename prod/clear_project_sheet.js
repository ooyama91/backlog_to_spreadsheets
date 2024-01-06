// 頭に「00_」が付いているシート以外を削除する

function clear_project_sheet() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheets = ss.getSheets();
    sheets.forEach(sheet => {
        if (!sheet.getName().startsWith('00_')) {
            ss.deleteSheet(sheet);
        }
    });
}