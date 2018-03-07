// HTTP GET
function doGet(request) {  
  return handleRequest(request);   
}

// HTTP POST
function doPost(request) {
  return handleRequest(request);
}

function doPost2(request) {
  return handleRequest(request);  
}

// to handle the request
function handleRequest(request) {
  
  // guard
  if( !validateParameters(request) ) 
    return constructJSONMessage(400, 'invalid parameter(s)');
  
  // prepare variables
  var destinationFileName = generateFileName(request.parameter.company_name + "_" + request.parameter.user_id);
  var clientInfo = constructClientInfo(request, destinationFileName);
  var templateFileId = getTemplateFileId(request.parameter.language);
  
  // save signature
  saveSignature(clientInfo, AppConfig.SIGN_IMAGE_FOLDER_ID);

  // gernerate a PDF file
  var contractGenerator = new ContractGenerator(templateFileId, clientInfo, AppConfig.DESTINATION_FOLDER_ID, destinationFileName);
  var pdf = contractGenerator.generatePDF();
  
  // log
  var message = clientInfo.company_name + " " + pdf;
  AppUtilities.log(message, AppConfig.LOG_SPREADSHEET_ID, AppConfig.LOG_SHEET_NAME);
  
  // return the link of result PDF file
  clientInfo.pdf = pdf;
  return constructJSONMessage(200, "success", clientInfo);
}

function generateFileName(companyName) {
  // sanitize text by taking out special characters
  var resultText = AppUtilities.removeSpecialCharacters(companyName.toUpperCase());
  
  // replace all white spaces with underscore
  resultText = resultText.replace(/ /g, "_");
  return resultText;
}

function validateParameters(request) {
  if( 
      !request.parameter.user_id ||
      !request.parameter.company_name ||
      !request.parameter.company_address ||
      !request.parameter.hotel_authorized_person_name ||
      !request.parameter.hotel_authorized_person_position ||
      !request.parameter.hotel_witness_name
    )
    return false;
  
  return true;
}

function constructClientInfo(request, destinationFileName) {
  var dateText = request.parameter.date;
  if( !dateText ) {
    // no value present, it's today
    date = new Date();
    dateText = getDateText(date, request.parameter.language);
  }
  
  var clientInfo = {
    'date': dateText,
    'company_name': request.parameter.company_name,
    'company_address': request.parameter.company_address,
    
    'handigo_authorized_person_name': request.parameter.handigo_authorized_person_name,
    'handigo_authorized_person_position': request.parameter.handigo_authorized_person_position,
    'handigo_authorized_person_signature': AppUtilities.getImageBlob(
      request.parameter.handigo_authorized_person_signature,
      destinationFileName + '_' + request.parameter.filename_handigo_authorized_person_signature,
      request.parameter.imageformat_handigo_authorized_person_signature,
      request.parameter.fileid_handigo_authorized_person_signature),
    
    'handigo_witness_name': request.parameter.handigo_witness_name,
    'handigo_witness_position': request.parameter.handigo_witness_position,
    'handigo_witness_signature': AppUtilities.getImageBlob(
      request.parameter.handigo_witness_signature,
      destinationFileName + '_' + request.parameter.filename_handigo_witness_signature,
      request.parameter.imageformat_handigo_witness_signature,
      request.parameter.fileid_handigo_witness_signature),    
    
    'hotel_authorized_person_name': request.parameter.hotel_authorized_person_name,
    'hotel_authorized_person_position': request.parameter.hotel_authorized_person_position,
    'hotel_authorized_person_signature': AppUtilities.getImageBlob(
      request.parameter.hotel_authorized_person_signature,
      destinationFileName + '_' + request.parameter.filename_hotel_authorized_person_signature,
      request.parameter.imageformat_hotel_authorized_person_signature,
      request.parameter.fileid_hotel_authorized_person_signature),
    
    'hotel_witness_name': request.parameter.hotel_witness_name,
    'hotel_witness_position': request.parameter.hotel_witness_position,
    'hotel_witness_signature': AppUtilities.getImageBlob(
      request.parameter.hotel_witness_signature,
      destinationFileName + '_' + request.parameter.filename_hotel_witness_signature,
      request.parameter.imageformat_hotel_witness_signature,
      request.parameter.fileid_hotel_witness_signature),
  }
  return clientInfo;
}

function getTemplateFileId(language) {
  return isThaiLanguage(language)? AppConfig.THAI_TEMPLATE_FILE_ID: AppConfig.ENGLISH_TEMPLATE_FILE_ID;   
}

function constructJSONMessage(status, message, data) {  
  resultJSON = {
      'status': status,
      'message': message,
      'data': data
    };    
  return ContentService.createTextOutput(JSON.stringify(resultJSON)).setMimeType(ContentService.MimeType.JSON);   
}

function getDateText(date, language) {
  var dateText = "";
  if( isThaiLanguage( language ) ) {
    dateText = AppUtilities.convertToThaiNumerals(date.getDate()) + " " + 
               AppUtilities.convertToThaiMonth(date.getMonth()) + " " + 
               AppUtilities.convertToThaiNumerals(AppUtilities.convertToBuddhistYear(date.getFullYear()));
  }
  else
    dateText = Utilities.formatDate(date, "GMT+7", "dd MMMM yyyy");

  return dateText;
}

function isThaiLanguage(language) {
  return (language !== undefined && language.toUpperCase() == "TH");
}

function saveSignature(clientInfo, folderId) {
  clientInfo.handigo_authorized_person_signature_id = AppUtilities.saveImageBlob(
    clientInfo.handigo_authorized_person_signature, folderId);
  
  clientInfo.handigo_witness_signature_id = AppUtilities.saveImageBlob(
    clientInfo.handigo_witness_signature, folderId);
  
  clientInfo.hotel_authorized_person_signature_id = AppUtilities.saveImageBlob(
    clientInfo.hotel_authorized_person_signature, folderId);
  
  clientInfo.hotel_witness_signature_id = AppUtilities.saveImageBlob(
    clientInfo.hotel_witness_signature, folderId);
}