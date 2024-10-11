package configuration

import (
	"github.com/a8m/envsubst"
	"github.com/joho/godotenv"
	"gopkg.in/yaml.v3"
)

var State GeneralConfig

type (
	GeneralConfig struct {
		DbConfig DbConfig `yaml:"db"`
	}

	DbConfig struct {
		Name     string `yaml:"name"`
		UserName string `yaml:"username"`
		Password string `yaml:"password"`
	}
)

func init() {
	err := godotenv.Load()
	if err != nil {
		panic(err)
	}
	bytes, err := envsubst.ReadFile("./config.yaml")
	if err != nil {
		panic(err)
	}

	err = yaml.Unmarshal(bytes, &State)
	if err != nil {
		panic(err)
	}
}
