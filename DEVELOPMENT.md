# Development Guide

This guide covers local development setup and common development tasks.

## Prerequisites

- Node.js 20+ (https://nodejs.org/)
- npm or pnpm (npm comes with Node.js, or install pnpm: `npm install -g pnpm`)
- Git
- A code editor (VS Code recommended)

## Initial Setup

### 1. Clone Repository

```bash
git clone https://github.com/ryan-stephens/portfolio.git
cd portfolio/portfolio-app
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

Or using pnpm (faster):
```bash
pnpm install
```

### 3. Environment Setup

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` if needed (defaults work for local development).

### 4. Start Development Server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
├── page.tsx                 # Landing page (/)
├── about/page.tsx           # About page (/about)
├── projects/
│   ├── page.tsx             # Projects listing (/projects)
│   └── [id]/page.tsx        # Project detail (/projects/[id])
├── contact/page.tsx         # Contact page (/contact)
├── api/
│   └── contact/route.ts     # Contact form API
├── layout.tsx               # Root layout
└── globals.css              # Global styles

components/
├── Navigation.tsx           # Header navigation
├── Footer.tsx               # Footer
├── ProjectCard.tsx          # Project card component
└── SkillBadge.tsx           # Skill badge component

content/
├── projects.ts              # Project data
└── skills.ts                # Skills data

lib/
└── utils.ts                 # Utility functions

public/                       # Static assets (images, icons, etc.)
```

## Common Development Tasks

### Adding a New Project

1. **Edit `content/projects.ts`**:

```typescript
{
  id: 'unique-project-id',
  title: 'Project Title',
  tagline: 'Short one-liner',
  description: 'Medium description',
  longDescription: 'Full detailed description...',
  category: 'ai-ml' | 'full-stack' | 'hybrid',
  featured: true,  // Show on landing page
  liveUrl: 'https://project.com',
  githubUrl: 'https://github.com/...',
  technologies: ['Tech1', 'Tech2', 'Tech3'],
  relatedSkills: ['Skill1', 'Skill2'],
  highlights: [
    'Key achievement 1',
    'Key achievement 2',
  ],
  metrics: [
    { label: 'Users', value: '1000+' },
    { label: 'Uptime', value: '99.9%' },
  ],
  screenshots: [
    '/projects/project-1.png',
    '/projects/project-2.png',
  ],
  year: 2024,
}
```

2. **Add project images** to `public/projects/`

3. **Test locally**: Navigate to `/projects` to see the new project

### Adding a New Skill Category

1. **Edit `content/skills.ts`**:

```typescript
{
  name: 'New Category',
  description: 'Category description',
  icon: 'IconName',  // From lucide-react
  skills: [
    'Skill1',
    'Skill2',
    'Skill3',
  ],
}
```

2. **Update landing page** if needed to display the category

### Updating Contact Form

The contact form API is in `app/api/contact/route.ts`.

#### Option 1: Resend (Recommended)

1. **Install Resend**:
   ```bash
   npm install resend
   ```

2. **Get API key** from https://resend.com

3. **Update `.env.local`**:
   ```env
   RESEND_API_KEY=your_api_key
   ```

4. **Update `app/api/contact/route.ts`**:
   ```typescript
   import { Resend } from 'resend';
   
   const resend = new Resend(process.env.RESEND_API_KEY);
   
   // In POST handler:
   await resend.emails.send({
     from: 'contact@ryan-stephens.dev',
     to: 'ryan.stephens15@gmail.com',
     subject: `New contact from ${validatedData.name}`,
     html: `
       <h2>New Contact Form Submission</h2>
       <p><strong>Name:</strong> ${validatedData.name}</p>
       <p><strong>Email:</strong> ${validatedData.email}</p>
       <p><strong>Message:</strong></p>
       <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
     `,
   });
   ```

#### Option 2: SendGrid

1. **Install SendGrid**:
   ```bash
   npm install @sendgrid/mail
   ```

2. **Get API key** from https://sendgrid.com

3. **Update `.env.local`**:
   ```env
   SENDGRID_API_KEY=your_api_key
   ```

4. **Update `app/api/contact/route.ts`**:
   ```typescript
   import sgMail from '@sendgrid/mail';
   
   sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
   
   // In POST handler:
   await sgMail.send({
     to: 'ryan.stephens15@gmail.com',
     from: 'contact@ryan-stephens.dev',
     subject: `New contact from ${validatedData.name}`,
     html: `...`,
   });
   ```

### Styling

The project uses TailwindCSS for styling. Key files:

- `tailwind.config.ts` - Tailwind configuration and theme
- `app/globals.css` - Global styles and utilities
- Components use Tailwind classes directly

#### Adding Custom Colors

Edit `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      'custom-color': '#your-hex-code',
    },
  },
}
```

#### Creating Reusable Components

Example component in `components/MyComponent.tsx`:

```typescript
interface MyComponentProps {
  title: string;
  variant?: 'primary' | 'secondary';
}

export default function MyComponent({ title, variant = 'primary' }: MyComponentProps) {
  return (
    <div className={`p-4 rounded-lg ${
      variant === 'primary' ? 'bg-primary text-white' : 'bg-muted text-foreground'
    }`}>
      {title}
    </div>
  );
}
```

## Code Quality

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

### Formatting

The project uses Prettier (configured in Next.js). Format on save in VS Code:

1. Install Prettier extension
2. Set as default formatter
3. Enable "Format on Save"

## Testing

Currently, the project doesn't have automated tests. To add:

### Setup Jest + React Testing Library

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

Create `jest.config.js`:

```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)
```

Create `jest.setup.js`:

```javascript
import '@testing-library/jest-dom'
```

### Example Test

Create `components/__tests__/SkillBadge.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react';
import SkillBadge from '../SkillBadge';

describe('SkillBadge', () => {
  it('renders skill name', () => {
    render(<SkillBadge skill="React" />);
    expect(screen.getByText('React')).toBeInTheDocument();
  });
});
```

Run tests:

```bash
npm test
```

## Performance Optimization

### Image Optimization

Use Next.js Image component:

```typescript
import Image from 'next/image';

<Image
  src="/projects/image.png"
  alt="Project screenshot"
  width={800}
  height={600}
  priority={false}  // Use true for above-the-fold images
/>
```

### Code Splitting

Next.js automatically splits code by route. For dynamic imports:

```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
});
```

### Bundle Analysis

```bash
npm install --save-dev @next/bundle-analyzer

# Update next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)

# Run analysis
ANALYZE=true npm run build
```

## Debugging

### VS Code Debugging

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node",
      "request": "attach",
      "port": 9229,
      "cwd": "${workspaceFolder}",
      "restart": true,
      "protocol": "inspector"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

### Console Logging

```typescript
console.log('Debug info:', variable);
console.error('Error:', error);
console.warn('Warning:', warning);
```

### React DevTools

Install React DevTools browser extension for debugging React components.

## Git Workflow

### Branch Naming

```
feature/add-blog-section
fix/contact-form-validation
docs/update-readme
```

### Commit Messages

```
feat: add new project showcase
fix: correct skill category ordering
docs: update deployment guide
style: improve mobile navigation
refactor: simplify project card component
```

### Pull Request Process

1. Create feature branch
2. Make changes
3. Test locally
4. Commit with descriptive messages
5. Push to GitHub
6. Create pull request
7. Request review
8. Merge after approval

## Troubleshooting

### Port 3000 Already in Use

```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use different port
npm run dev -- -p 3001
```

### Module Not Found Errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
npm install

# Restart dev server
npm run dev
```

### TypeScript Errors

```bash
# Type check
npm run type-check

# Fix common issues
npm install --save-dev typescript@latest
```

### Styling Not Applied

1. Check class names are correct
2. Verify Tailwind config includes file
3. Restart dev server
4. Clear browser cache

## Resources

- **Next.js Docs**: https://nextjs.org/docs
- **TailwindCSS Docs**: https://tailwindcss.com/docs
- **TypeScript Docs**: https://www.typescriptlang.org/docs
- **React Docs**: https://react.dev
- **Lucide Icons**: https://lucide.dev

## Getting Help

- Check existing GitHub issues
- Review Next.js documentation
- Ask in Next.js Discord community
- Check browser console for errors
- Use VS Code debugger

---

Happy coding! 🚀
