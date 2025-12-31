# Deployment Guide - Single Click Studio

This guide will help you deploy your e-commerce website to the internet.

## 🚀 Quick Deploy Options

### Option 1: GitHub Pages (Recommended - Free)

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select **main** branch
   - Click **Save**
   - Your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

3. **Update base paths (if needed):**
   - If your repo name is not the root, update all HTML links to use relative paths (already done in your code)

### Option 2: Netlify (Free & Easy)

1. **Go to [Netlify](https://www.netlify.com/)**
2. **Sign up/Login** (can use GitHub account)
3. **Drag and drop** your project folder to Netlify
4. **Your site is live!** (gets a random URL like `random-name-123.netlify.app`)
5. **Custom domain** (optional): Add your domain in Site settings

**Or use Netlify CLI:**
```bash
npm install -g netlify-cli
netlify deploy
netlify deploy --prod
```

### Option 3: Vercel (Free & Fast)

1. **Go to [Vercel](https://vercel.com/)**
2. **Sign up/Login** (can use GitHub account)
3. **Import your GitHub repository**
4. **Deploy** - Vercel auto-detects static sites
5. **Your site is live!**

**Or use Vercel CLI:**
```bash
npm install -g vercel
vercel
vercel --prod
```

### Option 4: Cloudflare Pages (Free)

1. **Go to [Cloudflare Pages](https://pages.cloudflare.com/)**
2. **Connect your GitHub repository**
3. **Build settings:**
   - Framework preset: None
   - Build command: (leave empty)
   - Build output directory: `/`
4. **Deploy**

## 📝 Important Notes Before Deploying

### 1. Update Admin Password
Before going live, consider changing the admin password in `script.js`:
```javascript
const ADMIN_PASSWORD = 'your-secure-password';
```

### 2. LocalStorage Limitation
- Data is stored in browser LocalStorage
- Each user's data is separate
- Data doesn't sync across devices
- For production, consider backend storage

### 3. HTTPS Required
- Most hosting services provide HTTPS automatically
- Required for LocalStorage to work properly in some browsers

### 4. CORS Issues
- If loading external images, ensure CORS headers are set
- Consider hosting images locally or using a CDN

## 🔧 Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Test shopping cart functionality
- [ ] Test checkout process
- [ ] Test admin panel login
- [ ] Test product CRUD operations
- [ ] Test invoice generation
- [ ] Test on mobile devices
- [ ] Update contact information if needed
- [ ] Add Google Analytics (optional)
- [ ] Set up custom domain (optional)

## 🌐 Custom Domain Setup

### For GitHub Pages:
1. Add `CNAME` file in repository root with your domain
2. Update DNS records:
   - Type: `CNAME`
   - Name: `www` (or `@`)
   - Value: `YOUR_USERNAME.github.io`

### For Netlify/Vercel:
- Add domain in site settings
- Follow DNS configuration instructions provided

## 📊 Analytics (Optional)

Add Google Analytics to track visitors:
1. Get Google Analytics tracking ID
2. Add to `index.html` before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## 🆘 Troubleshooting

### Images not loading:
- Check image paths are relative
- Ensure images are in the repository
- Check browser console for errors

### LocalStorage not working:
- Ensure site is served over HTTPS
- Check browser allows LocalStorage
- Clear browser cache

### Admin panel not accessible:
- Check password is correct
- Clear browser cache and cookies
- Check browser console for errors

## 📞 Need Help?

If you encounter issues during deployment, check:
- Browser console for errors
- Network tab for failed requests
- Hosting service documentation
- GitHub Issues (if using GitHub Pages)

---

**Your site is ready to go live! 🎉**
