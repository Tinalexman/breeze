package files

import (
	"io/fs"
	"os"
)

func CreateNewDirectory(path string) error {
	err := os.MkdirAll(path, fs.ModePerm)
	return err
}

func CreateNewFile(path string) error {
	_, err := os.Create(path)
	return err
}

func WriteContentToFile(path string, content []byte) error {
	err := os.WriteFile(path, content, fs.ModeAppend)
	return err
}

func ReadContentFromFile(path string) ([]byte, error) {
	return os.ReadFile(path)
}
