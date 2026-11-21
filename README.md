# slot-finder

You can use the deployed version of this at https://slots.symphonious.net or run it locally by opening `docs/index.html` in your browser.

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

Outputs to the `docs` folder. Generated files do not need to be committed for deployment.

### Automatic deployment

The [Deploy site to GitHub Pages](.github/workflows/deploy-pages.yml) workflow
installs dependencies from `yarn.lock`, builds the site, and deploys the `docs`
output directly to GitHub Pages whenever a commit is pushed to `master`.
It can also be run manually from the repository's **Actions** tab.
The build uses Node.js 24 and bypasses legacy dependency engine restrictions
while keeping the versions in `yarn.lock` fixed.

One-time setup:

1. Commit and push the workflow and these instructions to `master`.
2. In the repository's **Settings → Pages**, change **Build and deployment → Source**
   to **GitHub Actions**. Keep the custom domain set to `slots.symphonious.net`.
3. Check the deployment in the **Actions** tab. If the first run failed before
   changing the Pages setting, rerun it.

After setup, push source changes to `master`; no local build or generated-file
commit is required. The local build command still works as before.

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
