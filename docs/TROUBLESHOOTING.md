# Troubleshooting Guide

## Frontend Issues

### App Won't Start
```bash
# Clear cache and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

### Port Already in Use
```bash
# Find and kill process
lsof -i :19000
kill -9 <PID>
```

### Android/iOS Build Errors
```bash
# Clear Expo cache
expo cache:clean

# Rebuild
expo build:android
expo build:ios
```

### WebRTC Connection Issues
- Ensure STUN servers are accessible
- Check device permissions (audio/microphone)
- Verify network connectivity

### Storage Issues
```bash
# Clear AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';
AsyncStorage.clear();
```

## Backend Issues

### Database Connection Error
```
Error: could not translate host name "localhost" to address
```

**Solution:**
```bash
# Check DATABASE_URL
echo $DATABASE_URL

# Connect directly
psql postgresql://user:password@localhost/dbname
```

### Migration Errors
```bash
# View migration history
alembic history

# Downgrade one step
alembic downgrade -1

# Re-run migrations
alembic upgrade head
```

### JWT Token Issues

**Invalid token signature:**
- Verify `SECRET_KEY` is consistent
- Check token expiration time
- Validate token format

```python
# Debug token
import jwt
token = "your-token"
jwt.decode(token, options={"verify_signature": False})
```

### API Port Not Accessible
```bash
# Check if server is running
ps aux | grep uvicorn

# Start server
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### CORS Errors
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
```python
# Check CORS configuration in backend/app/core/config.py
BACKEND_CORS_ORIGINS = ["http://localhost:3000", "https://yourdomain.com"]
```

## Common Errors

### Error 401 - Unauthorized
- Token expired or invalid
- Check `Authorization` header format
- Verify token in storage

### Error 403 - Forbidden
- User lacks required permissions
- Check user role/permissions
- Verify authentication state

### Error 404 - Not Found
- Incorrect endpoint URL
- Resource doesn't exist
- Check API documentation

### Error 500 - Internal Server Error
```bash
# Check backend logs
docker logs backend

# Check server status
curl http://localhost:8000/health
```

## Network Issues

### WebSocket Connection Fails
```javascript
// Check WebSocket URL
console.log('WS URL:', process.env.EXPO_PUBLIC_WEBSOCKET_URL);

// Test connection
const ws = new WebSocket(wsUrl);
ws.onopen = () => console.log('Connected');
ws.onerror = (err) => console.error('WS Error:', err);
```

### API Request Timeouts
```python
# Increase timeout in axios config
client = axios.create({
  baseURL: API_URL,
  timeout: 30000, // 30 seconds
});
```

## Performance Issues

### Slow API Responses
```bash
# Check database performance
# Monitor query execution
EXPLAIN ANALYZE SELECT ...;

# Add indexes if needed
CREATE INDEX idx_user_email ON users(email);
```

### High Memory Usage
```bash
# Profile frontend
chrome://inspect in Chrome

# Monitor backend
pip install memory-profiler
python -m memory_profiler app.py
```

### Large Bundle Size
```bash
# Analyze bundle
npm run analyze

# Optimize
npm run build:prod
```

## Twilio Issues

### Calls Not Working
```
Error: Unauthorized
```

**Solution:**
```bash
# Verify credentials
echo $TWILIO_ACCOUNT_SID
echo $TWILIO_AUTH_TOKEN
echo $TWILIO_PHONE_NUMBER

# Test Twilio API
curl -X GET "https://api.twilio.com/2010-04-01/Accounts" \
  -u "$ACCOUNT_SID:$AUTH_TOKEN"
```

### Invalid Phone Number
- Ensure format: +[country code][number]
- Verify number is in supported country
- Check Twilio account status

## Firebase Issues

### Authentication Fails
```bash
# Check Firebase config
echo $EXPO_PUBLIC_FIREBASE_PROJECT_ID

# Verify credentials in Firebase Console
# Enable Email/Password authentication
# Check authorized domains
```

### Real-time Database Not Updating
- Check Firebase rules
- Verify network connectivity
- Check database structure

## Docker Issues

### Container Won't Start
```bash
# Check logs
docker-compose logs -f service_name

# Rebuild
docker-compose down
docker-compose up --build
```

### Volume Mount Issues
```bash
# Verify volumes
docker volume ls

# Check permissions
ls -la /path/to/volume
```

## Testing

### Run Tests
```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
pytest -v

# With coverage
pytest --cov=app
```

### Debug Tests
```python
# Add print statements
print("Debug:", value)

# Use pytest debugging
pytest --pdb -s
```

## Debugging Tips

### Enable Debug Mode
```bash
# Frontend
export EXPO_PUBLIC_DEBUG=true

# Backend
export DEBUG=True
```

### Check Logs
```bash
# Frontend (Expo)
npm start -- --clear

# Backend
tail -f app.log

# Docker
docker-compose logs -f
```

### Browser DevTools
```
F12 or Cmd+Opt+I
→ Network tab to inspect requests
→ Console for errors
→ Storage for local data
```

## Getting Help

1. Check logs for specific error messages
2. Search documentation
3. Review GitHub issues
4. Check community forums
5. Create detailed issue report with:
   - Steps to reproduce
   - Error messages
   - System information
   - Screenshots/videos

## Emergency Reset

```bash
# Hard reset frontend
cd frontend
rm -rf node_modules .expo
npm install
npm start

# Hard reset backend
cd backend
rm -rf venv .pytest_cache __pycache__
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
alembic downgrade base
alembic upgrade head

# Full reset
docker-compose down -v
docker-compose up --build
```
