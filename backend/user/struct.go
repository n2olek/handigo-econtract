package user

import (
	"errors"

	"gopkg.in/mgo.v2/bson"
)

type User struct {
	Id            bson.ObjectId `form:"_id" json:"_id" bson:"_id,omitempty"`
	Username      string        `form:"username" json:"username" bson:"username"`
	Password      string        `form:"password" json:"password,omitempty" bson:"password"`
	Email         string        `form:"email" json:"email" bson:"email"`
	RoleId        int           `form:"role_id" json:"role_id" bson:"role_id"`
	Name          string        `form:"name" json:"name" bson:"name"`
	SignaturePath string        `form:"signature_path" json:"signature_path" bson:"signature_path"`
	UpdateDate    int64         `form:"update_date" json:"update_date,omitempty" bson:"update_date"`
	CreateDate    int64         `form:"create_date" json:"create_date,omitempty" bson:"create_date"`
	LastLogin     int64         `form:"last_login" json:"last_login,omitempty" bson:"last_login"`
	DeleteDate    int64         `form:"delete_date" json:"delete_date" bson:"delete_date"`
	IsActive      bool          `form:"is_active" json:"is_active" bson:"is_active"`
}

/*
RoleId
1 = superadmin
2 = admin(sale)
3 = hotel
*/

type Result struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
}

func validateInsert(user User) error {
	if user.Username == "" || user.Password == "" {
		return errors.New("username and password is mandatory")
	}
	return nil
}

func validateUpdate(user User) error {
	if user.Id == "" {
		return errors.New("_id is mandatory")
	}
	return nil
}

func retUser(user User) User {
	return User{
		user.Id,
		user.Username,
		"",
		user.Email,
		user.RoleId,
		user.Name,
		user.SignaturePath,
		user.UpdateDate,
		user.CreateDate,
		user.LastLogin,
		user.DeleteDate,
		user.IsActive}
}

/*
	contract struct
	copy from contract package
*/

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
	Attachment   []string      `form:"attachment" json:"attachment" bson:"attachment"`

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

type Person struct {
	Name      string `form:"name" json:"name" bson:"name"`
	Position  string `form:"position" json:"position" bson:"position"`
	Signature string `form:"signature" json:"signature" bson:"signature"`
}

type Doc struct {
	FileId string `form:"file_id" json:"file_id" bson:"file_id"`
}
