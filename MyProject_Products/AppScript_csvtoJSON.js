/*
1. Open a google sheet
2. Open Extensions > AppScript
3. Add the following function into Code.gs
4. Rename the app script
5. Update 'folderName' and 'fileName row[0]' variables below as neccessary
6. Click Run and accept all permissions
*/
function csvToJson() {
    var sheet = SpreadsheetApp.getActiveSheet();
    var data = sheet.getDataRange().getValues();
    var headers = data[0];
    var folderName = "KBOB_JSON"; // Set the output folder name 
    var folder = DriveApp.getFoldersByName(folderName).next();
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      var json = {};
      for (var j = 0; j < row.length; j++) {
        json[headers[j]] = row[j];
      }
      var fileName = row[0] + ".json"; // Use column 3 as the filename
      var file = folder.createFile(fileName, JSON.stringify(json));
    }
  }