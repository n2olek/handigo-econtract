package config

var DatabaseURL = "mongo:27017"

// var DatabaseURL = "localhost:27017"
var DatabaseName = "econtract"

var TempleteEmail = map[string]string{
	"FileNameTempleteConfirmationEmail": "/../emailtemplate/confirmation/confirmation.html",
	"FileNameTempleteThankyouEmail":     "/../emailtemplate/thankyou/thankyou.html"}

// var DatabaseUsername = "username"
// var DatabasePassword = "pass"

var StoragePath = "/storage/"

// var StoragePath = "C:/Users/Pat/Desktop/"

var ContractAttachmentUploadPath = StoragePath + "upload/contract_attachment/"
