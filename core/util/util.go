package util

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"math/rand"
	"os"
	"strings"

	"github.com/sirupsen/logrus"
	easy "github.com/t-tomalak/logrus-easy-formatter"
)

func GetRandomHash() string {
	return GetHash(generateRandomString())
}

func generateRandomString() string {
	return fmt.Sprintf("%s%s%s%s%s",
		strings.ToUpper(string(rune(rand.Intn(26)+'A'))),
		strings.ToUpper(string(rune(rand.Intn(26)+'A'))),
		strings.ToUpper(string(rune(rand.Intn(26)+'A'))),
		strings.ToUpper(string(rune(rand.Intn(26)+'A'))),
		strings.ToUpper(string(rune(rand.Intn(26)+'A'))),
	)
}

func GetHash(key string) string {
	hash := sha256.Sum256([]byte(key))
	return hex.EncodeToString(hash[:])
}

func PrepareFieldForSearch(field string) string {
	return strings.Trim(strings.ToLower(field), " ")
}

func Logger() (log *logrus.Logger) {
	// logFilePath := setupLogFile()
	// f, err := os.OpenFile(logFilePath, os.O_WRONLY|os.O_CREATE|os.O_APPEND, 0644)
	// if err != nil {
	// 	fmt.Println("Failed to create logfile" + logFilePath)
	// 	panic(err)
	// }
	// defer f.Close()

	log = &logrus.Logger{
		// Out: io.MultiWriter(f, os.Stdout),
		Out:   os.Stdout,
		Level: logrus.DebugLevel,
		Formatter: &easy.Formatter{
			TimestampFormat: "2006-01-02 15:04:05",
			LogFormat:       "[%lvl%]: %time% - %msg%\n",
		},
	}

	return
}

// func setupLogFile() string {
// 	cmd := exec.Command("powershell", "/c", "pwd")
// 	out, _ := cmd.Output()

// 	// log.Println(string(out))
// 	pwd := filepath.Clean(readStringLineByLineToGetPwd(string(out)))

// 	// Setup logfolder
// 	logFolderPath := setupLogFolder(pwd)
// 	logFile := fmt.Sprintf("bbc_xtra_%v.txt", time.Now().UTC().Format("2006_01_02"))
// 	logfilePath := filepath.Clean(fmt.Sprintf("%v/%v", logFolderPath, logFile))

// 	return logfilePath
// }

// func setupLogFolder(currentPwd string) string {
// 	path := fmt.Sprintf("%v/logs", currentPwd)

// 	if _, err := os.Stat(path); errors.Is(err, os.ErrNotExist) {
// 		err := os.Mkdir(path, os.ModePerm)
// 		if err != nil {
// 			log.Printf("Unable to create logs folder at %v\n", path)
// 			log.Println(err)
// 		}
// 	}

// 	return path
// }

// func readStringLineByLineToGetPwd(stringToRead string) (pwdLine string) {
// 	scanner := bufio.NewScanner(strings.NewReader(stringToRead))

// 	if err := scanner.Err(); err != nil {
// 		log.Println("Error creating a new scanner for string input")
// 		log.Println(err)
// 	}

// 	for scanner.Scan() {
// 		currentLine := scanner.Text()
// 		// fmt.Println(currentLine)
// 		if strings.Contains(currentLine, "\\") {
// 			pwdLine = currentLine
// 			break
// 		}
// 	}

// 	return
// }

func Ternary(first, second interface{}, condition bool) interface{} {
	if condition {
		return first
	}
	return second
}
