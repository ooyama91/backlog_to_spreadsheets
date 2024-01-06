function test_function() {
    // シート「project_list」からプロジェクト一覧を取得
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet_project_list = ss.getSheetByName('00_project');
    const project_list = sheet_project_list.getRange(2, 1, sheet_project_list.getLastRow()-1, 2).getValues();
    Logger.log(project_list);

    // 1つ目のプロジェクトの課題一覧を取得
    const scriptProperties = PropertiesService.getScriptProperties();
    const SPACE_KEY = scriptProperties.getProperty('SPACE_KEY');
    const API_KEY = scriptProperties.getProperty('API_KEY');
    const url = `https://${SPACE_KEY}.backlog.jp/api/v2/issues?apiKey=${API_KEY}&projectId[]=${project_list[0][0]}`;
    const res_issue = UrlFetchApp.fetch(url);
    const issue_list = JSON.parse(res_issue.getContentText());
    Logger.log(issue_list);

    // プロジェクト名でシートを作成（もし既にあれば、そのシートを選択）
    let sheet_project = ss.getSheetByName(project_list[0][1]);
    if (sheet_project === null) {
        sheet_project = ss.insertSheet(project_list[0][1]);
    } else {
        sheet_project.activate();
    }

    // 課題一覧をシートに貼り付け
    const keys = Object.keys(issue_list[0]);
    const ary_result = issue_list.map(issue => Object.values(issue));
    ary_result.unshift(keys);
    sheet_project.getRange(1, 1, ary_result.length, ary_result[0].length).setValues(ary_result);
    


}