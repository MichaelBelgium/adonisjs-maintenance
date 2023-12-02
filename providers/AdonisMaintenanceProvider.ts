import { ApplicationContract } from "@ioc:Adonis/Core/Application";

export default class AdonisMaintenanceProvider
{
    constructor(protected app: ApplicationContract)
    {

    }

    public register()
    {
        this.app.container.singleton('Adonis/Addons/MaintenanceMode', () => {
            const { CheckForMaintenanceMode } = require('../src/Middleware/CheckForMaintenanceMode')

            return new CheckForMaintenanceMode();
        });
    }
}