function connect() {

    // スクリプトプロパティSPACE_KEY, API_KEYを取得
    const scriptProperties = PropertiesService.getScriptProperties();
    const SPACE_KEY = scriptProperties.getProperty('SPACE_KEY');
    const API_KEY = scriptProperties.getProperty('API_KEY');

    //APIへの問い合わせ
    var res_project = UrlFetchApp.fetch("https://"+SPACE_KEY+".backlog.jp/api/v2/projects?apiKey="+API_KEY);   
    var project_list = JSON.parse(res_project.getContentText());

    Logger.log(project_list);


}
