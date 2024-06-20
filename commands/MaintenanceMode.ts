import { BaseCommand, flags } from '@adonisjs/core/ace'
import { CommandOptions } from '@adonisjs/core/types/ace'
import { writeFileSync, existsSync, unlinkSync, mkdirSync } from 'fs'

export default class MaintenanceMode extends BaseCommand {
    /**
     * Command name is used to run the command
     */
    public static commandName = 'maintenance';

    /**
     * Command description is displayed in the "help" output
     */
    public static description = 'Toggle the application maintenance mode';

    static options: CommandOptions = {
        startApp: false,
    }

    @flags.string({ description: 'Secret key to bypass maintenance mode' })
    declare secret: string;

    @flags.string({ description: 'Custom message for maintenance mode' })
    declare message: string;

    @flags.array({ description: 'IP to whitelist' })
    declare allow_ip: string[];

    public async run()
    {
        if (!existsSync(this.app.tmpPath()))
            mkdirSync(this.app.tmpPath(), { recursive: true });

        if (this.isMaintenanceEnabled())
            this.disableMaintenanceMode();
        else
            this.enableMaintenanceMode();
    }

    private getMaintenanceFilePath()
    {
        return this.app.tmpPath('maintenance.json');
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
                time: new Date(),
                secret: this.secret,
                message: this.message || 'The site is under maintenance.',
                allowedIps: this.allow_ip || [],
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
