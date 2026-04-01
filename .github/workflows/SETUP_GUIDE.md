# GitHub Actions Build Setup Guide

## Overview

This project includes automated build workflows for Android (APK) and iOS (IPA) using Expo Application Services (EAS).

**Workflows Created:**
- `.github/workflows/android-build.yml` - Builds Android APK
- `.github/workflows/ios-build.yml` - Builds iOS IPA

## Prerequisites

1. **GitHub Repository** - Your project must be pushed to GitHub
2. **Expo Account** - Create a free account at https://expo.dev
3. **EAS CLI** - Already configured in the workflows

## Setup Steps

### Step 1: Create Expo Account

1. Go to https://expo.dev/signup
2. Create a free account
3. Verify your email

### Step 2: Create GitHub Repository Secrets

Go to your GitHub repository:
1. Settings → Secrets and variables → Actions
2. Click "New repository secret"

Add the following secrets:

**Required:**
```
EXPO_TOKEN=<your-expo-token>
```

**Optional (but recommended):**
```
TWILIO_ACCOUNT_SID=<your-twilio-sid>
TWILIO_AUTH_TOKEN=<your-twilio-token>
TWILIO_PHONE_NUMBER=+1234567890

FIREBASE_API_KEY=<your-firebase-key>
FIREBASE_AUTH_DOMAIN=<your-firebase-domain>
FIREBASE_PROJECT_ID=<your-firebase-project>
FIREBASE_STORAGE_BUCKET=<your-firebase-bucket>
FIREBASE_MESSAGING_SENDER_ID=<your-sender-id>
FIREBASE_APP_ID=<your-firebase-app>
FIREBASE_DATABASE_URL=<your-firebase-url>
```

### Step 3: Generate Expo Token

```bash
# In your terminal (with Expo CLI installed)
eas login
eas token create

# Copy the token to your GitHub secrets as EXPO_TOKEN
```

### Step 4: Configure EAS (First Time Only)

If you haven't initialized EAS in your frontend directory:

```bash
cd frontend
eas build:configure
# Answer the prompts to configure Android and iOS builds
```

This creates `eas.json` in the frontend directory.

### Step 5: Push to GitHub

```bash
git add .github/
git commit -m "Add GitHub Actions build workflows"
git push origin main
```

## Triggering Builds

Builds are automatically triggered on:

1. **Push to main/develop branches**
   ```bash
   git push origin main
   ```

2. **Pull requests to main**
   ```bash
   git push origin feature-branch
   # Create PR to main
   ```

3. **Manual trigger (GitHub UI)**
   - Go to Actions tab
   - Select the workflow
   - Click "Run workflow"

## Accessing Build Artifacts

### During Workflow Run
1. Go to your GitHub repository
2. Click "Actions" tab
3. Select the latest workflow run
4. Download artifact from "Artifacts" section

### After Successful Build
- **Android APK**: Available as `android-apk` artifact
- **iOS IPA**: Available as `ios-ipa` artifact (requires macos-latest)

## Monitoring Builds

1. Go to Actions tab in your GitHub repo
2. Watch the workflow progress
3. Check logs if build fails
4. Download APK/IPA when complete

## Troubleshooting

### Build Fails with "EXPO_TOKEN not found"
- Ensure EXPO_TOKEN secret is added to your repository
- Check secret name matches exactly (case-sensitive)
- Token may have expired; create a new one

### "eas build" command not found
- Ensure EAS is properly configured
- Run `eas build:configure` in frontend directory
- Commit `eas.json` to repository

### Out of Free Build Minutes
- EAS provides limited free builds (60 min/month)
- Check your account at https://expo.dev
- Consider upgrading or waiting for monthly reset

### Configuration Environment Variables Missing
- Add missing secrets to GitHub repository
- Update .github/workflows/android-build.yml
- Redeploy by pushing a new commit

## Advanced Configuration

### Custom Build Configuration

Edit `frontend/eas.json` to customize:
- Build environment
- Release channel
- Build profiles
- Credentials

Example:
```json
{
  "build": {
    "android": {
      "release": {
        "distribution": "internal"
      }
    }
  }
}
```

### Scheduled Builds

To build automatically on schedule (e.g., daily):

```yaml
on:
  schedule:
    - cron: '0 2 * * *'  # 2 AM daily UTC
```

### Different Environments

Create separate workflows:
- `android-build-staging.yml`
- `android-build-production.yml`

Use different branches or tags to trigger.

## Server Configuration

The workflows are configured to use:
- **API Endpoint**: `http://abualzahracom.online:8000/api`
- **WebSocket**: `wss://abualzahracom.online:8000/ws`

To change the server URL:
1. Edit `.github/workflows/android-build.yml`
2. Change `EXPO_PUBLIC_API_URL` value
3. Push to trigger rebuild

## Security Best Practices

1. ✅ Never commit `.env` files
2. ✅ Use GitHub Secrets for sensitive data
3. ✅ Rotate tokens regularly
4. ✅ Use branch protection rules
5. ✅ Review workflow logs for exposed secrets
6. ✅ Limit secret access to specific workflows

## Next Steps

1. Create `.github/workflows/` directory
2. Add both YAML files (android-build.yml, ios-build.yml)
3. Add required secrets to GitHub
4. Generate and add EXPO_TOKEN
5. Commit and push to main
6. Watch Actions tab for first build
7. Download APK/IPA artifacts

## Additional Resources

- [Expo EAS Documentation](https://docs.expo.dev/eas/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Expo GitHub Action](https://github.com/expo/expo-github-action)

## Support

For issues:
1. Check GitHub Actions logs for error details
2. Review EAS documentation
3. Check Expo community forums
4. Visit https://expo.dev/help

---

**Status**: ✅ Workflows created and ready to use
**Next**: Add EXPO_TOKEN secret to GitHub and push code
