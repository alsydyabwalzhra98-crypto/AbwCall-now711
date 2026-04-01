# Deployment Guide

## Deployment Options

### Option 1: Docker & Docker Compose (Recommended)

#### Prerequisites
- Docker
- Docker Compose

#### Setup

1. Clone the repository:
```bash
git clone <repo-url>
cd abu-alzahra-voip
```

2. Create `.env` files:
```bash
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

3. Update environment variables in both `.env` files

4. Build and run:
```bash
docker-compose up --build
```

The app will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

### Option 2: Manual Deployment

#### Frontend Deployment (Vercel/Netlify)

1. Build the app:
```bash
cd frontend
npm install
npm run build
```

2. Deploy to Vercel:
```bash
npm i -g vercel
vercel
```

Or deploy to Netlify through GitHub.

#### Backend Deployment (Heroku/Railway/DigitalOcean)

**Heroku:**
1. Create Heroku app:
```bash
heroku create your-app-name
```

2. Set environment variables:
```bash
heroku config:set DATABASE_URL=<your-db-url>
heroku config:set SECRET_KEY=<your-secret-key>
```

3. Deploy:
```bash
git push heroku main
```

**Railway:**
1. Connect GitHub repository
2. Set environment variables in Railway dashboard
3. Deploy automatically on push

**DigitalOcean App Platform:**
1. Connect GitHub repository
2. Configure build and run commands
3. Set environment variables
4. Deploy

### Option 3: Cloud Platforms

#### AWS
1. Use AWS Amplify for frontend
2. Use AWS Lambda + RDS for backend (serverless)
3. Use AWS S3 for media storage

#### Google Cloud
1. Use Cloud Run for backend
2. Use Firebase Hosting for frontend
3. Use Cloud SQL for database

#### Azure
1. Use Azure App Service for backend
2. Use Azure Static Web Apps for frontend
3. Use Azure Database for PostgreSQL

## Database Setup

### PostgreSQL Initialization

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE abualzahra_voip;

# Create user
CREATE USER voip_user WITH PASSWORD 'secure_password';

# Grant privileges
ALTER ROLE voip_user SET client_encoding TO 'utf8';
ALTER ROLE voip_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE voip_user SET default_transaction_deferrable TO on;
ALTER ROLE voip_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE abualzahra_voip TO voip_user;
```

### Run Migrations

```bash
cd backend
alembic upgrade head
```

## Environment Variables

### Frontend (.env)
```
EXPO_PUBLIC_API_URL=https://api.yourdomain.com/api
EXPO_PUBLIC_WEBSOCKET_URL=wss://api.yourdomain.com/ws
EXPO_PUBLIC_TWILIO_ACCOUNT_SID=your-sid
EXPO_PUBLIC_TWILIO_AUTH_TOKEN=your-token
EXPO_PUBLIC_FIREBASE_API_KEY=your-key
```

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@host:5432/db
SECRET_KEY=your-very-secure-random-key
TWILIO_ACCOUNT_SID=your-sid
TWILIO_AUTH_TOKEN=your-token
STRIPE_SECRET_KEY=your-key
ENVIRONMENT=production
DEBUG=False
```

## Security Checklist

- [ ] Set `DEBUG=False` in production
- [ ] Use strong `SECRET_KEY`
- [ ] Enable HTTPS/SSL certificate
- [ ] Set CORS origins properly
- [ ] Configure firewall rules
- [ ] Use environment-specific variables
- [ ] Enable database backups
- [ ] Set up monitoring and logging
- [ ] Enable rate limiting
- [ ] Use secure password hashing

## Performance Optimization

### Backend
```python
# Use connection pooling
SQLALCHEMY_POOL_SIZE = 20
SQLALCHEMY_POOL_RECYCLE = 3600

# Cache with Redis
REDIS_URL = "redis://localhost:6379/0"

# Use async where possible
# Use CDN for static assets
```

### Frontend
```json
{
  "optimization": {
    "minimize": true,
    "splitChunks": {
      "chunks": "all"
    }
  }
}
```

## Monitoring & Logging

### Backend Monitoring
- Use Sentry for error tracking
- Set up CloudWatch logs
- Monitor database performance
- Track API response times

### Frontend Monitoring
- Use Crashlytics for crashes
- Monitor app performance
- Track user analytics

### Logging
```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('app.log'),
        logging.StreamHandler()
    ]
)
```

## Backup & Recovery

### Database Backup
```bash
# Backup
pg_dump -U voip_user -h localhost abualzahra_voip > backup.sql

# Restore
psql -U voip_user -h localhost abualzahra_voip < backup.sql
```

### Automated Backups
- Use AWS RDS automated backups
- Set up daily backup schedule
- Store backups in S3
- Test restore procedures

## CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to production
        run: |
          # Your deployment commands
          git push heroku main
```

## Troubleshooting

### Common Issues

**Database connection errors:**
```bash
# Check database URL
echo $DATABASE_URL

# Test connection
psql $DATABASE_URL -c "SELECT 1"
```

**Port already in use:**
```bash
# Find process using port
lsof -i :8000

# Kill process
kill -9 <PID>
```

**SSL certificate errors:**
```bash
# Update certificates
python -m certifi
```

## Rollback Procedures

```bash
# Docker rollback
docker-compose down
git revert <commit-hash>
docker-compose up --build

# Database rollback
alembic downgrade -1
```

## Support

For deployment issues:
- Check logs: `docker-compose logs -f`
- Review environment variables
- Verify database connectivity
- Check firewall rules
