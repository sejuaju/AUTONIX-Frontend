FROM nginx:alpine


COPY automix/ /usr/share/nginx/html/automix/


COPY nginx.conf /etc/nginx/conf.d/default.conf


RUN echo '<html><head><meta http-equiv="refresh" content="0; url=/automix/whitepaper/"></head><body><p>Redirecting to <a href="/automix/whitepaper/">AUTONIX Whitepaper</a>...</p></body></html>' > /usr/share/nginx/html/index.html

EXPOSE 8000

CMD ["nginx", "-g", "daemon off;"]