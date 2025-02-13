#!/bin/bash

# Run linting before proceeding
echo "Running linter..."
npm run lint || { echo "Linting failed. Fix the issues before proceeding."; exit 1; }
npm run build || { echo "Building failed. Fix the issues before proceeding."; exit 1; }

# Check if a custom commit message is provided as an argument
if [ -z "$1" ]; then
  commit_message="Production release"
  echo "No commit message provided. Using default: '$commit_message'"
else
  commit_message="$1"
  echo "Using custom commit message: '$commit_message'"
fi

# Add all changes, commit, and push to the current branch
echo "Adding all changes..."
git add . || { echo "Failed to add changes"; exit 1; }

echo "Committing changes..."
git commit -m "$commit_message" || { echo "Commit failed"; exit 1; }

echo "Pushing changes to the current branch..."
git push || { echo "Push failed"; exit 1; }

# Merge `db` into `development`
echo "Switching to 'development' branch..."
git checkout development || { echo "Failed to checkout development"; exit 1; }

echo "Merging 'db' into 'development'..."
git merge db || { echo "Merge failed for development <- db"; exit 1; }

echo "Pushing 'development' branch..."
git push origin development || { echo "Push failed for development"; exit 1; }

# Merge `development` into `main` for production
echo "Switching to 'main' branch..."
git checkout main || { echo "Failed to checkout main"; exit 1; }

echo "Merging 'development' into 'main'..."
git merge development || { echo "Merge failed for main <- development"; exit 1; }

echo "Pushing 'main' branch to production..."
git push origin main || { echo "Push failed for main"; exit 1; }

# Merge `main` back into `db` and `development` to keep them synced
echo "Switching to 'development' branch..."
git checkout development || { echo "Failed to checkout development"; exit 1; }

echo "Merging 'main' into 'development' to keep it updated..."
git merge main || { echo "Merge failed for development <- main"; exit 1; }

echo "Pushing 'development' branch..."
git push origin development || { echo "Push failed for development"; exit 1; }

echo "Switching to 'db' branch..."
git checkout db || { echo "Failed to checkout db"; exit 1; }

echo "Merging 'main' into 'db' to keep it updated..."
git merge main || { echo "Merge failed for db <- main"; exit 1; }

echo "Pushing 'db' branch..."
git push origin db || { echo "Push failed for db"; exit 1; }

echo "Production deployment completed successfully!"
