package contract

import (
	"errors"

	"gopkg.in/mgo.v2/bson"
)

type Contract struct {
	Id           bson.ObjectId `form:"_id" json:"_id" bson:"_id,omitempty"`
	UserId       bson.ObjectId `form:"user_id" json:"user_id" bson:"user_id"`
	SaleId       string        `form:"sale_id" json:"sale_id" bson:"sale_id"`
	Language     string        `form:"language" json:"language" bson:"language"`
	EmailContact string        `form:"email_contact" json:"email_contact" bson:"email_contact"`
	Status       int           `form:"status" json:"status" bson:"status"`
	CreateDate   int64         `form:"create_date" json:"create_date" bson:"create_date"`
	UpdateDate   int64         `form:"update_date" json:"update_date" bson:"update_date"`
	DeleteDate   int64         `form:"delete_date" json:"delete_date" bson:"delete_date"`
	IsActive     bool          `form:"is_active" json:"is_active" bson:"is_active"`

	Doc                     Doc    `form:"doc" json:"doc" bson:"doc"`
	HotelName               string `form:"hotel_name" json:"hotel_name" bson:"hotel_name"`
	CompanyName             string `form:"company_name" json:"company_name" bson:"company_name"`
	CompanyAddress          string `form:"company_address" json:"company_address" bson:"company_address"`
	ContractDate            string `form:"contract_date" json:"contract_date" bson:"contract_date"`
	HotelAuthorizedPerson   Person `form:"hotel_authorized_person" json:"hotel_authorized_person" bson:"hotel_authorized_person"`
	HotelWitness            Person `form:"hotel_witness" json:"hotel_witness" bson:"hotel_witness"`
	HandigoAuthorizedPerson Person `form:"handigo_authorized_person" json:"handigo_authorized_person" bson:"handigo_authorized_person"`
	HandigoWitness          Person `form:"handigo_witness" json:"handigo_witness" bson:"handigo_witness"`
}

/*
Status
0 = admin create contract but not sent to hotel user (draft)
-------- after send login data to hotel user
1 = select language step (sent)
2 = contract form step (sent)
3 = sign contract step (sent)
-------- after hotel user sign contract
4 = complete step (pending for approve)
5 = admin approved (approved)
*/

type Person struct {
	Name      string `form:"name" json:"name" bson:"name"`
	Position  string `form:"position" json:"position" bson:"position"`
	Signature string `form:"signature" json:"signature" bson:"signature"`
}

type Doc struct {
	FileId string `form:"file_id" json:"file_id" bson:"file_id"`
}

type Result struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
}

type PageRequest struct {
	SearchText  string `form:"search_text" json:"search_text" bson:"search_text"`
	Page        int    `form:"page" json:"page" bson:"page"`
	ItemPerPage int    `form:"item_per_page" json:"item_per_page" bson:"item_per_page"`
	ItemCount   int    `form:"item_count" json:"item_count" bson:"item_count"`
	// SortBy        string `form:"sort_by" json:"sort_by" bson:"sort_by"`
	// SortDirection string `form:"sort_direction" json:"sort_direction" bson:"sort_direction"`
}

type returnContractForList struct {
	Id           bson.ObjectId `json:"_id"`
	UserId       bson.ObjectId `json:"user_id"`
	EmailContact string        `json:"email_contact"`
	Status       int           `json:"status"`
	UpdateDate   int64         `json:"update_date"`
	HotelName    string        `json:"hotel_name"`
}

func returnContractList(contractList []Contract) []returnContractForList {
	cl := []returnContractForList{}
	for _, v := range contractList {
		con := returnContractForList{
			v.Id,
			v.UserId,
			v.EmailContact,
			v.Status,
			v.UpdateDate,
			v.HotelName,
		}
		cl = append(cl, con)
	}
	return cl
}

func setPageRequestDefaultValue(pageRequest PageRequest) PageRequest {
	if pageRequest.Page < 0 {
		pageRequest.Page = 1
	}

	if pageRequest.ItemPerPage < 1 {
		pageRequest.ItemPerPage = 10
	}

	return pageRequest
}

func validateUpdate(con Contract) error {
	if con.Id == "" {
		return errors.New("_id is mandatory")
	}
	return nil
}
