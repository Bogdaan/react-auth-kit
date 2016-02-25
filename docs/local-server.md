## Setup own server, without Docker and cloud-based solutions

This approach is relevant if you want to:

* speed up your dev-computer
* deploy application on a dedicated server (or vps)
* run app in corporate network

General scheme will looks like:
```
+------+     +------------+      +----------------+
| user +---> | web server +----> | express server |
+------+     +------------+      +----------------+
```

First you need pre-installed and configured linux/nix system (not windows/osx).
I will consider the example of ubuntu-server.

Install nvm (node version manager):

```
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash
```

Then install Node.js 5.x, and setup default node version:
```
$ nvm install 5.4
$ nvm alias default 5.4
```

Then you need process manager for Node.js app server. This may be one of the:

* [pm2](https://github.com/Unitech/pm2)
* [forever](https://github.com/foreverjs/forever)
* other managers...

I chose `pm2`:
```
$ npm install pm2 -g
```

Next you need build you app and upload on server, for example to `/var/www/myapp`
(better to use git hooks or npm task for this).

```
$ BABEL_ENV=production npm run build -- --release && rsync . to@my.host:/var/www/myapp
```

If you app successfully loaded, configure you process manager and start application:

```shell
web@server:/var/www/myapp# NODE_ENV=production PORT=5000 NAME=awesomeapp.com pm2 add --name "my-awesome-app" ./build/server.js

┌─────────────────┬────┬──────┬───────┬────────┬─────────┬────────┬─────────────┬──────────┐
│ App name        │ id │ mode │ pid   │ status │ restart │ uptime │ memory      │ watching │
├─────────────────┼────┼──────┼───────┼────────┼─────────┼────────┼─────────────┼──────────┤
│ my-awesome-app  │ 1  │ fork │ 777   │ online │ 0       │ 0m     │ 7 MB        │ disabled │
└─────────────────┴────┴──────┴───────┴────────┴─────────┴────────┴─────────────┴──────────┘

```

Please note that we have specified `NODE_ENV=production` and other environment
variables (NAME and PORT).

Next you need web server, such as:

* nginx
* apache2
* lighttpd
* other web-servers..

Once you have installed the server, you will need to configure it.

Basic apache2 (with mod_proxy) configuration could look like this:
```
<VirtualHost *:80>
    ServerAdmin i@awesomeapp.com
    ServerName  awesomeapp.com
    ServerAlias www.awesomeapp.com

    ProxyRequests off

    <Proxy *>
            Order deny,allow
            Allow from all
    </Proxy>

    <Location />
            ProxyPass http://127.0.0.1:5000/
            ProxyPassReverse http://127.0.0.1:5000/
    </Location>

</VirtualHost>
```

Basic nginx configuration:
```
upstream nodeserver {
    server 127.0.0.1:5000;
}

server {
    listen 0.0.0.0:80;
    server_name awesomeapp.com;
    access_log /var/log/nginx/awesomeapp.com.log;

    location / {
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header Host $http_host;
      proxy_set_header X-NginX-Proxy true;

      proxy_pass http://nodeserver/;
      proxy_redirect off;
    }
 }
```

Setup and reload web server - now your application server is ready.
