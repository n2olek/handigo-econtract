package contract

import (
	"encoding/json"
	"net/http"

	"../mongodb"
	"../util"
	"gopkg.in/mgo.v2/bson"
)

func findId(id string) (Result, Contract) {
	colContract := mongodb.ColContract()

	data := Contract{}

	err := colContract.FindId(bson.ObjectIdHex(id)).One(&data)
	if err != nil {
		return Result{http.StatusBadRequest, err.Error()}, data
	}

	return Result{http.StatusOK, "complete"}, data
}

func findByUserId(userId string) (Result, Contract) {
	colContract := mongodb.ColContract()

	var data Contract
	query := bson.M{"user_id": bson.ObjectIdHex(userId), "is_active": true}

	err := colContract.Find(query).One(&data)

	if err != nil {
		return Result{http.StatusBadRequest, err.Error()}, data
	}

	return Result{http.StatusOK, "complete"}, data
}

func insert(con Contract) (Result, Contract) {
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

func update(con Contract) (Result, Contract) {
	/**
	  -
		- validate user struct update action
		-
	**/
	if err := validateUpdate(con); err != nil {
		return Result{http.StatusBadRequest, err.Error()}, Contract{}
	}

	colContract := mongodb.ColContract()

	/**
	  -
		- get current time milli sec
		-
	**/
	con.UpdateDate = util.CurrentTimeMilliSec()

	/**
	  -
		- marshal json for preparation validate update dynamic fields
		-
	**/
	bytContract, errMarshal := json.Marshal(con)
	if errMarshal != nil {
		return Result{http.StatusBadRequest, errMarshal.Error()}, Contract{}
	}

	/**
	  -
		- unmarshal json to map object
		-
	**/
	var mapContract map[string]interface{}
	if errMarshal = json.Unmarshal(bytContract, &mapContract); errMarshal != nil {
		return Result{http.StatusBadRequest, errMarshal.Error()}, Contract{}
	}

	/**
	  -
		- no need for update map
		-
	**/
	delete(mapContract, "_id")
	delete(mapContract, "hotel_id")
	delete(mapContract, "create_date")

	/**
	  -
		- filter out empty map object
		-
	**/
	// for key := range mapContract {
	// 	if mapContract[key] == "" {
	// 		delete(mapContract, key)
	// 	}
	// }

	/**
	  -
		- get old contract data in database
		-
	**/
	oldCon := Contract{}
	err := colContract.Find(bson.M{"_id": con.Id}).One(&oldCon)
	if err != nil {
		return Result{http.StatusBadRequest, err.Error()}, Contract{}
	}

	/**
	  -
		- check field with child parameter
		-
	**/

	if _, ok := mapContract["doc"].(map[string]interface{})["file_id"]; !ok {
		delete(mapContract, "doc")
	}

	checkPersonObject(mapContract, "hotel_authorized_person")
	checkPersonObject(mapContract, "hotel_witness")
	checkPersonObject(mapContract, "handigo_authorized_person")
	checkPersonObject(mapContract, "handigo_witness")

	err = colContract.Update(bson.M{"_id": con.Id}, bson.M{"$set": mapContract})
	if err != nil {
		return Result{http.StatusBadRequest, err.Error()}, Contract{}
	}

	data := Contract{}
	err = colContract.Find(bson.M{"_id": con.Id}).One(&data)
	if err != nil {
		return Result{http.StatusBadRequest, err.Error()}, Contract{}
	}

	return Result{http.StatusOK, "complete"}, data
}

func checkPersonObject(mapContract map[string]interface{}, name string) {
	if val, ok := mapContract[name]; ok {
		if val2, ok2 := val.(map[string]interface{})["name"]; ok2 {
			mapContract[name+".name"] = val2
		}
		if val2, ok2 := val.(map[string]interface{})["position"]; ok2 {
			mapContract[name+".position"] = val2
		}
		if val2, ok2 := val.(map[string]interface{})["signature"]; ok2 {
			mapContract[name+".signature"] = val2
		}
		delete(mapContract, name)
	}
}

func remove(con Contract) (Result, Contract) {
	//TODO Remove data
	return Result{http.StatusOK, "complete"}, con
}

func getPage(pr PageRequest) (Result, []returnContractForList, PageRequest) {
	pageRequest := setPageRequestDefaultValue(pr)
	colContract := mongodb.ColContract()

	var contractList []Contract
	// todo: change list to return as pagination request
	err := colContract.Find(bson.M{}).All(&contractList)
	if err != nil {
		return Result{http.StatusBadRequest, err.Error()}, []returnContractForList{}, PageRequest{}
	}

	pageRequest.ItemCount = len(contractList)
	return Result{http.StatusOK, "complete"}, returnContractList(contractList), pageRequest
}
