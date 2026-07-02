# Template Setup Instructions

There is a script which should be used to run this app locally and also to deploy on github pages.

1. replace `template-vitepress` with `new_repo_name` in all files.
2. use `nvm` to manage node version - install this locally from [here](https://github.com/nvm-sh/nvm#install--update-script){target="_blank"}.
3. `./scripts/localhost.sh install` to install all dependencies.
4. `./scripts/localhost.sh start` to run locally.
5. delete `setup.md` and remove topNav entry for `/setup`.
6. cleanup the `README.md` file.
7. `./scripts/localhost.sh deploy` to deploy to github pages.

## Additional Info

This template repo is for vitepress, read about [What is vitepress?](https://vitepress.dev/guide/what-is-vitepress){target="blank"}

- [installation](https://vitepress.dev/guide/getting-started#installation){target="blank"}
- [test locally](https://vitepress.dev/guide/deploy#build-and-test-locally){target="blank"}
- [deploy](https://vitepress.dev/guide/deploy){target="blank"} - can also be deployed using [github pages](https://www.npmjs.com/package/gh-pages){target="blank"}
