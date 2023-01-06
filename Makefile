start-prod:
	cd workers && docker compose up -d && cd ..\
	&& cd backend && docker compose up -d && cd ..\
	&& cd frontend && docker compose up -d
stop-prod:
	cd workers && docker compose down && cd ..\
	&& cd backend && docker compose down && cd ..\
	&& cd frontend && docker compose down
start-dev: 
	cd backend && docker compose -f docker-compose.local.yml up -d && cd ..\
	&& cd workers && docker compose -f docker-compose.local.yml up -d && cd ..\
	&& cd frontend && npm run dev
stop-dev: 
	cd backend && docker compose -f docker-compose.local.yml down && cd ..\
	&& cd workers && docker compose -f docker-compose.local.yml down