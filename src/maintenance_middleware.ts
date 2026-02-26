import fs from 'fs';
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { errors } from '@adonisjs/core'

export default class MaintenanceMiddleware
{
    constructor (private path: string) 
    {

    }

    async handle({ request }: HttpContext, next: NextFn)
    {
        if (fs.existsSync(this.path))
        {
            const maintenanceData = JSON.parse(fs.readFileSync(this.path, 'utf-8'));

            const secret = request.input('secret') || request.header('X-Maintenance-Secret');

            if (maintenanceData.allowedIps.includes(request.ip()) || (secret !== undefined && secret === maintenanceData.secret))
            {
                if (!maintenanceData.allowedIps.includes(request.ip()))
                {
                    maintenanceData.allowedIps.push(request.ip());
                    fs.writeFileSync(this.path, JSON.stringify(maintenanceData));
                }

                await next();
                return;
            }

            throw new errors.E_HTTP_EXCEPTION(maintenanceData.message, {
                status: 503,
            });
        }

        await next();
    }
}
