package user

import (
	"encoding/json"
	"net/http"

	"../mongodb"
	"../util"
	"gopkg.in/mgo.v2/bson"
)

func find(username string) (Result, []User) {
	colUser := mongodb.ColUser()

	var data []User = []User{}
	var query interface{}

	if username == "" {
		query = bson.M{"is_active": true}
	} else {
		query = bson.M{"username": username, "is_active": true}
	}

	err := colUser.Find(query).All(&data)

	if err != nil {
		return Result{http.StatusBadRequest, err.Error()}, data
	}

	return Result{http.StatusOK, "complete"}, data
}

func login(user User) (Result, User) {
	if err := validateInsert(user); err != nil {
		return Result{http.StatusBadRequest, err.Error()}, User{}
	}

	colUser := mongodb.ColUser()

	data := User{}
	query := bson.M{"username": user.Username, "password": user.Password, "is_active": true}
	err := colUser.Find(query).One(&data)

	data = retUser(data)

	if err != nil {
		return Result{http.StatusBadRequest, err.Error()}, data
	}

	data.LastLogin = util.CurrentTimeMilliSec()

	err = colUser.Update(query, bson.M{"$set": bson.M{"last_login": data.LastLogin}})
	if err != nil {
		return Result{http.StatusBadRequest, err.Error()}, data
	}

	return Result{http.StatusOK, "complete"}, data
}

func checkUserExist(user User) (bool, string) {
	colUser := mongodb.ColUser()

	var query interface{}

	oldUser := User{}
	errorText := ""
	if user.RoleId == 1 || user.RoleId == 2 {
		query = bson.M{"email": user.Email, "is_active": true}
		errorText = "This email was already used."
	} else {
		query = bson.M{"username": user.Username, "is_active": true}
		errorText = "This username was already used."
	}
	err := colUser.Find(query).One(&oldUser)

	if err == nil {
		return true, errorText
	} else {
		return false, ""
	}
}

func insert(user User) (Result, User) {
	if err := validateInsert(user); err != nil {
		return Result{http.StatusBadRequest, err.Error()}, User{}
	}

	colUser := mongodb.ColUser()

	isExist, errorText := checkUserExist(user)
	if isExist {
		return Result{http.StatusBadRequest, errorText}, User{}
	}

	user.Id = bson.NewObjectId()
	timeMilli := util.CurrentTimeMilliSec()
	user.CreateDate = timeMilli
	user.UpdateDate = timeMilli
	user.IsActive = true

	err := colUser.Insert(user)
	if err != nil {
		return Result{http.StatusBadRequest, err.Error()}, User{}
	}

	return Result{http.StatusOK, "complete"}, user
}

func createHotelContract(user User) {
	con := Contract{}
	con.UserId = user.Id
	con.EmailContact = user.Email
	con.Status = 1
	con.IsActive = true
	insertContract(con)
}

func insertContract(con Contract) (Result, Contract) {
	con.Id = bson.NewObjectId()
	con.CreateDate = util.CurrentTimeMilliSec()
	con.IsActive = true

	colContract := mongodb.ColContract()

	err := colContract.Insert(con)
	if err != nil {
		return Result{http.StatusBadRequest, err.Error()}, Contract{}
	}

	return Result{http.StatusOK, "complete"}, con
}

func update(user User) (Result, User) {
	/**
	  -
		- validate user struct update action
		-
	**/
	if err := validateUpdate(user); err != nil {
		return Result{http.StatusBadRequest, err.Error()}, User{}
	}

	colUser := mongodb.ColUser()

	/**
	  -
		- get current time milli sec
		-
	**/
	user.UpdateDate = util.CurrentTimeMilliSec()

	/**
	  -
		- marshal json for preparation validate update dynamic fields
		-
	**/
	bytUser, errMarshal := json.Marshal(user)
	if errMarshal != nil {
		return Result{http.StatusBadRequest, errMarshal.Error()}, User{}
	}

	/**
	  -
		- unmarshal json to map object
		-
	**/
	var mapUser map[string]interface{}
	if errMarshal = json.Unmarshal(bytUser, &mapUser); errMarshal != nil {
		return Result{http.StatusBadRequest, errMarshal.Error()}, User{}
	}

	/**
	  -
		- no need _id for update map
		-
	**/
	delete(mapUser, "_id")

	/**
	  -
		- filter out empty map object
		-
	**/
	for key := range mapUser {
		if mapUser[key] == "" {
			delete(mapUser, key)
		}
	}

	err := colUser.Update(bson.M{"_id": user.Id}, bson.M{"$set": mapUser})
	if err != nil {
		return Result{http.StatusBadRequest, err.Error()}, User{}
	}

	data := User{}
	err = colUser.Find(bson.M{"_id": user.Id}).One(&data)
	if err != nil {
		return Result{http.StatusBadRequest, err.Error()}, User{}
	}

	data = retUser(data)

	return Result{http.StatusOK, "complete"}, data
}

func remove(id string) (Result, string) {
	colUser := mongodb.ColUser()
	deleteUpdate := bson.M{"delete_date": util.CurrentTimeMilliSec(), "is_active": false}
	err := colUser.Update(bson.M{"_id": id}, bson.M{"$set": deleteUpdate})

	if err != nil {
		return Result{http.StatusBadRequest, err.Error()}, ""
	}

	return Result{http.StatusOK, "complete"}, id
}
