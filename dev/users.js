function users() {

    const scriptProperties = PropertiesService.getScriptProperties();
    const SPACE_KEY = scriptProperties.getProperty('SPACE_KEY');
    const API_KEY = scriptProperties.getProperty('API_KEY');

    // ユーザー一覧を取得
    const url = `https://${SPACE_KEY}.backlog.jp/api/v2/users?apiKey=${API_KEY}`;
    const res_user = UrlFetchApp.fetch(url);
    const user_list = JSON.parse(res_user.getContentText());
    Logger.log(user_list);

    // usersシートに貼り付け
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet_user = ss.getSheetByName('users');
    sheet_user.clear();
    const keys = Object.keys(user_list[0]);
    const ary_result = user_list.map(user => Object.values(user));
    ary_result.unshift(keys);
    sheet_user.getRange(1, 1, ary_result.length, ary_result[0].length).setValues(ary_result);

}