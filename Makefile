run:
	docker-compose build
	docker-compose watch

test-backend:
	docker compose exec back-end npm run test:watch

coverage-test:
	docker compose exec back-end npm run test:coverage

logs:
	docker compose logs -f

insert-mocks:
	docker-compose exec back-end npx ts-node src/mocks/userMock.ts 
	docker-compose exec back-end npx ts-node src/mocks/placeMock.ts

graphql-codegen:
	cd web-app/ && npm run graphql-codegen
	
tailwind:
	cd web-app/ && npx tailwindcss -i ./src/styles/input.css -o ./src/styles/output.css --watch