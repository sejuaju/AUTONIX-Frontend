FROM nginx:alpine

# Copy built files to nginx html directory
COPY dist/ /usr/share/nginx/html/whitepaper/

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create redirect page
RUN echo '<html><head><meta http-equiv="refresh" content="0; url=/whitepaper/"></head><body><p>Redirecting to <a href="/whitepaper/">AUTONIX Whitepaper</a>...</p></body></html>' > /usr/share/nginx/html/index.html

EXPOSE 8000

CMD ["nginx", "-g", "daemon off;"]