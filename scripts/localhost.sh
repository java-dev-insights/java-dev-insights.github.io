#!/usr/bin/env bash

echo =========================================================
echo Running $0 with $# arguments
echo [processID] $$
echo [arguments] $@
echo =========================================================

NVM_VERSION=''

separator_start()   { echo '================================================================================= v'; }
separator_end()     { echo '================================================================================= ^'; }
banner()            { separator_start; echo $1; separator_end; }

case $1 in
  git)
    banner "git fetch --all -p; git pull; git status;"
    git fetch --all -p; git pull; git status;
    banner "git merge origin/main;"
    git merge origin/main;
    # git push;
    ;;
  install)
    banner "install node and packages"
    # install and uses node version from .nvmrc file
    nvm use;
    # install packages from package.json
    npm install
    ;;
  start)
    banner "start local dev"
    GITHUB_ACTIONS=true npm run docs:dev;
    ;;
  deploy)
    npm run deploy
    ;;
  *)
    echo "  git - sync latest from main"
    echo "  start - start local"
    echo "  install - install from package.json"
    echo "  deploy - deploys to gh pages"
    ;;
esac

echo
