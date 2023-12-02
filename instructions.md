The package `adonisjs-maintenance` has been successfully configured. Before you can use the maintenance mode, please register the required middleware inside your `start/kernel.ts` file.
```ts
Server.middleware.register([
  //...
  () => import('@ioc:Adonis/Addons/MaintenanceMode')
])