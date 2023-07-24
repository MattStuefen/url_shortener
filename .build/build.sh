#!/bin/bash
version=$(awk -F'"' '/"version":\s".+"/{ print $4; exit; }' ./server/package.json)
docker build -f .build/Dockerfile -t url-shortener:${version} . || exit 1

mkdir -p .build/.env
env=${1:-dev}
port=${2:-8080}
echo "SQL_HOST=$3" > .build/.env/${env}.env
echo "SQL_USER=$4" >> .build/.env/${env}.env
echo "SQL_PASS=$5" >> .build/.env/${env}.env
echo "SQL_DB=$6" >> .build/.env/${env}.env
echo "SECRET=$7" >> .build/.env/${env}.env

docker rm -f url-shortener-${env}
docker run --detach --restart always --env-file .build/.env/${env}.env -p ${port}:3000 --name url-shortener-${env} url-shortener:${version}
docker system prune -f