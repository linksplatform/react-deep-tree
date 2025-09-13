#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

TARGET_BRANCH="gh-pages"
COMMIT_USER_EMAIL="linksplatformtechnologies@gmail.com"
COMMIT_USER_NAME="linksplatform"
REPOSITORY="github.com/linksplatform/$REPOSITORY_NAME"
SHA=$(git rev-parse --verify HEAD)

# Build the project
npm i
npm run export

# Navigate to the output directory
cd out

# Initialize a new git repository in the output directory
git init
git config user.name "$COMMIT_USER_NAME"
git config user.email "$COMMIT_USER_EMAIL"

# Add all files and create initial commit
git add --all
git commit -m "Deploy to GitHub Pages: $SHA"

# Add remote and push to gh-pages branch
git remote add origin "https://linksplatform:$GITHUB_TOKEN@$REPOSITORY.git"
git branch -M $TARGET_BRANCH
git push -f origin $TARGET_BRANCH

cd ..
