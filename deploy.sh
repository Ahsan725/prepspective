#!/bin/bash

# Hardcoded passwords
DEV_PASSWORD="devpass123"
PROD_PASSWORD="prodpass456"

# Function to perform the development workflow
development_workflow() {
  echo "Running development workflow..."

  # Run linting
  echo "Running linter..."
  npm run lint || { echo "Linting failed. Fix the issues before proceeding."; exit 1; }

  # Commit message
  if [ -z "$1" ]; then
    commit_message="auto commit"
    echo "No commit message provided. Using default: '$commit_message'"
  else
    commit_message="$1"
    echo "Using custom commit message: '$commit_message'"
  fi

  # Add, commit, and push changes
  echo "Adding all changes..."
  git add . || { echo "Failed to add changes"; exit 1; }

  echo "Committing changes..."
  git commit -m "$commit_message" || { echo "Commit failed"; exit 1; }

  echo "Pushing changes to the current branch..."
  git push || { echo "Push failed"; exit 1; }

  # Merge branches
  echo "Switching to 'development' branch..."
  git checkout development || { echo "Failed to checkout development"; exit 1; }

  echo "Merging 'db' into 'development'..."
  git merge db || { echo "Merge failed for development <- db"; exit 1; }

  echo "Pushing 'development' branch..."
  git push origin development || { echo "Push failed for development"; exit 1; }

  echo "Switching to 'db' branch..."
  git checkout db || { echo "Failed to checkout db"; exit 1; }

  echo "Merging 'main' into 'db' to keep it up to date..."
  git merge main || { echo "Merge failed for db <- main"; exit 1; }

  echo "Pushing 'db' branch..."
  git push origin db || { echo "Push failed for db"; exit 1; }

  echo "Development workflow completed successfully!"
}

# Function to perform the production workflow
production_workflow() {
  echo "Running production workflow..."

  # Run linting
  echo "Running linter..."
  npm run lint || { echo "Linting failed. Fix the issues before proceeding."; exit 1; }

  # Commit message
  if [ -z "$1" ]; then
    commit_message="Production release"
    echo "No commit message provided. Using default: '$commit_message'"
  else
    commit_message="$1"
    echo "Using custom commit message: '$commit_message'"
  fi

  # Add, commit, and push changes
  echo "Adding all changes..."
  git add . || { echo "Failed to add changes"; exit 1; }

  echo "Committing changes..."
  git commit -m "$commit_message" || { echo "Commit failed"; exit 1; }

  echo "Pushing changes to the current branch..."
  git push || { echo "Push failed"; exit 1; }

  # Merge branches for production
  echo "Switching to 'development' branch..."
  git checkout development || { echo "Failed to checkout development"; exit 1; }

  echo "Merging 'db' into 'development'..."
  git merge db || { echo "Merge failed for development <- db"; exit 1; }

  echo "Pushing 'development' branch..."
  git push origin development || { echo "Push failed for development"; exit 1; }

  echo "Switching to 'main' branch..."
  git checkout main || { echo "Failed to checkout main"; exit 1; }

  echo "Merging 'development' into 'main'..."
  git merge development || { echo "Merge failed for main <- development"; exit 1; }

  echo "Pushing 'main' branch to production..."
  git push origin main || { echo "Push failed for main"; exit 1; }

  echo "Syncing branches back to 'development' and 'db'..."
  git checkout development || { echo "Failed to checkout development"; exit 1; }
  git merge main || { echo "Merge failed for development <- main"; exit 1; }
  git push origin development || { echo "Push failed for development"; exit 1; }

  git checkout db || { echo "Failed to checkout db"; exit 1; }
  git merge main || { echo "Merge failed for db <- main"; exit 1; }
  git push origin db || { echo "Push failed for db"; exit 1; }

  echo "Production deployment completed successfully!"
}

# Main script
echo "Do you want to push to 'development' or 'production'? (Enter 'dev' or 'prod')"
read -r choice

if [ "$choice" == "dev" ]; then
  echo "Enter the password for development:"
  read -rs password
  if [ "$password" == "$DEV_PASSWORD" ]; then
    development_workflow "$1"
  else
    echo "Incorrect password. Aborting."
    exit 1
  fi
elif [ "$choice" == "prod" ]; then
  echo "Enter the password for production:"
  read -rs password
  if [ "$password" == "$PROD_PASSWORD" ]; then
    production_workflow "$1"
  else
    echo "Incorrect password. Aborting."
    exit 1
  fi
else
  echo "Invalid option. Aborting."
  exit 1
fi
