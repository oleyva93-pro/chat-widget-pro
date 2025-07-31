#!/bin/bash

# Publish script for chat widget package

echo "🚀 Starting publish process..."

# Check if we're on main branch
if [[ $(git branch --show-current) != "main" ]]; then
    echo "❌ Error: Must be on main branch to publish"
    exit 1
fi

# Check if there are uncommitted changes
if [[ -n $(git status --porcelain) ]]; then
    echo "❌ Error: There are uncommitted changes. Please commit or stash them first."
    exit 1
fi

# Build the library
echo "📦 Building library..."
npm run build:lib

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Build output not found"
    exit 1
fi

# Run tests (if any)
echo "🧪 Running tests..."
npm test 2>/dev/null || echo "⚠️  No tests found or tests failed"

# Check if user is logged in to npm
if ! npm whoami 2>/dev/null; then
    echo "❌ Error: Not logged in to npm. Please run 'npm login' first."
    exit 1
fi

# Get current version
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo "📋 Current version: $CURRENT_VERSION"

# Ask for new version
read -p "Enter new version (or press enter to keep current): " NEW_VERSION
NEW_VERSION=${NEW_VERSION:-$CURRENT_VERSION}

# Update version in package.json
npm version $NEW_VERSION --no-git-tag-version

# Build again with new version
npm run build:lib

# Publish to npm
echo "📤 Publishing to npm..."
npm publish

if [ $? -eq 0 ]; then
    echo "✅ Successfully published version $NEW_VERSION"
    
    # Create git tag
    git add package.json
    git commit -m "chore: bump version to $NEW_VERSION"
    git tag "v$NEW_VERSION"
    git push origin main --tags
    
    echo "🏷️  Created git tag v$NEW_VERSION"
    echo "🎉 Package published successfully!"
else
    echo "❌ Failed to publish package"
    exit 1
fi 