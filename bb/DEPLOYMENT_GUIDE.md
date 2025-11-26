# Build Buddy - Deployment Guide

## Changes Made

### 1. Environment Configuration
Created `.env` file in the `bb` folder with:
```
VITE_API_URL=https://bbb-78gz.onrender.com
```

### 2. API Configuration
Created `src/config/api.js` to centralize API URL management:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export default API_BASE_URL;
```

### 3. Updated Files
All API calls now use the `API_BASE_URL` variable instead of hardcoded localhost URLs:
- `src/components/CreateProjectModal.jsx`
- `src/components/AuthCard.jsx`
- `src/context/AuthContext.jsx`
- `src/pages/Profile.jsx`
- `src/pages/Home.jsx`
- `src/pages/ProjectDetails.jsx`

## Deployment Steps

### Deploy to Netlify

1. **Build the project:**
   ```bash
   cd bb
   npm run build
   ```

2. **Deploy to Netlify:**
   - Log in to Netlify
   - Click "Add new site" > "Import an existing project"
   - Connect your GitHub repository
   - Set build settings:
     - Base directory: `bb`
     - Build command: `npm run build`
     - Publish directory: `bb/dist`

3. **Add Environment Variable:**
   - Go to Site settings > Environment variables
   - Add: `VITE_API_URL` = `https://bbb-78gz.onrender.com`

### Deploy to Vercel

1. **Build the project:**
   ```bash
   cd bb
   npm run build
   ```

2. **Deploy to Vercel:**
   - Log in to Vercel
   - Click "Add New" > "Project"
   - Import your GitHub repository
   - Set configuration:
     - Framework Preset: Vite
     - Root Directory: `bb`
     - Build Command: `npm run build`
     - Output Directory: `dist`

3. **Add Environment Variable:**
   - Go to Project Settings > Environment Variables
   - Add: `VITE_API_URL` = `https://bbb-78gz.onrender.com`

## Backend CORS

Your Flask backend already has CORS enabled (`CORS(app)` in `backend/app.py`), which allows all origins by default.

**Optional:** For production security, you can restrict CORS to specific domains:
```python
from flask_cors import CORS

CORS(app, resources={
    r"/api/*": {
        "origins": [
            "https://your-frontend.netlify.app",
            "https://your-frontend.vercel.app"
        ]
    }
})
```

## Testing

After deployment:
1. Visit your frontend URL
2. Test login/signup functionality
3. Test project creation
4. Check browser console for any API errors
5. Verify all features work with the live backend

## Troubleshooting

### CORS Errors
If you see CORS errors, make sure:
- Backend is deployed and running on Render
- Frontend environment variable is set correctly
- Backend CORS is properly configured

### API Connection Issues
- Check that `VITE_API_URL` is set in your deployment platform
- Verify the Render backend URL is correct and accessible
- Check browser DevTools Network tab for failed requests

### Build Errors
- Ensure all dependencies are installed: `npm install`
- Check for any TypeScript/ESLint errors
- Verify the build works locally first: `npm run build`

