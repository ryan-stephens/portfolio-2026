# Quick Start Guide

Get your portfolio website up and running in 5 minutes.

## Local Development (2 minutes)

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser
# Navigate to http://localhost:3000
```

Done! Your portfolio is running locally.

## Docker Deployment (3 minutes)

```bash
# 1. Build and start
docker-compose up --build

# 2. Open browser
# Navigate to http://localhost:3000

# 3. Stop when done
docker-compose down
```

## Production Deployment

### Option A: Coolify (Recommended - 5 minutes)

1. Connect GitHub repository to Coolify
2. Set root directory to `portfolio-app`
3. Configure domain
4. Deploy

Coolify handles SSL, updates, and monitoring automatically.

### Option B: Manual VPS (10 minutes)

```bash
# SSH into VPS
ssh user@your-vps.com

# Clone repository
git clone https://github.com/ryan-stephens/portfolio.git
cd portfolio/portfolio-app

# Create environment file
echo "NEXT_PUBLIC_SITE_URL=https://your-domain.com" > .env.production

# Deploy
docker-compose up -d --build

# View logs
docker-compose logs -f
```

## Next Steps

### 1. Customize Content

- **Projects**: Edit `content/projects.ts`
- **Skills**: Edit `content/skills.ts`
- **About**: Edit `app/about/page.tsx`

### 2. Add Project Images

Place images in `public/projects/`:
- `project-name-1.png`
- `project-name-2.png`

Update `content/projects.ts` with image paths.

### 3. Setup Contact Form

Choose an email service:

**Resend** (easiest):
```bash
npm install resend
```

Add to `.env.local`:
```env
RESEND_API_KEY=your_api_key
```

Update `app/api/contact/route.ts` with Resend integration.

### 4. Configure Domain

Update environment variables:
```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Common Tasks

### Add a Project

1. Edit `content/projects.ts`
2. Add project object with all fields
3. Add images to `public/projects/`
4. Test at `/projects`

### Update Skills

1. Edit `content/skills.ts`
2. Add/remove skills from categories
3. Changes appear on landing page and about page

### Change Colors

Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: '#your-color',
  accent: '#your-color',
}
```

### Deploy Updates

```bash
# Local changes
git add .
git commit -m "Update portfolio"
git push origin main

# Coolify automatically redeploys
# Or manually: docker-compose up -d --build
```

## Troubleshooting

**Port 3000 in use?**
```bash
npm run dev -- -p 3001
```

**Dependencies not installing?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Docker won't start?**
```bash
docker system prune -a
docker-compose up --build
```

## File Structure

```
portfolio-app/
├── app/                    # Pages and API routes
├── components/             # Reusable components
├── content/                # Project and skill data
├── public/                 # Images and static files
├── Dockerfile              # Docker configuration
├── docker-compose.yml      # Docker Compose setup
├── package.json            # Dependencies
└── README.md               # Full documentation
```

## Key Files to Edit

| File | Purpose |
|------|---------|
| `content/projects.ts` | Add/edit projects |
| `content/skills.ts` | Add/edit skills |
| `app/page.tsx` | Landing page content |
| `app/about/page.tsx` | About page content |
| `tailwind.config.ts` | Colors and theme |

## Environment Variables

| Variable | Purpose | Default |
|----------|---------|---------|
| `NEXT_PUBLIC_SITE_URL` | Site URL | `http://localhost:3000` |
| `NODE_ENV` | Environment | `development` |
| `RESEND_API_KEY` | Email service | (optional) |

## Performance Tips

- Use WebP images (smaller file size)
- Optimize images before uploading
- Keep descriptions concise
- Test on mobile devices

## Security

- Never commit `.env` files
- Use `.env.local` for local development
- Use `.env.production` for production
- Keep dependencies updated: `npm update`

## Support

- **Documentation**: See `README.md` and `DEPLOYMENT.md`
- **Development**: See `DEVELOPMENT.md`
- **Issues**: Check GitHub issues or create new one

---

**That's it!** You now have a fully functional portfolio website. 🎉

For more details, see the full documentation in `README.md`.
