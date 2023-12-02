import fs from 'fs';
import { Exception } from '@adonisjs/core/build/standalone';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Application from '@ioc:Adonis/Core/Application';

export class CheckForMaintenanceMode 
{
    public async handle({ request }: HttpContextContract, next: () => Promise<void>)
    {
        const path = Application.tmpPath('maintenance.json');

        if (fs.existsSync(path))
        {
            const maintenanceData = JSON.parse(fs.readFileSync(path, 'utf-8'));

            const secret = request.input('secret') || request.header('X-Maintenance-Secret');
            
            if (secret && secret === maintenanceData.secret)
            {
                await next();
                return;
            }

            throw new Exception(maintenanceData.message, 503);
        }

        await next();
    }
}
