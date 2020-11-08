#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

TARGET_BRANCH="gh-pages" 
COMMIT_USER_EMAIL="linksplatformtechnologies@gmail.com"
COMMIT_USER_NAME="linksplatform"
REPOSITORY="github.com/linksplatform/$REPOSITORY_NAME"
SHA=$(git rev-parse --verify HEAD)

git clone "https://$REPOSITORY" gh-pages
cd gh-pages || exit

git remote rm origin
git remote add origin "https://linksplatform:$GITHUB_TOKEN@$REPOSITORY.git"

git fetch

git checkout $TARGET_BRANCH

find -not -path "./.git/*" -not -name ".git" -delete

cd ..
 
npm i
npm run export

ls out
cp -a out/. gh-pages/

cd gh-pages
echo "OK==========================================================================================================================================="

git config user.name "$COMMIT_USER_NAME"
git config user.email "$COMMIT_USER_EMAIL"
git add --all
git commit -m "Deploy to GitHub Pages: $SHA"

git push

cd ..
