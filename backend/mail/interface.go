package mail

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"../contract"

	"../config"
	"github.com/gin-gonic/gin"
	gomail "gopkg.in/gomail.v2"
)

// func Send(c *gin.Context) {
// 	//data := find()
// 	fmt.Println("good bye")
// 	//send("Hellooooooooo")
//
// 	c.JSON(200, gin.H{
// 		"status":  200,
// 		"message": "send mail complete",
// 		//"data":    data,
// 	})
// }

func Send(c *gin.Context) {
	var req MailRequest
	var con contract.Contract
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	result, con := findId(req.ContractId)

	templeteBody := readTempleteEmail(config.TempleteEmail[req.Template], con)
	mail := gomail.NewMessage()
	fullPath, _ := os.Getwd()
	mail.SetHeader("From", "noreply@handigo.com")
	// mail.SetHeader("To", "holcl.ploy@gmail.com")
	mail.SetHeader("To", con.EmailContact)
	mail.SetHeader("Subject", "test7")

	// hotelName := "testhotel"
	// city := "city 1234"

	// templeteBody = strings.Replace(templeteBody, "[city]", city, -1)
	mail.SetBody("text/html", templeteBody)
	mail.Embed(fullPath + "/config/images/logo.png")
	mail.Embed(fullPath + "/config/images/button-google-play.png")

	// d := gomail.NewDialer("mail.navigothailand.com", 25, "noreply@navigothailand.com", "NVGNoReply")
	d := gomail.NewDialer("smtp.gmail.com", 587, "handigo.noreply@gmail.com", "handigo123###")

	if err := d.DialAndSend(mail); err != nil {
		// fmt.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(result.Status, gin.H{
		"status":   result.Status,
		"message":  result.Message,
		"contract": con,
	})
}

func readTempleteEmail(templatePath string, con contract.Contract) string {
	fullPath, _ := os.Getwd()
	path := filepath.Join(fullPath, templatePath)
	templeteBody, err := ioutil.ReadFile(path)
	if err != nil {
		fmt.Println(err)
	}
	templeteBodyString := strings.Replace(string(templeteBody), "[Hotel name]", con.HotelName, -1)

	return templeteBodyString
}
