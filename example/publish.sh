#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

TARGET_BRANCH="gh-pages"
COMMIT_USER_NAME="linksplatform"
REPOSITORY="github.com/linksplatform/$REPOSITORY_NAME"
SHA=$(git rev-parse --verify HEAD)

git clone "https://$REPOSITORY" out
cd out || exit
git checkout $TARGET_BRANCH || git checkout --orphan $TARGET_BRANCH 
rm -rf .
cd ..
 
ls
npm i 
ls
npm run export 


# Now let's go have some fun with the cloned repo
git config user.name "$COMMIT_USER_NAME"
git remote rm origin
git remote add origin "https://linksplatform:$GITHUB_TOKEN@$REPOSITORY.git"

git add --all
git commit -m "Deploy to GitHub Pages: $SHA"

git push "https://linksplatform:$GITHUB_TOKEN@$REPOSITORY.git" "$TARGET_BRANCH"
cd ..
