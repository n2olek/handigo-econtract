package mail

import (
	"net/http"

	"../contract"
	"../mongodb"
	"gopkg.in/mgo.v2/bson"
)

func find() *Result {
	//TODO Find data
	return &Result{http.StatusOK, "complete"}
}

func findId(id string) (Result, contract.Contract) {
	colContract := mongodb.ColContract()

	data := contract.Contract{}

	err := colContract.FindId(bson.ObjectIdHex(id)).One(&data)
	if err != nil {
		return Result{http.StatusBadRequest, err.Error()}, data
	}

	return Result{http.StatusOK, "complete"}, data
}

func insert() *Result {
	//TODO Insert data
	return &Result{http.StatusOK, "complete"}
}

func update() *Result {
	//TODO Update data
	return &Result{http.StatusOK, "complete"}
}

func remove() *Result {
	//TODO Remove data
	return &Result{http.StatusOK, "complete"}
}
