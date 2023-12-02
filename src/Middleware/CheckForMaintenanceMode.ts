import fs from 'fs';
import { Exception } from '@adonisjs/core/build/standalone';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export class CheckForMaintenanceMode 
{
    constructor (private path: string) 
    {

    }

    public async handle({ request }: HttpContextContract, next: () => Promise<void>)
    {
        if (fs.existsSync(this.path))
        {
            const maintenanceData = JSON.parse(fs.readFileSync(this.path, 'utf-8'));

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
