function issue_list() {

    const scriptProperties = PropertiesService.getScriptProperties();
    const SPACE_KEY = scriptProperties.getProperty('SPACE_KEY');
    const API_KEY = scriptProperties.getProperty('API_KEY');
    const ID_OOYAMA = scriptProperties.getProperty('ID_OOYAMA');

    // シート「project_list」からプロジェクト一覧を取得
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet_project_list = ss.getSheetByName('00_project');
    const project_list = sheet_project_list.getRange(2, 1, sheet_project_list.getLastRow()-1, 2).getValues();
    Logger.log(project_list);

    // 1つ目のプロジェクトの課題一覧を取得
    let url = `https://${SPACE_KEY}.backlog.jp/api/v2/issues
                    ?apiKey=${API_KEY}
                    &projectId[]=${project_list[0][0]}
                    &assigneeId[]=${ID_OOYAMA}
                `;
    // urlから空白・改行を削除
    url = url.replace(/\s+/g, "");

    const res_issue = UrlFetchApp.fetch(url);
    const issue_list = JSON.parse(res_issue.getContentText());
    Logger.log(issue_list);

    // 「00_issue」シートを取得
    const sheet_project = ss.getSheetByName('00_issue');
    // シートの内容をクリア
    sheet_project.clear();

    // issue_listのうち、statusはnameだけを取得し、nameが「完了」の行は除外する
    const filtered_issue_list = issue_list
        .filter(issue => issue.status.name !== '完了')
        .map(issue => {
            issue.status = issue.status.name;
            return issue;
        });

    // filtered_issue_listの列の並び替えを行う
    // 最初がissueKey
    // 次がstatus
    // 次がsummary
    // あとはそのまま
    const keys_filtered_issue_list = Object.keys(filtered_issue_list[0]);
    const index_issueKey = keys_filtered_issue_list.indexOf('issueKey');
    const index_status = keys_filtered_issue_list.indexOf('status');
    const index_summary = keys_filtered_issue_list.indexOf('summary');

    // 課題一覧をシートに貼り付け
    const keys = Object.keys(filtered_issue_list[0]);
    const ary_result = filtered_issue_list.map(issue => Object.values(issue));
    ary_result.unshift(keys);
    sheet_project.getRange(1, 1, ary_result.length, ary_result[0].length).setValues(ary_result);


}