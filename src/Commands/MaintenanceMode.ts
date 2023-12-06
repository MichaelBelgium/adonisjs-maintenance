import { BaseCommand, flags } from '@adonisjs/core/build/standalone';
import { writeFileSync, existsSync, unlinkSync } from 'fs'
import { DateTime } from 'luxon';

export default class MaintenanceMode extends BaseCommand {
    /**
     * Command name is used to run the command
     */
    public static commandName = 'maintenance';

    /**
     * Command description is displayed in the "help" output
     */
    public static description = 'Toggle the application maintenance mode';

    public static settings = {
        loadApp: false,
        stayAlive: false,
    }

    @flags.string({ description: 'Secret key to bypass maintenance mode' })
    public secret: string;

    @flags.string({ description: 'Custom message for maintenance mode' })
    public message: string;

    public async run() 
    {
        if (this.isMaintenanceEnabled())
            this.disableMaintenanceMode();
        else
            this.enableMaintenanceMode();
    }

    private getMaintenanceFilePath() 
    {
        return this.application.tmpPath('maintenance.json');
    }

    private isMaintenanceEnabled()
    {
        return existsSync(this.getMaintenanceFilePath());
    }

    private enableMaintenanceMode()
    {
        writeFileSync(
            this.getMaintenanceFilePath(),
            JSON.stringify({ 
                time: DateTime.now(),
                secret: this.secret,
                message: this.message || 'The site is under maintenance.',
                allowedIps: []
            }), 
            'utf-8'
        );
        this.logger.success('Maintenance mode enabled');
    }
    
    private disableMaintenanceMode()
    {
        if (this.isMaintenanceEnabled()) 
        {
          unlinkSync(this.getMaintenanceFilePath())
        }
        this.logger.success('Maintenance mode disabled');
    }
}
