// GENERATED BY THE COMMAND ABOVE; DO NOT EDIT
// This file was generated by swaggo/swag at
// 2018-03-02 18:09:12.1313761 +0700 +07 m=+0.099000301

package docs

import (
	"github.com/swaggo/swag"
)

var doc = `{
    "swagger": "2.0",
    "info": {
        "description": "Swagger Example API",
        "title": "Swagger Example API",
        "contact": {},
        "license": {},
        "version": "1.0"
    },
    "host": "localhost:8765",
    "basePath": "/econtract",
    "paths": {
        "/contract/getContractList": {
            "get": {
                "description": "test",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "summary": "get list of all contract",
                "operationId": "GetContractList"
            }
        }
    }
}`

type s struct{}

func (s *s) ReadDoc() string {
	return doc
}
func init() {
	swag.Register(swag.Name, &s{})
}
