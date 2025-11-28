FROM node:18-alpine AS frontend-builder

# Build AUTONIX Frontend
WORKDIR /app/frontend
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

# Build whitepaper with webpack
FROM node:18-alpine AS whitepaper-builder
WORKDIR /app/whitepaper
COPY whitepaper/package*.json ./
RUN npm install
COPY whitepaper/ ./
RUN npm run build

# Production stage with Nginx
FROM nginx:alpine

# Copy built frontend files to root
COPY --from=frontend-builder /app/frontend/dist/ /usr/share/nginx/html/

# Copy built whitepaper files
COPY --from=whitepaper-builder /app/whitepaper/dist/ /usr/share/nginx/html/whitepaper/

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8000

CMD ["nginx", "-g", "daemon off;"]