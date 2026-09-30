#!/usr/bin/env bash
set -euo pipefail

# CONFIG: fill these in
NEON_DATABASE_URL="postgres://user:pass@neon-host/dbname"
AURORA_HOST="aurora-writer.cluster-xxxxxxxx.us-east-1.rds.amazonaws.com"
AURORA_PORT="3306"
AURORA_USER="dbadmin"
AURORA_DB="game"

# 1) Export from Neon (schema + data)
echo "Exporting from Neon..."
pg_dump --no-owner --no-acl "$NEON_DATABASE_URL" > /tmp/neon_dump.sql

# 2) OPTIONAL: transform schema if needed (Postgres → MySQL)
# You may need a manual step or a tool here.
# For now, assume you have prepared /tmp/neon_dump_mysql.sql
# that is compatible with MySQL.
# Example placeholder:
cp /tmp/neon_dump.sql /tmp/neon_dump_mysql.sql

# 3) Import into Aurora MySQL
echo "Importing into Aurora..."
mysql -h "$AURORA_HOST" -P "$AURORA_PORT" -u "$AURORA_USER" -p "$AURORA_DB" < /tmp/neon_dump_mysql.sql

echo "Migration complete. Validate data before cutover."
