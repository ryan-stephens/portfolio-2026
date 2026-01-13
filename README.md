# Portfolio Website

A modern, high-performance portfolio website showcasing GenAI and full-stack development expertise. Built with Next.js 14, TailwindCSS, and deployed on VPS with Docker.

## Features

- **Modern Design**: Clean, responsive interface with dark theme and gradient accents
- **Project Showcase**: Featured projects with filtering by category (AI/ML, Full-Stack, Hybrid)
- **Project Details**: Individual project pages with screenshots, technologies, and related skills
- **Skills Display**: 70+ technologies organized into 7 categories
- **Contact Form**: Integrated contact form with API route (ready for external service integration)
- **Responsive**: Mobile-first design that works on all devices
- **Performance**: Optimized with Next.js static generation and image optimization
- **Accessibility**: WCAG AA compliant with semantic HTML and proper contrast ratios

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: TailwindCSS 3.4
- **Icons**: Lucide React
- **Validation**: Zod
- **Deployment**: Docker + Docker Compose
- **Hosting**: Self-hosted VPS

## Project Structure

```
portfolio-app/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── about/page.tsx           # About page with skills
│   ├── projects/
│   │   ├── page.tsx             # Projects listing with filters
│   │   └── [id]/page.tsx        # Project detail pages
│   ├── contact/page.tsx         # Contact form
│   ├── api/
│   │   └── contact/route.ts     # Contact form API
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/
│   ├── Navigation.tsx           # Header navigation
│   ├── Footer.tsx               # Footer
│   ├── ProjectCard.tsx          # Project card component
│   └── SkillBadge.tsx           # Skill badge component
├── content/
│   ├── projects.ts              # Project data
│   └── skills.ts                # Skills data
├── public/                       # Static assets
├── Dockerfile                    # Docker configuration
├── docker-compose.yml            # Docker Compose configuration
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## Getting Started

### Prerequisites

- Node.js 20+ and npm/pnpm
- Docker (for containerized deployment)

### Local Development

1. **Install dependencies**:
   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

3. **Open browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## Docker Deployment

### Build and Run Locally

```bash
docker-compose up --build
```

The application will be available at `http://localhost:3000`

### Deploy to VPS

1. **Push to repository**:
   ```bash
   git push origin main
   ```

2. **On VPS with Coolify**:
   - Connect your GitHub repository
   - Select this directory as the deployment source
   - Coolify will automatically build and deploy on push

3. **Manual deployment**:
   ```bash
   # SSH into VPS
   ssh user@your-vps.com
   
   # Clone/pull repository
   git clone <repo> portfolio
   cd portfolio/portfolio-app
   
   # Build and run
   docker-compose up -d --build
   ```

### Environment Variables

Create `.env.local` for local development:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For production, set via Docker or VPS environment:

```env
NEXT_PUBLIC_SITE_URL=https://ryan-stephens.dev
```

## Customization

### Adding Projects

Edit `content/projects.ts`:

```typescript
{
  id: 'project-id',
  title: 'Project Title',
  tagline: 'Short description',
  description: 'Medium description',
  longDescription: 'Full description',
  category: 'ai-ml' | 'full-stack' | 'hybrid',
  featured: true,
  liveUrl: 'https://...',
  githubUrl: 'https://...',
  technologies: ['Tech1', 'Tech2'],
  relatedSkills: ['Skill1', 'Skill2'],
  highlights: ['Highlight 1', 'Highlight 2'],
  metrics: [{ label: 'Metric', value: '100' }],
  screenshots: ['/projects/image1.png'],
  year: 2024,
}
```

### Adding Skills

Edit `content/skills.ts`:

```typescript
{
  name: 'Category Name',
  description: 'Category description',
  icon: 'IconName',
  skills: ['Skill1', 'Skill2', ...],
}
```

### Updating Contact Form

The contact form API is in `app/api/contact/route.ts`. Currently logs to console. To integrate with an email service:

1. **Resend** (recommended):
   ```bash
   npm install resend
   ```

   Update `route.ts`:
   ```typescript
   import { Resend } from 'resend';
   
   const resend = new Resend(process.env.RESEND_API_KEY);
   
   // In POST handler:
   await resend.emails.send({
     from: 'contact@ryan-stephens.dev',
     to: 'ryan.stephens15@gmail.com',
     subject: `New contact from ${validatedData.name}`,
     html: `...`,
   });
   ```

2. **SendGrid**, **Mailgun**, or other services follow similar patterns

## Performance Optimization

- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic route-based code splitting
- **CSS Purging**: TailwindCSS removes unused styles
- **Static Generation**: Pages pre-rendered at build time
- **Caching**: Browser and server-side caching headers

## Accessibility

- WCAG AA compliant color contrast ratios
- Semantic HTML5 structure
- ARIA labels where needed
- Keyboard navigation support
- Screen reader compatible

## Monitoring & Maintenance

### Health Checks

Docker Compose includes health checks:

```bash
docker-compose ps
```

### Logs

```bash
docker-compose logs -f portfolio
```

### Updates

1. Update code locally
2. Commit and push to main branch
3. Coolify automatically redeploys
4. Or manually: `docker-compose up -d --build`

## Deployment Checklist

- [ ] Update `NEXT_PUBLIC_SITE_URL` for production
- [ ] Configure email service (Resend, SendGrid, etc.)
- [ ] Set up SSL certificate (Coolify handles this)
- [ ] Configure domain DNS
- [ ] Test contact form
- [ ] Verify all links work
- [ ] Check mobile responsiveness
- [ ] Test on multiple browsers

## Troubleshooting

### Port Already in Use

```bash
# Change port in docker-compose.yml
ports:
  - "3001:3000"  # Use 3001 instead
```

### Build Failures

```bash
# Clear Docker cache
docker system prune -a

# Rebuild
docker-compose up --build
```

### Contact Form Not Working

1. Check API route: `app/api/contact/route.ts`
2. Verify environment variables
3. Check browser console for errors
4. Review Docker logs: `docker-compose logs portfolio`

## Future Enhancements

- [ ] Blog section with markdown support
- [ ] Project filtering by technology
- [ ] Dark/light mode toggle
- [ ] Analytics integration
- [ ] Newsletter signup
- [ ] Search functionality
- [ ] Comments on projects

## License

This portfolio is a personal project. All project descriptions and content are original work.

## Contact

- **Email**: ryan.stephens15@gmail.com
- **GitHub**: https://github.com/ryan-stephens
- **LinkedIn**: https://linkedin.com/in/ryan-stephens15

---

Built with Next.js, TailwindCSS, and deployed on VPS with Docker.
