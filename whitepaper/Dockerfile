FROM nginx:alpine

# Copy website files
COPY automix/ /usr/share/nginx/html/automix/

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create index page for root (optional)
RUN echo '<html><head><meta http-equiv="refresh" content="0; url=/automix/whitepaper/"></head><body><p>Redirecting to <a href="/automix/whitepaper/">AUTONIX Whitepaper</a>...</p></body></html>' > /usr/share/nginx/html/index.html

EXPOSE 8000

CMD ["nginx", "-g", "daemon off;"]