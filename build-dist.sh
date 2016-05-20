echo "** --------------------------------------------------------- **"
echo "Building in public/dist [js files]..."
echo "** --------------------------------------------------------- **"
r.js -o ./public/build.js
echo "** --------------------------------------------------------- **"
echo "Building in public/dist [css files]..."
echo "** --------------------------------------------------------- **"
r.js -o ./public/build-css.js
echo "** --------------------------------------------------------- **"
echo "** DEV: For dev, edit app.ejs to use js/boot not dist/boot   **"
echo "** Remember to run ./deploy-staging.sh to release to Staging **"
echo "** --------------------------------------------------------- **"
