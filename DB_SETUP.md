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

Note: To edit records from the app you must run the API server (`npm run start:api`) and have the DB running — the frontend dev server (Vite) will talk to the API at http://localhost:4000.

7) Inspect data
- Adminer UI at http://localhost:8080 (login: postgres / postgres / database campusflow)

CSV Import / Export
- The app supports importing CSV files from the Database page: click "Import CSV" and pick a CSV with headers (id optional). The client will POST the file contents to the API and insert rows into the DB.
- To download a CSV of current measurements from the server use the "Download CSV (server)" button (calls `/api/measurements/export`).
- To download a client-side CSV of the currently displayed rows use "Export CSV (client)".
- To have the server regenerate and save the CSV to disk use the "Save CSV to server" button (calls `/api/measurements/export-to-csv`) — the file is written to `data/exports/measurements.csv`.

Notes
- If you need to re-run migrations from scratch, stop the DB and remove volume `db_data` then start again.
- The seed script reads `data/parsed/*.json` which was created by `scripts/parse_csvs.js`.
