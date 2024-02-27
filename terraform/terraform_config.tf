terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
    }
  }
}

provider "google" {
  project                 = "emulator-project"
  access_token            = "dummy"
  spanner_custom_endpoint = "http://localhost:9020/v1/"
  storage_custom_endpoint = "https://localhost:4443/storage/v1/"
}
