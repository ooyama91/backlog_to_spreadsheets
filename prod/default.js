//-----------------------------------------
//
//メニュー追加（spsheetオープン次処理）
//
//-----------------------------------------
function onOpen() {
var spreadsheet = SpreadsheetApp.getActive();
var menuItems = [
    {name: 'test_name', functionName: 'test_function'},     
];
spreadsheet.addMenu('【カスタムメニュー】', menuItems); //メニューバーでの名前とその下のメニュー項目を追加
}// End onOpen

