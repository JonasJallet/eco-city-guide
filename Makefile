run:
	docker-compose build
	docker-compose watch	
	
tailwind:
	cd web-app/ && npx tailwindcss -i ./src/styles/input.css -o ./src/styles/output.css --watch
