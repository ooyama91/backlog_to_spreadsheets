// Description: プロジェクト一覧を取得する、但し「ignore」シートに記載されているプロジェクトは除外する
function project_list() {
    // スクリプトプロパティSPACE_KEY, API_KEYを取得
    const scriptProperties = PropertiesService.getScriptProperties();
    const SPACE_KEY = scriptProperties.getProperty('SPACE_KEY');
    const API_KEY = scriptProperties.getProperty('API_KEY');

    //APIへの問い合わせ
    const url = `https://${SPACE_KEY}.backlog.jp/api/v2/projects?apiKey=${API_KEY}`;
    const res_project = UrlFetchApp.fetch(url);   
    const project_list = JSON.parse(res_project.getContentText());

    Logger.log(project_list);

    //結果発表用の配列
    const keys = Object.keys(project_list[0]);
    const ary_result = project_list.map(project => Object.values(project));

    //キー名を結果の最初に挿入
    ary_result.unshift(keys);

    //シート名「ignore」から無視するプロジェクトを取得
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet_ignore = ss.getSheetByName('ignore');
    const ignore_list = sheet_ignore.getRange(2, 1, sheet_ignore.getLastRow()-1, 1).getValues().flat();
    Logger.log(ignore_list);

    //無視するプロジェクトを除外
    const ary_result_filtered = ary_result.filter(project => !ignore_list.includes(project[0]));
    Logger.log(ary_result_filtered);


    //結果発表
    const sheet_project_list = ss.getSheetByName('project_list');

    sheet_project_list.getRange(1, 1, ary_result_filtered.length, ary_result_filtered[0].length).setValues(ary_result_filtered);
}