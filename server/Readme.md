# How to setup?

1. Download qr_attendance_control.sql dump from Ranis
2. mysql -u root -p qr_old < qr_attendance_control.sql
3. Enter password
4. change db user and password in scripts/db/import-db.js and scripts/db/export-db.js
5. change secret in scripts/db/import-db.js, because access denied to env from not scr
6. node scripts/db/import-db.js
7. CREATE qr_new DB
8. RUN `./scripts/apply-migrations.sh `
9. node scripts/db/export-db.js
