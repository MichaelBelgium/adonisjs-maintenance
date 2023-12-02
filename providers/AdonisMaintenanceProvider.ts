import { ApplicationContract } from "@ioc:Adonis/Core/Application";

export default class AdonisMaintenanceProvider
{
    constructor(protected app: ApplicationContract)
    {

    }

    public register()
    {
    }
}