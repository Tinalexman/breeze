package util

import (
	"crypto/sha256"
	"encoding/hex"
)

func GetHash(key string) string {
	hash := sha256.Sum256([]byte(key))
	return hex.EncodeToString(hash[:])
}
