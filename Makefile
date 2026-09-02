start-dev:
	cd backend && docker compose -f docker-compose.local.yml up -d && cd ..\
	&& cd workers && docker compose -f docker-compose.local.yml up -d && cd ..\
	&& cd frontend && npm run dev
stop-dev: 
	cd backend && docker compose -f docker-compose.local.yml down && cd ..\
	&& cd workers && docker compose -f docker-compose.local.yml down