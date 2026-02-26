import type { ApplicationService } from '@adonisjs/core/types'
import CheckForMaintenanceMode from '../src/maintenance_middleware.ts'

export default class MaintenanceProvider
{
    constructor(protected app: ApplicationService) {}

    async register()
    {
        this.app.container.bind(CheckForMaintenanceMode, async () => {
            return new CheckForMaintenanceMode(this.app.tmpPath('maintenance.json'));
        });
    }
}