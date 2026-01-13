# Deployment Guide

This guide covers deploying the portfolio website to a VPS using Docker and Coolify.

## Prerequisites

- VPS with Docker and Docker Compose installed
- Domain name pointing to VPS IP
- Git repository access
- Coolify installed on VPS (optional but recommended)

## Option 1: Coolify (Recommended)

Coolify provides automated deployments with zero-downtime updates and automatic SSL.

### Setup

1. **Access Coolify Dashboard**:
   - Navigate to your Coolify instance (usually `https://your-vps:3000`)
   - Log in with your credentials

2. **Add New Application**:
   - Click "New Application"
   - Select "Docker Compose"
   - Choose "GitHub" as source

3. **Configure Repository**:
   - Connect your GitHub account
   - Select the portfolio repository
   - Set branch to `main`
   - Set root directory to `portfolio-app`

4. **Configure Build**:
   - Build command: `npm run build` (or leave default)
   - Start command: `npm start` (or leave default)
   - Port: `3000`

5. **Configure Domain**:
   - Add your domain (e.g., `ryan-stephens.dev`)
   - Coolify will automatically provision SSL via Let's Encrypt

6. **Deploy**:
   - Click "Deploy"
   - Coolify will build and start the application
   - Monitor logs in real-time

### Automatic Deployments

Once configured, every push to `main` branch triggers automatic deployment:

```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

Coolify will:
1. Pull latest code
2. Build Docker image
3. Run health checks
4. Start new container
5. Stop old container (zero-downtime)

## Option 2: Manual Docker Deployment

For VPS without Coolify or custom setup.

### Initial Setup

1. **SSH into VPS**:
   ```bash
   ssh user@your-vps.com
   ```

2. **Clone Repository**:
   ```bash
   cd /opt
   git clone https://github.com/ryan-stephens/portfolio.git
   cd portfolio/portfolio-app
   ```

3. **Create Environment File**:
   ```bash
   cat > .env.production << EOF
   NEXT_PUBLIC_SITE_URL=https://ryan-stephens.dev
   NODE_ENV=production
   EOF
   ```

4. **Build and Start**:
   ```bash
   docker-compose up -d --build
   ```

5. **Verify Running**:
   ```bash
   docker-compose ps
   docker-compose logs -f portfolio
   ```

### Reverse Proxy Setup (Nginx)

If using Nginx as reverse proxy:

```nginx
server {
    listen 80;
    server_name ryan-stephens.dev www.ryan-stephens.dev;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name ryan-stephens.dev www.ryan-stephens.dev;

    ssl_certificate /etc/letsencrypt/live/ryan-stephens.dev/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/ryan-stephens.dev/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### SSL Certificate (Let's Encrypt)

```bash
# Install certbot
sudo apt-get install certbot python3-certbot-nginx

# Generate certificate
sudo certbot certonly --nginx -d ryan-stephens.dev -d www.ryan-stephens.dev

# Auto-renewal (usually automatic)
sudo systemctl enable certbot.timer
```

### Updates

To update the application:

```bash
cd /opt/portfolio/portfolio-app

# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose up -d --build

# View logs
docker-compose logs -f portfolio
```

## Option 3: Traefik (Advanced)

For multiple applications with automatic SSL and load balancing.

### docker-compose.yml with Traefik

```yaml
version: '3.8'

services:
  traefik:
    image: traefik:v2.10
    command:
      - "--api.insecure=true"
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--entrypoints.web.address=:80"
      - "--entrypoints.websecure.address=:443"
      - "--certificatesresolvers.letsencrypt.acme.httpchallenge=true"
      - "--certificatesresolvers.letsencrypt.acme.httpchallenge.entrypoint=web"
      - "--certificatesresolvers.letsencrypt.acme.email=ryan.stephens15@gmail.com"
      - "--certificatesresolvers.letsencrypt.acme.storage=/letsencrypt/acme.json"
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./letsencrypt:/letsencrypt
    networks:
      - traefik-network

  portfolio:
    build:
      context: .
      dockerfile: Dockerfile
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.portfolio.rule=Host(`ryan-stephens.dev`)"
      - "traefik.http.routers.portfolio.entrypoints=websecure"
      - "traefik.http.routers.portfolio.tls.certresolver=letsencrypt"
      - "traefik.http.services.portfolio.loadbalancer.server.port=3000"
    restart: unless-stopped
    networks:
      - traefik-network

networks:
  traefik-network:
    driver: bridge
```

## Environment Variables

### Development (.env.local)

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Production (.env.production)

```env
NEXT_PUBLIC_SITE_URL=https://ryan-stephens.dev
NODE_ENV=production
```

### Contact Form Integration

Add email service credentials:

```env
# Resend
RESEND_API_KEY=your_resend_api_key

# SendGrid
SENDGRID_API_KEY=your_sendgrid_api_key

# Mailgun
MAILGUN_API_KEY=your_mailgun_api_key
MAILGUN_DOMAIN=your_mailgun_domain
```

## Monitoring

### Health Checks

Docker Compose includes health checks:

```bash
docker-compose ps
```

### Logs

```bash
# Real-time logs
docker-compose logs -f portfolio

# Last 100 lines
docker-compose logs --tail=100 portfolio

# Specific time range
docker-compose logs --since 2024-01-12 portfolio
```

### Resource Usage

```bash
docker stats portfolio
```

### Uptime Monitoring

Use external monitoring services:
- **Uptime Robot**: Free uptime monitoring
- **Healthchecks.io**: Cron job monitoring
- **New Relic**: Full application monitoring

## Backup & Recovery

### Backup

```bash
# Backup entire application directory
tar -czf portfolio-backup-$(date +%Y%m%d).tar.gz /opt/portfolio

# Upload to cloud storage
aws s3 cp portfolio-backup-*.tar.gz s3://your-bucket/backups/
```

### Recovery

```bash
# Restore from backup
tar -xzf portfolio-backup-20240112.tar.gz -C /opt

# Restart application
cd /opt/portfolio/portfolio-app
docker-compose up -d --build
```

## Troubleshooting

### Application Won't Start

```bash
# Check logs
docker-compose logs portfolio

# Rebuild from scratch
docker-compose down
docker system prune -a
docker-compose up -d --build
```

### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Or change port in docker-compose.yml
```

### SSL Certificate Issues

```bash
# Check certificate expiration
openssl x509 -in /etc/letsencrypt/live/ryan-stephens.dev/fullchain.pem -noout -dates

# Renew certificate
sudo certbot renew --force-renewal

# Check Traefik logs
docker-compose logs traefik
```

### High Memory Usage

```bash
# Check container stats
docker stats portfolio

# Increase memory limit in docker-compose.yml
services:
  portfolio:
    deploy:
      resources:
        limits:
          memory: 1G
```

## Performance Optimization

### Caching Headers

Add to Nginx config or Next.js headers:

```nginx
# Cache static assets for 1 year
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# Don't cache HTML
location ~* \.html$ {
    expires -1;
    add_header Cache-Control "no-cache, no-store, must-revalidate";
}
```

### CDN Integration

Use Cloudflare or similar CDN:

1. Update domain nameservers to CDN
2. Configure SSL/TLS mode (Full or Flexible)
3. Enable caching rules
4. Monitor performance in CDN dashboard

## Security

### Firewall Rules

```bash
# Allow only necessary ports
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS
sudo ufw enable
```

### Regular Updates

```bash
# Update system packages
sudo apt-get update && sudo apt-get upgrade

# Update Docker images
docker-compose pull
docker-compose up -d
```

### Secrets Management

Never commit secrets to repository. Use:
- Environment variables
- Docker secrets
- Vault services
- CI/CD secret management

## Deployment Checklist

- [ ] Domain DNS configured
- [ ] SSL certificate provisioned
- [ ] Environment variables set
- [ ] Contact form service configured
- [ ] Health checks passing
- [ ] Logs monitored
- [ ] Backup strategy in place
- [ ] Monitoring/alerting configured
- [ ] Firewall rules applied
- [ ] Performance optimized

## Support

For issues or questions:
- Check logs: `docker-compose logs -f`
- Review Docker documentation
- Check Next.js deployment guide
- Contact hosting provider support

---

Last updated: January 2026
