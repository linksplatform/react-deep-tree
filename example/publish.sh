#!/bin/bash
set -e # Exit with nonzero exit code if anything fails



TARGET_BRANCH="gh-pages" 
COMMIT_USER_EMAIL="linksplatformtechnologies@gmail.com"
COMMIT_USER_NAME="linksplatform"
REPOSITORY="github.com/linksplatform/$REPOSITORY_NAME"
SHA=$(git rev-parse --verify HEAD)

git clone "https://$REPOSITORY" out
cd out || exit

git remote rm origin
git remote add origin "https://linksplatform:$GITHUB_TOKEN@$REPOSITORY.git"

git fetch

git checkout $TARGET_BRANCH
find -not -path "./.git/*" -not -name ".git" | grep git
find -not -path "./.git/*" -not -name ".git" -delete
cd ..
 
ls
npm i 
ls
npm run export  
sleep 15
cd out
ls 
echo "OK==========================================================================================================================================="

git remote rm origin
git remote add origin "https://linksplatform:$GITHUB_TOKEN@$REPOSITORY.git"

git fetch
git checkout $TARGET_BRANCH || git checkout --orphan $TARGET_BRANCH 

git config user.name "$COMMIT_USER_NAME"
git config user.email "$COMMIT_USER_EMAIL"
git add --all
git commit -m "Deploy to GitHub Pages: $SHA"

git push --set-upstream origin gh-pages

cd ..
