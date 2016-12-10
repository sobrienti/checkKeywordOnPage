function CheckKeywords() {
  
  // We get a reference to the active spreadsheet
  // And we select the first sheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];
  SpreadsheetApp.setActiveSheet(sheet);
  
  var range = sheet.getRange(1, 2);
  var url = range.getDisplayValue();
  
  // TODO: Add validation check that the cell is indeed a URL
  var response = fetchURL(url);
  var doc = response.getContentText();
  
  // We get the list of keywords
  var keywordRange = sheet.getRange(6,1, 51);
  var keywords = keywordRange.getDisplayValues();
  
  for (var i = 0, len = keywords.length; i < len; i++) {
    if(doc.indexOf(keywords[i][0]) > 0 ) {
      sheet.getRange(6+i, 3).setValue("It's There");
    } else {
      sheet.getRange(6+i, 3).setValue("Not Found");
    }
  }
}

function fetchURL(url) {
  return UrlFetchApp.fetch(url);
}
