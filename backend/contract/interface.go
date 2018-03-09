package contract

import (
	"encoding/json"
	"net/http"
	"strconv"

	"fmt"

	"../config"
	"../util"
	"github.com/gin-gonic/gin"
)

func Save(c *gin.Context) {
	con := Contract{}

	data := c.PostForm("data")
	err := json.Unmarshal([]byte(data), &con)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":   http.StatusBadRequest,
			"message":  err.Error(),
			"contract": con,
		})
		return
	}

	form, _ := c.MultipartForm()
	files := form.File["upload[]"]

	for _, file := range files {
		// log.Println(file.Filename)
		// TODO Do validation here file extension, file size
		// Upload the file to specific dst.
		c.SaveUploadedFile(file, config.ContractAttachmentUploadPath+file.Filename)
	}

	result, con := insert(con)

	c.JSON(result.Status, gin.H{
		"status":   result.Status,
		"message":  result.Message,
		"contract": con,
	})
}

func View(c *gin.Context) {
	_id := c.Query("_id")
	if _id != "" {
		result, con := findId(_id)
		c.JSON(result.Status, gin.H{
			"status":   result.Status,
			"message":  result.Message,
			"contract": con,
		})
	} else {
		result, con := findByUserId(c.Query("user_id"))
		c.JSON(result.Status, gin.H{
			"status":   result.Status,
			"message":  result.Message,
			"contract": con,
		})
	}
}

func GetContractList(c *gin.Context) {
	pageRequest := PageRequest{}
	if err := c.Bind(&pageRequest); err == nil {

		result, contractList, pageRequest := getPage(pageRequest)
		c.JSON(result.Status, gin.H{
			"status":       result.Status,
			"message":      result.Message,
			"contractList": contractList,
			"pageRequest":  pageRequest,
		})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
}

func Edit(c *gin.Context) {
	con := Contract{}

	data := c.PostForm("data")
	err := json.Unmarshal([]byte(data), &con)
	fmt.Println(data)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":   http.StatusBadRequest,
			"message":  err.Error(),
			"contract": con,
		})
		return
	}

	form, _ := c.MultipartForm()
	files := form.File["upload[]"]

	for _, file := range files {
		// log.Println(file.Filename)
		// TODO Do validation here file extension, file size
		// Upload the file to specific dst.
		filename := strconv.FormatInt(util.CurrentTimeMilliSec(), 10) + "_" + file.Filename
		if err := c.SaveUploadedFile(file, config.ContractAttachmentUploadPath+filename); err == nil {
			con.Attachment = append(con.Attachment, Attachment{Filename: filename, IsActive: true})
		}
	}

	result, con := update(con)

	c.JSON(result.Status, gin.H{
		"status":   result.Status,
		"message":  result.Message,
		"contract": con,
	})
}

func GetAttachment(c *gin.Context) {
	filename := c.Param("filename")
	filepath := config.ContractAttachmentUploadPath + filename
	c.Header("Content-Description", "File Transfer")
	c.Header("Content-Transfer-Encoding", "binary")
	c.Header("Content-Disposition", "inline; filename="+filename)
	// c.Header("Content-Type", "application/octet-stream")
	c.File(filepath)
}

func Del(c *gin.Context) {
	c.JSON(200, gin.H{
		"status":  200,
		"message": "update complete",
	})
}

// func UpdateLanguage (c *gin.Context) {
// 	var request UpdateLanguageRequest{}
// }
