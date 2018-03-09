package main

import (
	"./contract"
	"./mail"
	"./mongodb"
	"./user"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	mongodb.Init()

	router := gin.Default()
	// router.Use(cors.New(cors.Config{
	// 	AllowOrigins:     []string{"http://localhost:3210"},
	// 	AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
	// 	AllowHeaders:     []string{"Origin, X-Requested-With, Content-Type, Accept"},
	// 	ExposeHeaders:    []string{"Content-Length"},
	// 	AllowCredentials: true,
	// 	AllowOriginFunc: func(origin string) bool {
	// 		return origin == "http://localhost:3210"
	// 	},
	// 	MaxAge: 12 * time.Hour,
	// }))

	router.Use(cors.Default())

	router.PUT("/econtract/user/save", user.Save)
	router.POST("/econtract/user/login", user.Login)
	router.POST("/econtract/user/edit", user.Edit)
	// router.DELETE("/econtract/user/delete", user.Del)
	router.PUT("/econtract/user/createAdminUser", user.CreateAdminUser)
	router.PUT("/econtract/user/createHotelUser", user.CreateHotelUser)

	router.PUT("/econtract/contract/save", contract.Save)
	router.GET("/econtract/contract/view", contract.View)
	router.POST("/econtract/contract/edit", contract.Edit)
	router.DELETE("/econtract/contract/delete", contract.Del)
	router.GET("/econtract/contract/getContractList", contract.GetContractList)

	router.GET("/econtract/contract/attachment/:filename", contract.GetAttachment)

	router.POST("/econtract/mail/send", mail.Send)
	// router.PUT("/somePut", putting)
	// router.DELETE("/someDelete", deleting)

	router.Run(":8765") // listen and serve on 0.0.0.0:8080
}
