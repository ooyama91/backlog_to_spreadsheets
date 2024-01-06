/*
  00_ で始まるシート以外を削除する
*/
function deleteSheetsExceptPrefixed() {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheets = spreadsheet.getSheets();
    
    for (var i = 0; i < sheets.length; i++) {
      var sheet = sheets[i];
      var sheetName = sheet.getName();
      
      // 「00_」で始まるシート名を除外して削除
      if (!sheetName.startsWith("00_")) {
        spreadsheet.deleteSheet(sheet);
      }
    }
  }
  