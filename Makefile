start-prod:
	cd workers && docker compose up -d && cd ..\
	&& cd backend && docker compose up -d && cd ..\
	&& cd frontend && docker compose up -d
stop-prod:
	cd workers && docker compose down && cd ..\
	&& cd backend && docker compose down && cd ..\
	&& cd frontend && docker compose down