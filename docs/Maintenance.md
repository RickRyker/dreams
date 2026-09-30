# Maintenance Documentation

The **Maintenance System** ensures game stability, processes background tasks, and manges periodic world updates.

## Maintenance Mode
- **State Machine**: Managed via   `WorldConfig.isMaintenaceMode`. When active, a middleware layer blocks non-admin access with a `403 MAINTENANCE` response.
- **Triggering**:
  - **Manual**: Admins can toggle maintenance mode via the `/admin/maintenance/toggle` endpoint.
  - **Scheduled**: The system automatically triggers a maintenance sequence based on the `maintenanceStart` time configured in the database (default: `03:00`).

## Maintenance Activities
1.  **Advance Warnings**: System-wide notifications are sent out 5, 2, and 1 minutes before maintenance begins.
2.  **Item Decay**: The `InventoryService` scans all items and applies degradation based on `decayRate`. Perishable items (Food) lost quality, and used tools/weapons may break if they reach their threshold.
3.  **Audit Offloading**: Local interaction logs in `logs/interaction_audit.log` are compressed and offloaded to S3 when they exceed `logSizeLimitBytes`.
4.  **Buffer Flushing**: All remaining actions in the Write-Ahead Log (WAL) buffers are forcibly flushed to the database to ensure data integrity.
5.  **Log Pruning**: Historical logs in the database older than the `logPruneDays` setting are purged.
6.  **Pet Assignment**: Players level 5+ who do not have (and never had) a pet are automatically assigned a default companion (if they haven't sacrificed one).
7.  **Ghost Cleanup**: Periodically revives and recalls players who have completed their ghost state duration.

##System Bypassing
- **Roles**: Users with the `ADMIN` role or specific permissions (`BYPASS_MAINTENANCE`) can still log in and interact with the game during this period to perform administrative tasks or verify fixes.

