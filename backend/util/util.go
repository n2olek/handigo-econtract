package util

import "time"

func CurrentTimeMilliSec() int64 {
	return time.Now().UnixNano() / int64(time.Millisecond)
}
