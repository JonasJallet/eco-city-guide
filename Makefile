run:
	docker-compose build
	docker-compose watch

logs:
	docker compose logs -f

insert-mock:
	docker-compose exec back-end npx ts-node src/fixtures/placeMock.ts 
	
tailwind:
	cd web-app/ && npx tailwindcss -i ./src/styles/input.css -o ./src/styles/output.css --watch