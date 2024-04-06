/*
 プロジェクトのデフォルト担当者を設定する
*/

function set_default_assignee() {
    const scriptProperties = PropertiesService.getScriptProperties();
    const SPACE_KEY = scriptProperties.getProperty('SPACE_KEY');
    const API_KEY = scriptProperties.getProperty('API_KEY');
    const ID_OOYAMA = scriptProperties.getProperty('ID_OOYAMA');

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet_todo = ss.getSheetByName('00_not_yet_assign');

    // sheet_todoのD2:DからissueKeyを取得
    const lastRow = sheet_todo.getLastRow();
    const issueKey_list = lastRow > 1 ? sheet_todo.getRange(2, 4, lastRow-1, 1).getValues().flat() : [];
    Logger.log(issueKey_list);

    // issueKeyごとに担当者を設定
    for (let i = 0; i < issueKey_list.length; i++) {
        let url = `https://${SPACE_KEY}.backlog.jp/api/v2/issues/${issueKey_list[i]}?apiKey=${API_KEY}`;
        const payload = {
            assigneeId: ID_OOYAMA
        };
        const options = {
            method: 'patch',
            contentType: 'application/json',
            payload: JSON.stringify(payload)
        };
        const res = UrlFetchApp.fetch(url, options);
        Logger.log(res);
    }

}
