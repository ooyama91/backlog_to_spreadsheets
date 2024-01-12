function issue_list() {

    const scriptProperties = PropertiesService.getScriptProperties();
    const SPACE_KEY = scriptProperties.getProperty('SPACE_KEY');
    const API_KEY = scriptProperties.getProperty('API_KEY');
    const ID_OOYAMA = scriptProperties.getProperty('ID_OOYAMA');

    // シート「project_list」からプロジェクト一覧を取得
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet_project = ss.getSheetByName('00_project');
    const sheet_issue = ss.getSheetByName('00_issue');
    const project_list = sheet_project.getRange(2, 1, sheet_project.getLastRow()-1, 2).getValues();
    Logger.log(project_list);

    // 1つ目のプロジェクトの課題一覧を取得
    let url = `https://${SPACE_KEY}.backlog.jp/api/v2/issues
                    ?apiKey=${API_KEY}
                    &statusId[]=1&statusId[]=2&statusId[]=3&statusId[]=5&statusId[]=6
                    &assigneeId[]=${ID_OOYAMA}
                    &count=100
                `;
    // urlから空白・改行を削除
    url = url.replace(/\s+/g, "");

    const res_issue = UrlFetchApp.fetch(url);
    const issue_list = JSON.parse(res_issue.getContentText());
    Logger.log(issue_list);

    // シートの内容をクリア
    sheet_issue.clear();

    // 課題一覧をシートに貼り付け
    const issue_list_array = [];
    for (let i = 0; i < issue_list.length; i++) {
        issue_list_array.push([
            // URLを作成
            `https://${SPACE_KEY}.backlog.jp/view/${issue_list[i].issueKey}`,
            // プロジェクトkeyをissukeyのハイフンより前から取得
            issue_list[i].issueKey.split('-')[0],
            // issukekeyをハイフンより後ろから取得
            issue_list[i].issueKey.split('-')[1],
            issue_list[i].status.name,
            issue_list[i].summary,
            // issue_list[i].dueDateが存在する場合のみsplitを実行
            issue_list[i].dueDate ? issue_list[i].dueDate.split('T')[0] : null
        ]);
    }
    Logger.log(issue_list_array);

    // タイトル行を追加
    issue_list_array.unshift(['URL', 'プロジェクト', '課題番号', 'ステータス', '概要', '期日']);

    // issueシートに貼り付け
    sheet_issue.getRange(1, 1, issue_list_array.length, issue_list_array[0].length).setValues(issue_list_array);

}