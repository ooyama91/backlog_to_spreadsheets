/*
 プロジェクトのデフォルト担当者を設定する
*/

function set_default_assignee() {
    const scriptProperties = PropertiesService.getScriptProperties();
    const SPACE_KEY = scriptProperties.getProperty('SPACE_KEY');
    const API_KEY = scriptProperties.getProperty('API_KEY');
    const ID_OOYAMA = scriptProperties.getProperty('ID_OOYAMA');

}
