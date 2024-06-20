# adonisjs-maintenance
> A maintenance mode for the AdonisJS framework

[![npm-image]][npm-url] [![license-image]][license-url] [![typescript-image]][typescript-url]

This NPM package allows you to integrate a maintenance mode for your AdonisJS application - with one single command. Ability to bypass and setting a maintenance message included.

## Installation

Install & configure
> node ace add adonisjs-maintenance

(Same as `npm i adonisjs-maintenance` and `node ace configure adonisjs-maintenance`)

This will add

* `adonisjs-maintenance/CheckForMaintenanceMode` as router middleware
* `adonisjs-maintenance/commands` to commands
* `adonisjs-maintenance/MaintenanceProvider` as extra service provider

to your application

## Usage

### Toggle maintenance mode

Execute the command `node ace maintenance`

Available flags:
```
  --secret      string      Secret key to bypass maintenance mode
  --message     string      Custom message for maintenance mode
  --allow-ip    array       Add an ip to the whitelist
```

* The secret can be passed via a GET parameter named 'secret' (`localhost:3333/?secret=mysecret`) or the header `X-Maintenance-Secret`
* When maintenance mode is enabled, **all** requests to the application will have a 503 status (api, web, ...)
* Passing the correct secret adds your IP automaticly to the whitelist

#### Examples

* `node ace maintenance --message 'Oh noes! Please come back later.'`
* `node ace maintenance --secret letmein --message 'Please come back later or enter the secret password to enter ;)'`
* `node ace maintenance --message 'Maintenance mode is enabled.' --allow-ip 127.0.0.1 --allow-ip 8.8.8.8 --allow-ip 196.128.0.1`

### Optional: custom error views

This package throws an exception to show a 503 status. Which means you can use [status pages](https://docs.adonisjs.com/guides/exception-handling#status-pages) which AdonisJS provides.

You can check out this behaviour in the file  `app/exceptions/handler.ts` of your app.
By default it'll show the edge template `pages/errors/server_error` when a 503 HTTP error occurs:

```ts
protected statusPages: Record<StatusPageRange, StatusPageRenderer> = {
    //...

    '500..599': (error, { view }) => {
        return view.render('pages/errors/server_error', { error })
    },
  }
```

But you can create a new edge template for only the 503 status like so:

```ts
protected statusPages: Record<StatusPageRange, StatusPageRenderer> = {
    //...
    '503': (error, { view }) => {
        return view.render('pages/errors/maintenance', { error })
    },
    '504..599': (error, { view }) => {
        return view.render('pages/errors/server_error', { error })
    },
}
```

The custom message can be shown in the view like so:

```edge
<h1>{{ error.status }} - Maintenance </h1>
<p>Maintenance mode activated, please come back later.</p>
<p>
    {{ error.message }}
</p>
```

[npm-image]: https://img.shields.io/npm/v/adonisjs-maintenance.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/adonisjs-maintenance "npm"

[license-image]: https://img.shields.io/npm/l/adonisjs-maintenance?color=blueviolet&style=for-the-badge
[license-url]: LICENSE.md "license"

[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript
[typescript-url]:  "typescript"