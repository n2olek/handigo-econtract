ContractGenerator = function(templateFileId, clientInfo, destinationFolderId, destinationFileName) {
  var _clientInfo = clientInfo;
  var _destinationFileName = destinationFileName;
  var _templateFileId = templateFileId;
  var _destinationFolderId = destinationFolderId;
  
  this.generatePDF = function() {  
    // 1. create a temp file
    var tempFileId = makeCopyOfTemplateFile();
    
    // 2. fill in data
    var clientInfoFields = constructClientInfoFields();
    fillInData(tempFileId, clientInfoFields);
    
    // 3. stamp signatures
    var signatureBlobs = constructSignatureBlobs();
    stampSignatures(tempFileId, signatureBlobs);

    // 4. save as PDF
    var pdfUrl = saveAsPDF(tempFileId);
    
    // 5. delete the temp file
    deleteFile(tempFileId);
    
    return pdfUrl;
  }
     
  function makeCopyOfTemplateFile() {
    var newFileId = DriveApp.getFileById(_templateFileId).makeCopy().getId();
    var newFile = DriveApp.getFileById(newFileId);
    var destinationFolder = DriveApp.getFolderById(_destinationFolderId);
    destinationFolder.addFile(newFile);
    return newFileId;
  }  
  
  function constructClientInfoFields() {   
    var clientInfoFields = [
      {
        'placeHolder': '%DATE%',
        'value': _clientInfo.date,
      },
      {
        'placeHolder': '%COMPANY_NAME%',
        'value': _clientInfo.company_name,
      },
      {
        'placeHolder': '%COMPANY_ADDRESS%',
        'value': _clientInfo.company_address,
      },
      {
        'placeHolder': '%HANDIGO_AUTHORIZED_PERSON_NAME%',
        'value': _clientInfo.handigo_authorized_person_name,
      },
      {
        'placeHolder': '%HANDIGO_AUTHORIZED_PERSON_POSITION%',
        'value': _clientInfo.handigo_authorized_person_position,
      },
      {
        'placeHolder': '%HANDIGO_WITNESS_NAME%',
        'value': _clientInfo.handigo_witness_name,
      },
      {
        'placeHolder': '%HANDIGO_WITNESS_POSITION%',
        'value': _clientInfo.handigo_witness_position,
      },
      {
        'placeHolder': '%HOTEL_AUTHORIZED_PERSON_NAME%',
        'value': _clientInfo.hotel_authorized_person_name,
      },
      {
        'placeHolder': '%HOTEL_AUTHORIZED_PERSON_POSITION%',
        'value': _clientInfo.hotel_authorized_person_position,
      },
      {
        'placeHolder': '%HOTEL_WITNESS_NAME%',
        'value': _clientInfo.hotel_witness_name,
      },
      {
        'placeHolder': '%HOTEL_WITNESS_POSITION%',
        'value': _clientInfo.hotel_witness_position,
      },
    ]  
    return clientInfoFields;
  }
  
  function fillInData(fileId, clientInfoFields) {
    var file = DocumentApp.openById(fileId);

    // fill in placeholders
    var fileBody = file.getActiveSection();    

    clientInfoFields.map(
      function(e) {
        fileBody.replaceText(e.placeHolder, e.value);
      }     
    )
    
    file.saveAndClose();
  }
  
  function constructSignatureBlobs() {   
    var signatureBlobs = [
                          _clientInfo.handigo_authorized_person_signature, 
                          _clientInfo.handigo_witness_signature, 
                          _clientInfo.hotel_authorized_person_signature, 
                          _clientInfo.hotel_witness_signature
                         ]  
    return signatureBlobs;
  }
  
  function stampSignature(fileId, signatureImageBlob, frameIndex) {
    var file = DocumentApp.openById(fileId);
    var fileBody = file.getActiveSection();
    var frames = fileBody.getImages(); // get frames in file
    
    // get parent of the frame
    var frameParent = frames[frameIndex].getParent();
    
    // put the signature right next to the frame
    var framePosition = frameParent.getChildIndex(frames[frameIndex]) + 1;
    frameParent.insertInlineImage(framePosition, signatureImageBlob).setWidth(200).setHeight(100);
    // delete the frame itself
    frames[frameIndex].removeFromParent();
    
    file.saveAndClose();
  }
  
  function stampSignatures(tempFileId, signatureBlobs) {
    signatureBlobs.map(
      function(signatureBlob, index) {
        if(signatureBlob) {
          stampSignature(tempFileId, signatureBlob, index);
        }
      }     
    )
  }
    
  function saveAsPDF(fileId) {
    var pdfBlob = DriveApp.getFileById(fileId).getAs("application/pdf");
    pdfBlob.setName(_destinationFileName + ".pdf");
    var pdfFile = DriveApp.createFile(pdfBlob);
    
    // put in the destination folder
    var destinationFolder = DriveApp.getFolderById(_destinationFolderId);
    destinationFolder.addFile(pdfFile)
    
    // return the link of the PDF file
    return pdfFile.getId();
  }
    
  function deleteFile(fileId) {
    DriveApp.getFileById(fileId).setTrashed(true);
  }
}
