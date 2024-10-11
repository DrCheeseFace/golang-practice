package configuration

import (
	"fmt"

	"github.com/a8m/envsubst"
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
	bytes, err := envsubst.ReadFile("./config.yaml")
	if err != nil {
		panic(err)
	}
	err = yaml.Unmarshal(bytes, &State)
    fmt.Println(State)
	if err != nil {
		panic(err)
	}
}
