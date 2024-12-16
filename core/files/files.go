package files

import (
	"errors"
	"io/fs"
	"os"
	"path/filepath"
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
	err := os.WriteFile(path, content, fs.ModePerm)
	return err
}

func DoesFileExist(path string) bool {
	_, err := os.Stat(path)
	return errors.Is(err, fs.ErrExist)
}

func DoesFileNotExist(path string) bool {
	_, err := os.Stat(path)
	return errors.Is(err, fs.ErrNotExist)
}

func ReadContentFromFile(path string) ([]byte, error) {
	notExist := DoesFileNotExist(path)
	if notExist {
		return []byte{}, fs.ErrNotExist
	}
	return os.ReadFile(path)
}

func GetHomeDirectory() string {
	homeDir, err := os.UserHomeDir()
	if err != nil {
		return ""
	}
	return filepath.Join(homeDir, "Breeze")
}

func GetFullPath(paths ...string) string {
	return filepath.Join(GetHomeDirectory(), filepath.Join(paths...))
}
