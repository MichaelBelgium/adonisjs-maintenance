# adonisjs-maintenance
> A maintenance mode for the AdonisJS framework

[![npm-image]][npm-url] [![license-image]][license-url] [![typescript-image]][typescript-url]

This NPM package allows you to integrate a maintenance mode for your AdonisJS application - with one single command. Ability to bypass and setting a maintenance message included.

## Installation


Install
> npm i adonisjs-maintenance

Configure:
> node ace configure adonisjs-maintenance

Add middleware to `start/kernel.ts`

```ts
Server.middleware.register([
    //...
    () => import('@ioc:Adonis/Addons/MaintenanceMode')
])
```

## Usage

### Toggle maintenance mode

Execute the command `node ace maintenance`

Available flags:
```
  --secret string   Secret key to bypass maintenance mode
  --message string  Custom message for maintenance mode
```

### Optional: custom error views

This package throws an exception to show a 503 status. Which means you can use the [HTTP error handling](https://docs.adonisjs.com/guides/exception-handling#handling-exceptions-globally) that AdonisJS provides.

You can check out this behaviour in the file  `app/Exceptions/Handler.ts` of your app.
By default it'll show the edge template `errors/server-error`:

```ts
protected statusPages = {
    //...
    '500..599': 'errors/server-error', 
}
```

But optionally you can create a new edge template for only the 503 status like so:

```ts
protected statusPages = {
    //...
    '503': 'errors/maintenance',
    //..
}
```

[npm-image]: https://img.shields.io/npm/v/adonisjs-maintenance.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/adonisjs-maintenance "npm"

[license-image]: https://img.shields.io/npm/l/adonisjs-maintenance?color=blueviolet&style=for-the-badge
[license-url]: LICENSE.md "license"

[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript
[typescript-url]:  "typescript"