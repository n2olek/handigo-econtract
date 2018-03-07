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
		c.SaveUploadedFile(file, config.ContractFileUploadLocationPath+file.Filename)
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

// @Summary get list of all contract
// @Description test
// @ID GetContractList
// @Accept json
// @Produce json
// @Router /contract/getContractList [get]
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
		c.SaveUploadedFile(file, config.ContractFileUploadLocationPath+file.Filename)
	}

	result, con := update(con)

	c.JSON(result.Status, gin.H{
		"status":   result.Status,
		"message":  result.Message,
		"contract": con,
	})
}

func TestUpload(c *gin.Context) {
	form, _ := c.MultipartForm()
	files := form.File["upload[]"]

	for _, file := range files {
		// log.Println(file.Filename)
		// TODO Do validation here file extension, file size
		// Upload the file to specific dst.
		filename := strconv.FormatInt(util.CurrentTimeMilliSec(), 10) + "_" + file.Filename
		if err := c.SaveUploadedFile(file, config.ContractFileUploadLocationPath+filename); err != nil {
			filename = ""
		}
	}

	c.JSON(200, gin.H{
		"status":  200,
		"message": "aaa",
	})
}

func Del(c *gin.Context) {
	c.JSON(200, gin.H{
		"status":  200,
		"message": "update complete",
	})
}
