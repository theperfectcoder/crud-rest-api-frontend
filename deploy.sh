# Pull the latest changes from the git repository
git reset --hard
git clean -df
git pull origin main

# Install/update composer dependencies
npm install

# Run server
npm run dev