resource "google_spanner_instance" "local" {
  project      = "emulator-project"
  name         = "emulator-instance"
  config       = "emulator-config"
  display_name = "Spanner for Local"
  num_nodes    = 1
}

resource "google_spanner_database" "local" {
  instance            = google_spanner_instance.local.name
  name                = "localdb"
  ddl                 = [file("../sql/spanner.ddl")]
  deletion_protection = false
}
