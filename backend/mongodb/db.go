package mongodb

import (
	"log"
	"time"

	"../config"
	"gopkg.in/mgo.v2"
)

var mgoSession *mgo.Session

func Init() {
	mongoDBDialInfo := &mgo.DialInfo{
		Addrs:    []string{config.DatabaseURL},
		Timeout:  60 * time.Second,
		Database: config.DatabaseName,
		// Username: config.DatabaseUsername,
		// Password: config.DatabasePassword,
	}

	session, err := mgo.DialWithInfo(mongoDBDialInfo)
	if err != nil {
		log.Fatal("Cannot Dial Mongo: ", err)
	}

	// defer session.Close()
	session.SetMode(mgo.Monotonic, true)

	mgoSession = session
}

func ColContract() *mgo.Collection {
	return mgoSession.DB(config.DatabaseName).C("contract")
}

func ColUser() *mgo.Collection {
	return mgoSession.DB(config.DatabaseName).C("user")
}