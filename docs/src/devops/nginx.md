# NGINX

- [NGINX Tutorial for Beginners](https://www.youtube.com/watch?v=9t9Mp0BGnyI&t=5s){target="_blank"}
- [Gloo Failover](https://docs.solo.io/gloo-edge/main/guides/gloo_federation/service_failover/){target="_blank"}

## Introduction

NGINX is open-source web server software used for reverse proxy, load balancing, caching and https SSL termination.

![what is nginx](https://media2.dev.to/dynamic/image/width=1280,height=720,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Ffxcyimfz2388pj7nrct9.jpg){height="300px"}
![nginx](https://media.licdn.com/dms/image/v2/D5612AQGAUqXk7zxViQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1732258247083?e=2147483647&v=beta&t=K6IjqFrfDZ29v4I2k3lXQNFr3jvtHSs3RXNzICQcAww){height="200px"}

```sh
brew install nginx
cd /usr/local/etc/nginx
cat nginx.conf
nginx # starts nginx
```

`nginx.conf` - configures the reverse proxy

## Nginx Terms

- context - blocks
- directives - key value pair

```conf
events { # context
    worker_connections 1024; # directive
}
```

## serve static site

```conf
http {
    
    # types {
    #     text/html html;
    #     text/css css;
    # }
    include mime.types;

    server {
        listen 8080;
        root ./devops/nginx/mysite;
        location / {
            index index.html;
        }
        location /fruits {
            root ./devops/nginx/mysite;
        }
        location /carbs {
            alias ./devops/nginx/mysite;
        }
        location /vegetables {
            root ./devops/nginx/mysite;
            try_files /veggies.html /index.html =404;
        }
        location ~* /count/[0-9] {
            root ./devops/nginx/mysite;
            try_files /count.html /index.html =404;
        }
        # Redirect
        location /crops {
            return 307 /fruits;
        }
        # Rewrite
        rewrite ^/number/(\w+)$ /count/$1 break;
    }
}

events {

}
```

## As Load Balancer

```conf
http {
    upstream backendserver {
        server 127.0.0.1:1111;
        server 127.0.0.1:1112;
        server 127.0.0.1:1113;
        server 127.0.0.1:1114;
    }
}
server {
    listen 8080;
    location / {
        proxy_pass http://backendserver/;
    }
}
```

![How To host Multiple Sites on Nginx with same Domain (FQDN)](https://computingforgeeks.com/wp-content/uploads/2019/11/nginx-configurations.png)
![byte byte go](https://assets.bytebytego.com/diagrams/0423-why-is-nginx-so-popular.png)
