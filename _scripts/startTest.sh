docker-compose -f docker-compose.yaml -f docker-compose.test.yaml up -d &&
docker exec -it api_test bash -c "npm install && npm test"
