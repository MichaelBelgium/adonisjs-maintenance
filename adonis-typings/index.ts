declare module '@ioc:Adonis/Addons/MaintenanceMode'
{
    import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
    
    export interface MaintenanceMiddlewareContract
    {
        new (path: string): {
            handle(ctx: HttpContextContract, next: () => Promise<void>): any
        }
    }

    const CheckForMaintenanceMode: MaintenanceMiddlewareContract;

    export default CheckForMaintenanceMode;
}