# 
#!/bin/bash

# Run linting before proceeding
echo "Running linter..."
npm run lint || { echo "Linting failed. Fix the issues before proceeding."; exit 1; }

# Check if a custom commit message is provided as an argument
if [ -z "$1" ]; then
  commit_message="auto commit"
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

# Checkout development branch, merge db, and push
echo "Switching to 'development' branch..."
git checkout development || { echo "Failed to checkout development"; exit 1; }

echo "Merging 'db' into 'development'..."
git merge db || { echo "Merge failed for development <- db"; exit 1; }

echo "Pushing 'development' branch..."
git push origin development || { echo "Push failed for development"; exit 1; }

# Merge main into db (optional, if necessary for keeping db branch synced)
echo "Switching to 'db' branch..."
git checkout db || { echo "Failed to checkout db"; exit 1; }

echo "Merging 'main' into 'db' to keep it up to date (optional step)..."
git merge main || { echo "Merge failed for db <- main"; exit 1; }

echo "Pushing 'db' branch..."
git push origin db || { echo "Push failed for db"; exit 1; }

echo "All operations completed successfully, leaving 'main' branch untouched!"
