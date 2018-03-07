// static class
AppUtilities = function() { }

AppUtilities.convertToThaiMonth = function(month) {
  var thaiMonths = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม',
                    'เมษายน', 'พฤษภาคม', 'มิถุนายน',
                    'กรกฎาคม', 'สิงหาคม', 'กันยายน',
                    'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
  return thaiMonths[month];
}
    
AppUtilities.convertToThaiNumerals = function(number) {
  var thaiNumerals = ['๐', '๑', '๒', '๓', '๔', '๕', '๖', '๗', '๘', '๙'];
  var resultNumber = number.toString().split("").map(
    function(digit) { 
      return thaiNumerals[digit];
    }
  ).join("");
  return resultNumber;
}
    
AppUtilities.removeSpecialCharacters = function(text) {
  return text.replace(/[^a-zA-Z0-9 ]/g, "");
}
  
AppUtilities.convertToBuddhistYear = function(christianYear) {
  return christianYear + 543;
}

AppUtilities.getImageBlob = function(file, fileName, fileType, fileId) {
  if( 
      (!file || 
      !fileName) &&
      !fileId
    )
    return '';
  if(fileId){
    var file = DriveApp.getFileById(fileId);
    var blob = file.getBlob()
    return blob;
  }
  else{
    var raw = Utilities.base64Decode(file, Utilities.Charset.UTF_8);
    var blob = Utilities.newBlob(raw, getImageMIMEType(fileType), fileName); 
    return blob;  
  }
}

AppUtilities.log = function(message, logSpreadSheetId, logSheetName) {
  Logger.log(message);        
  
  if( 
      !logSpreadSheetId || 
      !logSheetName 
    )
    return;
  
  var logSpreadSheet = SpreadsheetApp.openById(logSpreadSheetId);
  SpreadsheetApp.setActiveSpreadsheet(logSpreadSheet);
  var sheet = logSpreadSheet.getSheetByName(logSheetName);        
  sheet.appendRow([new Date(), message]);
}

function getImageMIMEType(imageFileType) {
  return (imageFileType == "BMP")  ? MimeType.BMP
       : (imageFileType == "GIF")  ? MimeType.GIF
       : (imageFileType == "JPEG") ? MimeType.JPEG
       : (imageFileType == "PNG")  ? MimeType.PNG
       : (imageFileType == "SVG")  ? MimeType.SVG
       : false;
}

AppUtilities.saveImageBlob = function(blob, folderId) {
  if (!blob || !folderId) return "";
  
  var destinationFolder = DriveApp.getFolderById(folderId);
  var savedFile = destinationFolder.createFile(blob);
  return savedFile.getId();
}
