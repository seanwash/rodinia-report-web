# The Rodinia Report

A public curation of environmentally focused articles that helps individuals easily stay up to date on the most recent
and most inspiring undertakings around the world.

## Road map

It's still early days for Rodinia, so we don't have a formal road map just yet, but we're keeping track of a number of
items that are needed to reach MVP status [here](https://github.com/seanwash/rodinia-report-web/projects/1).

## Setup

### Environment Variables

Rodinia uses `dotenv` to load environment variables at runtime. You'll need to duplicate `.env.example` to `.env` and then
update the new file with the relevant values.

### Install dependencies

Note that Rodinia uses [Remix.run](https://remix.run) and you'll need access to a npm registry token to install it.

```bash
  npm install
```

### Setup Postgres

The primary datastore for Rodinia is Postgres, and you'll need to have it setup and running locally.

### Prepare Firebase

You'll need to create a `.firebaserc` file at the root of the project. It's used by `firebase-tools`. A Java runtime is
also required for the Firebase emulators to run, so if you don't have a Java runtime installed, you'll need one.

### Start the server

From your terminal:

```sh
npm run firebase:emulators # This will start the local versions of the Firebase services that Rodinia needs. The UI is located on port 4000.
npm run dev                # This will start one process for the dev server and one process for postcss. The app is located on port 3000.
npm run db:user:seed       # This will create a seed user in the Firebase auth emulator.
npm run db:seed            # This will create some seed data for you to use in Postgres via Prisma.
```

## Common Issues

- `Error: Your API key is invalid, please check you have copied it correctly.` You're more than likely missing a value for one of the Firebase environment variables.
- `"I created a user in dev, but I'm not able to login anymore."` The Firebase emulator will wipe all of its services, including auth, when restarted. You'll have to re-create your user.

## Technical Notes

### Remix

[Remix](https://remix.run/features) powers the front end of Rodinia. [Click here](https://remix.run/features) to learn
more about it. Note that Remix is _not_ free or open source.

### Firebase

The authentication of Rodinia is powered by Firebase. Firebase provides
an [emulator suite](https://firebase.google.com/docs/emulator-suite) so that we can work against locally running
services. Rodinia is configured to use the emulators in development.

### Postgres & Prisma

The data layer of Rodinia is powered by [PostgreSQL](https://www.postgresql.org/) via [Prisma](https://www.prisma.io/).

### Tailwind

[Tailwind](https://tailwindcss.com/) provides the styles for this project. Tailwind components can be added
to `./styles`, and postcss will compile the styles into `./app/styles`. Note that `./app/styles` is ignored. Styles will
be rebuilt when deployed, so we can safely leave the `./app/styles` dir out of source control.

## Deployment

Deploys to the development env happen automatically when PRs are merged to the `develop` branch, and deploys to the
production env happen automatically when PRs are merged to the `main` branch.

Rodinia is powered by [Railway](https://railway.app). If you happen to see the `railway` variants of scripts
in `package.json`, it's because I use those to work on Rodinia locally.
