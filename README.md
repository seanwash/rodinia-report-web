# The Rodinia Report

A public curation of environmentally focused articles that helps individuals easily stay up to date on the most recent and most inspiring undertakings around the world.

## Roadmap

It's still early days for Rodinia so we don't have a formal roadmap just yet, but we're keeping track of a number of items that are needed to reach MVP status [here](https://github.com/seanwash/rodinia-report-web/projects/1).


## Tech Stack

**Client:** [Remix](https://remix.run), [React](https://reactjs.org/), [TailwindCSS](https://tailwindcss.com/)

**Server:** [Remix](http://remix.run), [Firebase](https://firebase.google.com/)


## Run Locally

Clone the project

```bash
  git clone https://github.com/seanwash/rodinia-report-web.git
```

Go to the project directory

```bash
  cd rodinia-report-web
```

Install dependencies

```bash
  npm install
```

Start the server

From your terminal:

```sh
npm run dev
```

This starts your app in development mode and starts postcss in watch mode.

### Styles

[Tailwind](https://tailwindcss.com/) provides the styles for this project. Tailwind components can be added to `./styles`, and postcss will compile the styles into `./app/styles`. Note that `./app/styles` is ignored. Styles will be rebuilt when deployed, so we can safely leave the `./app/styles` dir out of source control.

## Deployment

Deploys to the development env happen automatically when PRs are merged to the `develop` branch, and deploys to the production env happen automatically when PRs are merged to the `main` branch.
