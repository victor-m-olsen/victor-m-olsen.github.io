# Robin Pope Walking Safari - Story Map

An immersive Mapbox storytelling map showcasing Robin Pope Safaris' Mobile Walking Safari experience in South Luangwa, Zambia.

## Live Preview

This story map can be previewed directly on Replit or deployed as a static website to GitHub Pages.

## GitHub Pages Deployment

### Step 1: Get a Mapbox Access Token

1. Sign up at [mapbox.com](https://www.mapbox.com/)
2. Go to your Account page and create a new public access token
3. For production, restrict the token to your GitHub Pages domain (e.g., `username.github.io`)

### Step 2: Configure Your Token

Open `config.js` and replace the placeholder token:

```javascript
accessToken: 'YOUR_MAPBOX_ACCESS_TOKEN',
```

Replace `YOUR_MAPBOX_ACCESS_TOKEN` with your actual Mapbox public token.

### Step 3: Deploy to GitHub Pages

1. Create a new GitHub repository
2. Upload all files from this project (excluding `node_modules`, `server.js`, `package.json`, `package-lock.json`)
3. Go to repository Settings > Pages
4. Set source to "Deploy from a branch" and select `main` branch
5. Your site will be live at `https://username.github.io/repository-name/`

### Files to Upload for GitHub Pages

- `index.html`
- `config.js` (with your token configured)
- `route-data.js` (embedded route data)
- `assets/` folder (all images)

### Files NOT Needed for GitHub Pages

- `server.js` (Node.js server for Replit preview only)
- `package.json` / `package-lock.json`
- `node_modules/`
- `config.local.js`

## Development on Replit

The Node.js server (`server.js`) is only needed for local preview on Replit. It injects the Mapbox token from Replit Secrets automatically.

To run locally:
```bash
node server.js
```

## Features

- Animated route reveal as you scroll
- 3D terrain visualization with satellite imagery
- Cinematic camera rotations at scenic viewpoints
- Wildlife markers along the route
- Journey distance badges for each day
- Premium call-to-action footer

## Safari Journey

1. **Intro**: South Luangwa National Park overview
2. **Day 1**: Nkwali Camp - Arrival
3. **Day 2**: Mupamadzi River - 90km drive
4. **Day 3**: Mobile Camp - First 8km bush walk
5. **Day 4**: Wilderness exploration - 10km walk
6. **Days 5-6**: Along the Mupamadzi - 15km walking
7. **Day 7**: Tena Tena Camp - Finale
8. **Journey Complete**: Booking CTA

## Credits

- Safari Experience: [Robin Pope Safaris](https://www.robinpopesafaris.net)
- Map Platform: [Mapbox](https://www.mapbox.com)
