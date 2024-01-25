import type { ApplicationService } from '@adonisjs/core/types'
import CheckForMaintenanceMode from '../src/Middleware/CheckForMaintenanceMode.js'

export default class MaintenanceProvider
{
    constructor(protected app: ApplicationService) {}

    public register()
    {
        this.app.container.singleton(CheckForMaintenanceMode, () => {
            return new CheckForMaintenanceMode(this.app.tmpPath('maintenance.json'));
        });
    }
}