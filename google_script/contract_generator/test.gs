// To test on the browser directly, use the following URL
// https://script.google.com/macros/s/AKfycbz2vTWyw6nvsKNlmQUGmuAE9ssKJ2k4DPEa1itZY3KwKRu1SzI/exec?date=15th%20October%202017&company_name=ABC%20CO%20LTD&company_address=31%20Phayathai%20Ratchathewi%20Bangkok&hotel_authorized_person_name=Annop%20Voranartphunkul&hotel_authorized_person_position=CEO&hotel_witness_name=Supamas%20Anuson

function test_POST() {  
  var url = ScriptApp.getService().getUrl() ;
   
  var payload = getTestPayload();
  
  var options =
      {
        'method': 'POST',
        'payload': payload,   
        'followRedirects': true,
        'muteHttpExceptions': true
      };
  
  var result = UrlFetchApp.fetch(url, options);
  
  if (result.getResponseCode() == 200) {    
    var params = JSON.parse(result.getContentText());
    Logger.log(params.message);
  }  
}

function test_GET() {
  var url = ScriptApp.getService().getUrl() + "?date=15th%20October%202017&company_name=ABC%20CO%20LTD&company_address=31%20Phayathai%20Ratchathewi%20Bangkok&hotel_authorized_person_name=Annop%20Voranartphunkul&hotel_authorized_person_position=CEO&hotel_witness_name=Supamas%20Anuson";
  
  var result = UrlFetchApp.fetch(url);
  
  if (result.getResponseCode() == 200) {    
    var params = JSON.parse(result.getContentText());    
    Logger.log(params.message);
  }  
}

function test_mapArrayItems() {
  var clientInfoFields = [
      {
        'placeHolder': '%DATE%',
        'value': 'Jan 29, 2018',
      },
      {
        'placeHolder': '%COMPANY_NAME%',
        'value': 'Socket 9 Co., Ltd.',
      }
    ];
  
  var text = 'Hello %COMPANY_NAME% today is %DATE%'; 
  clientInfoFields.map(
    function(e) {
      text = text.replace(e.placeHolder, e.value);
    }     
  )
  
  Logger.log(text);
}
   
function test_removeSpecialCharacters() {
  var text = "Socket 9 Co., Ltd.";
  
  result = AppUtilities.removeSpecialCharacters(text);
  Logger.log(result); // expect "Socket 9 Co Ltd"
}

function test_getConfigValue() {
  Logger.log(AppConfig.ENGLISH_TEMPLATE_FILE_ID);
}

function test_copyFile() {
  Logger.log('template=' + AppConfig.ENGLISH_TEMPLATE_FILE_ID);
  
  var clientInfo = getTestPayload();
  
  var destinationFileName = 'TEST_CO_LTD';
  var contractGenerator = new ContractGenerator(AppConfig.ENGLISH_TEMPLATE_FILE_ID, clientInfo, AppConfig.DESTINATION_FOLDER_ID, destinationFileName);
  var link = contractGenerator.generatePDF();

  Logger.log(link);
}

function test_getTestPayLoad() {
  var result = getTestPayload();
  Logger.log(result); 
}

function test_convertYear() {
  var year = AppUtilities.convertToBuddhistYear(2018);
  Logger.log(year);
}

function test_log() {
  var message = 'test';
  Logger.log(AppConfig.LOG_SPREADSHEET_ID + ' ' + AppConfig.LOG_SHEET_NAME);
  AppUtilities.log(message, AppConfig.LOG_SPREADSHEET_ID, AppConfig.LOG_SHEET_NAME);
}


function getTestPayload() {
  return  {
        'date': Utilities.formatDate(new Date(), "GMT+7", "dd MMMM yyyy"),
        'company_name': 'Socket 9 Co., Ltd.',
        'company_address': '31 Phyathai building, Phayathai Rd, Bangkok 10400',
        'hotel_authorized_person_name': 'Mr.Annop Voranartphunkul',
        'hotel_authorized_person_position': 'CEO',
        'hotel_witness_name': 'Ms.Maprang Sawasdee'
       };
}