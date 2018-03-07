package mail

type MailRequest struct {
	ContractId string `form:"contract_id" json:"contract_id" bson:"contract_id"`
	Template   string `form:"template" json:"template" bson:"template"`
}

type Result struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
}
