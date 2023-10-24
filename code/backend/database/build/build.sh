#!/bin/bash

DB_CONTAINER_NAME="lab_moedas"
DB_NAME="lab_moedas"
DB_USER="postgres"
DB_PASSWORD="password"
SQL_FILE="./build.sql"

docker exec -i $DB_CONTAINER_NAME psql -U $DB_USER -d $DB_NAME < "$SQL_FILE"
