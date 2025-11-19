# Deployment Guide for Google Cloud Run

This guide explains how to deploy the app-studio-web application to Google Cloud Run.

## Prerequisites

1. Google Cloud SDK installed and configured
2. Docker installed (for local testing)
3. A Google Cloud Project with billing enabled

## Fixes Applied

### 1. ts-node ENOENT Error
**Problem**: MCP servers were trying to spawn `ts-node` but it wasn't installed.

**Solution**: Added `ts-node` to dependencies in package.json

### 2. Missing Docker Configuration
**Problem**: No Dockerfile existed for Cloud Run deployment.

**Solution**: Created:
- `Dockerfile` - Multi-stage build for production
- `.dockerignore` - Excludes unnecessary files from build

### 3. PERMISSION_DENIED Error for Pub/Sub
**Problem**: Service account lacks permissions for Google Cloud Pub/Sub.

**Solution**: Follow the IAM configuration steps below.

## Deployment Steps

### Option 1: Using Cloud Build (Recommended)

1. **Set your project ID**:
   ```bash
   gcloud config set project YOUR_PROJECT_ID
   ```

2. **Enable required APIs**:
   ```bash
   gcloud services enable cloudbuild.googleapis.com
   gcloud services enable run.googleapis.com
   gcloud services enable containerregistry.googleapis.com
   ```

3. **Deploy using Cloud Build**:
   ```bash
   gcloud builds submit --config cloudbuild.yaml
   ```

### Option 2: Manual Deployment

1. **Build the Docker image**:
   ```bash
   docker build -t gcr.io/YOUR_PROJECT_ID/app-studio-web:latest .
   ```

2. **Push to Google Container Registry**:
   ```bash
   docker push gcr.io/YOUR_PROJECT_ID/app-studio-web:latest
   ```

3. **Deploy to Cloud Run**:
   ```bash
   gcloud run deploy app-studio-web \
     --image gcr.io/YOUR_PROJECT_ID/app-studio-web:latest \
     --region us-central1 \
     --platform managed \
     --allow-unauthenticated \
     --port 3005 \
     --memory 512Mi
   ```

## Fixing PERMISSION_DENIED Errors

The PERMISSION_DENIED error occurs when the Cloud Run service account doesn't have the necessary permissions.

### Grant Pub/Sub Permissions

1. **Get your Cloud Run service account**:
   ```bash
   gcloud run services describe app-studio-web \
     --region us-central1 \
     --format='value(spec.template.spec.serviceAccountName)'
   ```

2. **Grant Pub/Sub permissions** (if your app uses Pub/Sub):
   ```bash
   # Replace SERVICE_ACCOUNT with the account from step 1
   gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
     --member="serviceAccount:SERVICE_ACCOUNT" \
     --role="roles/pubsub.publisher"

   gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
     --member="serviceAccount:SERVICE_ACCOUNT" \
     --role="roles/pubsub.subscriber"
   ```

3. **If you need more permissions**, you can grant additional roles:
   ```bash
   # For logging
   gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
     --member="serviceAccount:SERVICE_ACCOUNT" \
     --role="roles/logging.logWriter"

   # For metrics
   gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
     --member="serviceAccount:SERVICE_ACCOUNT" \
     --role="roles/monitoring.metricWriter"
   ```

## MCP Server Configuration

If you're using MCP servers (`app-studio-docs` and `crawlee`), you need to configure them properly:

1. **Create a `.claude/mcp.json` file** (if it doesn't exist):
   ```json
   {
     "mcpServers": {
       "app-studio-docs": {
         "command": "npx",
         "args": ["-y", "@your-org/app-studio-docs"]
       },
       "crawlee": {
         "command": "npx",
         "args": ["-y", "@crawlee/cli"]
       }
     }
   }
   ```

2. **Alternative**: If you have custom MCP servers, ensure they're properly packaged and available in node_modules.

## Environment Variables

Set environment variables in Cloud Run:

```bash
gcloud run services update app-studio-web \
  --region us-central1 \
  --set-env-vars "NODE_ENV=production,PORT=3005"
```

## Testing Locally with Docker

1. **Build the image**:
   ```bash
   docker build -t app-studio-web:local .
   ```

2. **Run locally**:
   ```bash
   docker run -p 3005:3005 app-studio-web:local
   ```

3. **Test the application**:
   ```bash
   curl http://localhost:3005
   ```

## Troubleshooting

### ts-node ENOENT Error
- Ensure `ts-node` is in dependencies (not devDependencies)
- Rebuild your Docker image after updating package.json

### PERMISSION_DENIED Error
- Check service account permissions
- Verify the service account has the necessary roles
- Check Cloud Run logs: `gcloud run services logs read app-studio-web --region us-central1`

### Container Build Failures
- Check `.dockerignore` to ensure necessary files aren't excluded
- Verify node_modules are being installed correctly
- Check Docker build logs for specific errors

## Monitoring

View logs in real-time:
```bash
gcloud run services logs tail app-studio-web --region us-central1
```

## Cost Optimization

- Cloud Run only charges when your service is handling requests
- Default memory allocation: 512Mi (adjust based on your needs)
- Consider using Cloud Run's minimum instances for faster cold starts

## Security Best Practices

1. Use a custom service account with minimal required permissions
2. Enable VPC connector if accessing private resources
3. Use Secret Manager for sensitive configuration
4. Keep dependencies updated regularly

## Next Steps

1. Set up continuous deployment with Cloud Build triggers
2. Configure custom domain with Cloud Run
3. Set up monitoring and alerting
4. Implement health checks
