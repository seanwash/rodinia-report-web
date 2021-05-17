# Welcome to Remix!

- [Remix Docs](https://docs.remix.run)
- [Customer Dashboard](https://remix.run/dashboard)

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode and starts postcss in watch mode.

## Notes

### Tailwind

Tailwind provides the styles for this project. Tailwind components can be added to `./styles`, and postcss will compile the styles into `./app/styles`. Note that `./app/styles` is ignored. Styles will be rebuilt when deployed, so we can safely leave the `./app/styles` dir out of source control.

## Deployment

Deploys to the development env happen automatically when PRs are merged to the `develop` branch, and deploys to the production env happen automatically when PRs are merged to the `main` branch.
