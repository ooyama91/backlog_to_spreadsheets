// シートを名前の順に並び替える

function sortSheet() {
    var sheet = SpreadsheetApp.getActiveSheet();
    var range = sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn());
    range.sort(1);
}