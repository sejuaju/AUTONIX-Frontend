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

# Copy built frontend files
COPY --from=frontend-builder /app/frontend/dist/ /usr/share/nginx/html/autonix-frontend/

# Copy built whitepaper files
COPY --from=whitepaper-builder /app/whitepaper/dist/ /usr/share/nginx/html/whitepaper/

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create index page for root with navigation
RUN echo '<html><head><title>AUTONIX Platform</title><style>body{font-family:Arial,sans-serif;max-width:800px;margin:50px auto;padding:20px;background:#f5f5f5}.container{background:white;padding:40px;border-radius:10px;box-shadow:0 4px 6px rgba(0,0,0,0.1)}.title{color:#667eea;text-align:center;margin-bottom:30px}.nav-links{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:20px;margin-top:30px}.nav-link{display:block;padding:20px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;text-decoration:none;border-radius:8px;text-align:center;transition:transform 0.3s ease}.nav-link:hover{transform:translateY(-2px)}.nav-link h3{margin:0 0 10px 0}.nav-link p{margin:0;opacity:0.9;font-size:14px}.whitepaper{background:linear-gradient(135deg,#10b981 0%,#059669 100%)}.website{background:linear-gradient(135deg,#3b82f6 0%,#1d4ed8 100%)}</style></head><body><div class="container"><h1 class="title">🚀 AUTONIX Platform</h1><p style="text-align:center;color:#666;margin-bottom:30px;">Selamat datang di ekosistem AUTONIX</p><div class="nav-links"><a href="/autonix-frontend/" class="nav-link website"><h3>🌐 AUTONIX Website</h3><p>Website utama AUTONIX dengan Astro</p></a><a href="/whitepaper/" class="nav-link whitepaper"><h3>📄 Whitepaper</h3><p>Dokumentasi teknis AUTONIX</p></a></div></div></body></html>' > /usr/share/nginx/html/index.html

EXPOSE 8000

CMD ["nginx", "-g", "daemon off;"]