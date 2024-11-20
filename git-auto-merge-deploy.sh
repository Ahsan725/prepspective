#!/bin/bash

# Set a commit message
commit_message="auto merge and deploy"

# Add all changes, commit, and push
echo "Adding all changes..."
git add . || { echo "Failed to add changes"; exit 1; }

echo "Committing changes..."
git commit -m "$commit_message" || { echo "Commit failed"; exit 1; }

echo "Pushing changes to the current branch..."
git push || { echo "Push failed"; exit 1; }

# Checkout development, merge db, and push
echo "Switching to 'development' branch..."
git checkout development || { echo "Failed to checkout development"; exit 1; }

echo "Merging 'db' into 'development'..."
git merge db || { echo "Merge failed for development <- db"; exit 1; }

echo "Pushing 'development' branch..."
git push || { echo "Push failed for development"; exit 1; }

# Checkout main, merge development, and push
echo "Switching to 'main' branch..."
git checkout main || { echo "Failed to checkout main"; exit 1; }

echo "Merging 'development' into 'main'..."
git merge development || { echo "Merge failed for main <- development"; exit 1; }

echo "Pushing 'main' branch..."
git push || { echo "Push failed for main"; exit 1; }

# Merge main back into development and push
echo "Switching back to 'development' branch..."
git checkout development || { echo "Failed to checkout development"; exit 1; }

echo "Merging 'main' into 'development'..."
git merge main || { echo "Merge failed for development <- main"; exit 1; }

echo "Pushing 'development' branch to origin..."
git push origin development || { echo "Push failed for development to origin"; exit 1; }

# Merge main into db and push
echo "Switching to 'db' branch..."
git checkout db || { echo "Failed to checkout db"; exit 1; }

echo "Merging 'main' into 'db'..."
git merge main || { echo "Merge failed for db <- main"; exit 1; }

echo "Pushing 'db' branch to origin..."
git push origin db || { echo "Push failed for db to origin"; exit 1; }

echo "All operations completed successfully!"
