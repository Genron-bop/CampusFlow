Postgres + Prisma local setup

1) Requirements
- Docker and docker-compose (or `docker compose`) installed locally
- Node 18+ and npm installed

2) Prepare env
 - Copy `.env.example` to `.env` and edit if needed (DATABASE_URL)

3) Start Postgres and Adminer
```bash
# start DB (runs Postgres and Adminer)
npm run db:up
# or: docker compose up -d
```

4) Run Prisma migration and generate the client
```bash
npm run prisma:migrate
npm run prisma:generate
```

5) Seed the DB with parsed CSV data
```bash
# append (default)
npm run db:seed
# or replace (truncate then insert)
npm run db:seed -- replace
```

6) Run API server
```bash
npm run start:api
# then open http://localhost:4000/api/measurements
```

7) Inspect data
- Adminer UI at http://localhost:8080 (login: postgres / postgres / database campusflow)

Notes
- If you need to re-run migrations from scratch, stop the DB and remove volume `db_data` then start again.
- The seed script reads `data/parsed/*.json` which was created by `scripts/parse_csvs.js`.
