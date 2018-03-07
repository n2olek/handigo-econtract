package user

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func Login(c *gin.Context) {
	var user User
	if err := c.ShouldBindJSON(&user); err == nil {

		result, user := login(user)

		c.JSON(result.Status, gin.H{
			"status":  result.Status,
			"message": result.Message,
			"user":    user,
		})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
}

func Save(c *gin.Context) {
	var user User
	if err := c.ShouldBindJSON(&user); err == nil {

		result, user := insert(user)

		c.JSON(result.Status, gin.H{
			"status":  result.Status,
			"message": result.Message,
			"user":    user,
		})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
}

func Edit(c *gin.Context) {
	var user User
	if err := c.ShouldBindJSON(&user); err == nil {

		result, user := update(user)

		c.JSON(result.Status, gin.H{
			"status":  result.Status,
			"message": result.Message,
			"user":    user,
		})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
}

func CreateAdminUser(c *gin.Context) {
	var user User
	if err := c.ShouldBindJSON(&user); err == nil {

		user.RoleId = 2

		result, user := insert(user)

		c.JSON(result.Status, gin.H{
			"status":  result.Status,
			"message": result.Message,
			"user":    user,
		})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
}

func CreateHotelUser(c *gin.Context) {
	var user User
	if err := c.ShouldBindJSON(&user); err == nil {

		user.RoleId = 3

		result, user := insert(user)

		createHotelContract(user)

		c.JSON(result.Status, gin.H{
			"status":  result.Status,
			"message": result.Message,
			"user":    user,
		})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
}

// func Del(c *gin.Context) {
// 	var data map[string]interface{}
// 	if err := c.Bind(&data); err == nil {
//
// 		c.JSON(200, gin.H{
// 			"status":  200,
// 			"message": data.id,
// 		})
// 	} else {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 	}
// }
