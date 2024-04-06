//-----------------------------------------
//
//メニュー追加（spsheetオープン次処理）
//
//-----------------------------------------
function onOpen() {
var spreadsheet = SpreadsheetApp.getActive();
var menuItems = [
    {name: '課題の取得', functionName: 'issue_list'},
    {name: 'プロジェクト一覧の取得', functionName: 'project_list'},
    {name: '担当者未設定の課題を取得', functionName: 'not_yet_assigned_issue'},
    {name: '担当者を設定', functionName: 'set_default_assignee'},
];
spreadsheet.addMenu('【カスタムメニュー】', menuItems); //メニューバーでの名前とその下のメニュー項目を追加
}// End onOpen


/*
スクリプトの解説
project_list ... プロジェクト一覧を取得する、但し「ignore」シートに記載されているプロジェクトは除外する
issue_list ... プロジェクト一覧を参考に、課題一覧を取得する
clear_project_sheet ... 00_ で始まるシート以外を削除する
onOpen ... メニュー追加（spsheetオープン次処理）
not_yet_assigned_issue ... プロジェクト「TODO」のうち、担当者未設定の課題を取得する
set_default_assignee ... プロジェクト「TODO」の課題の担当者を設定する
*/
