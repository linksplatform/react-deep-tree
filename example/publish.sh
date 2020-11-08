#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

TARGET_BRANCH="gh-pages" 
COMMIT_USER_EMAIL="linksplatformtechnologies@gmail.com"
COMMIT_USER_NAME="linksplatform"
REPOSITORY="github.com/linksplatform/$REPOSITORY_NAME"
SHA=$(git rev-parse --verify HEAD)

git clone "https://$REPOSITORY" out
cd out || exit

# Now let's go have some fun with the cloned repo 
git config user.name "$COMMIT_USER_NAME"
git config user.email "$COMMIT_USER_EMAIL"
git remote rm origin
git remote add origin "https://linksplatform:$GITHUB_TOKEN@$REPOSITORY.git"

git checkout $TARGET_BRANCH || git checkout --orphan $TARGET_BRANCH 
git rm -rf .
git clean -fxd
cd ..
 
ls
npm i 
ls
npm run export  
sleep 5
cd out
ls 
echo "OK==========================================================================================================================================="

git add --all
git commit -m "Deploy to GitHub Pages: $SHA"

git push

cd ..
