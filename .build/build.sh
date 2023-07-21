#!/bin/bash
version=$(awk -F'"' '/"version":\s".+"/{ print $4; exit; }' ./server/package.json)
docker build -f .build/Dockerfile -t url-shortener:${version} . || exit 1

mkdir -p .build/.env
env=${1:-dev}
port=${2:-8080}
echo "SECRET=$3" >> .build/.env/${env}.env

docker rm -f url-shortener-${env}
docker run --detach --restart always --env-file .build/.env/${env}.env -p ${port}:3000 --name url-shortener-${env} url-shortener:${version}
docker system prune -f