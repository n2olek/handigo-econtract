package contract

import (
	"errors"

	"gopkg.in/mgo.v2/bson"
)

type Contract struct {
	Id           bson.ObjectId `form:"_id" json:"_id" bson:"_id,omitempty"`
	UserId       bson.ObjectId `form:"user_id,omitempty" json:"user_id,omitempty" bson:"user_id"`
	SaleId       string        `form:"sale_id,omitempty" json:"sale_id,omitempty" bson:"sale_id"`
	Language     string        `form:"language,omitempty" json:"language,omitempty" bson:"language"`
	EmailContact string        `form:"email_contact,omitempty" json:"email_contact,omitempty" bson:"email_contact"`
	Status       int           `form:"status,omitempty" json:"status,omitempty" bson:"status"`
	CreateDate   int64         `form:"create_date,omitempty" json:"create_date,omitempty" bson:"create_date"`
	UpdateDate   int64         `form:"update_date,omitempty" json:"update_date,omitempty" bson:"update_date"`
	DeleteDate   int64         `form:"delete_date,omitempty" json:"delete_date,omitempty" bson:"delete_date"`
	IsActive     bool          `form:"is_active,omitempty" json:"is_active,omitempty" bson:"is_active"`
	Attachment   []Attachment  `form:"attachment,omitempty" json:"attachment,omitempty" bson:"attachment"`

	Doc                     Doc    `form:"doc,omitempty" json:"doc,omitempty" bson:"doc"`
	HotelName               string `form:"hotel_name,omitempty" json:"hotel_name,omitempty" bson:"hotel_name"`
	CompanyName             string `form:"company_name,omitempty" json:"company_name,omitempty" bson:"company_name"`
	CompanyAddress          string `form:"company_address,omitempty" json:"company_address,omitempty" bson:"company_address"`
	ContractDate            string `form:"contract_date,omitempty" json:"contract_date,omitempty" bson:"contract_date"`
	HotelAuthorizedPerson   Person `form:"hotel_authorized_person,omitempty" json:"hotel_authorized_person,omitempty" bson:"hotel_authorized_person"`
	HotelWitness            Person `form:"hotel_witness,omitempty" json:"hotel_witness,omitempty" bson:"hotel_witness"`
	HandigoAuthorizedPerson Person `form:"handigo_authorized_person,omitempty" json:"handigo_authorized_person,omitempty" bson:"handigo_authorized_person"`
	HandigoWitness          Person `form:"handigo_witness,omitempty" json:"handigo_witness,omitempty" bson:"handigo_witness"`
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
	Name      string `form:"name,omitempty" json:"name,omitempty" bson:"name"`
	Position  string `form:"position,omitempty" json:"position,omitempty" bson:"position"`
	Signature string `form:"signature,omitempty" json:"signature,omitempty" bson:"signature"`
}

type Doc struct {
	FileId string `form:"file_id,omitempty" json:"file_id,omitempty" bson:"file_id"`
}

type Attachment struct {
	Filename string `form:"filename" json:"filename" bson:"filename"`
	IsActive bool   `form:"is_active" json:"is_active" bson:"is_active"`
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

type UpdateLanguageRequest struct {
	Id       string `form:"id" json:"id" bson:"id"`
	Language string `form:"language" json:"language" bson:"language"`
}
