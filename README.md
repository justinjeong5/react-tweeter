# React Tweeter

## redux
![redux](https://user-images.githubusercontent.com/44011462/105483516-4f28a380-5ced-11eb-965e-5596641ee6b3.png)

## Generator

### Concept
```javascript
const gen = function* () {
  console.log(1);
  yield 1;
  console.log(2);
  yield 2;
  console.log(3);
  yield 3;
}

const generator = gen();
// suspended
generator.next()  // console.log(1)
// { value: 1, done: false }
// suspended
generator.next()  // console.log(2)
// { value: 2, done: false }
// suspended
generator.next()  // console.log(3)
// { value: 3, done: false }
// suspended
generator.next()
// { value: undefined, done: true }
```

### Counter
```javascript
let i = 1;
const gen = function* () {
  while(true){
    yield i++;
  }
}

const timer = setInterval(()=>{
  const counter = gen().next();
  console.log(counter.value)
}, 1000)
```

### EventListener
```javascript
var listener = function* () {
  console.log("first click");
  yield true;
  console.log("second click");
  yield true;
};

var eventListener = listener();
document.getElementById("test")
  .addEventListener('click', (event) => {
    return eventListener.next();
  });
```

## Saga
```javascript
function* watchLogin() {
  yield take(LOGIN_USER_REQUEST, login)
} // accepts request only once.

function* watchLogin() {
  while(true) {
    yield take(LOGIN_USER_REQUEST, login)
  }
} // accepts every request. but low readability.

function* watchLogin() {
  while(true) {
    yield takeEvery(LOGIN_USER_REQUEST, login)
  }
} // equals to above. take all of the duplicated request which lead to server overburden.

function* watchLogin() {
  yield takeLeading(LOGIN_USER_REQUEST, login)
} // takes all of the duplicated request, but only receives the first response. still server overburden remains.

function* watchLogin() {
  yield takeLatest(LOGIN_USER_REQUEST, login)
} // takes all of the duplicated request, but only receives the last response. still server overburden remains.
// ex) most of the events, but server should check whether duplicated request receives or not

function* watchLogin() {
  yield throttle(LOGIN_USER_REQUEST, login, 2000)
} // takes only one of the duplicated request in 2sec.
// ex) scroll event

function* watchLogin() {
  yield debounce(LOGIN_USER_REQUEST, login)
} // takes only one of the duplicated request in 2sec.
// ex) search event
```

## Virtualized

![virtualized](https://user-images.githubusercontent.com/44011462/105692640-fe5db880-5f41-11eb-84c0-83dea11c91c0.png)

The main concept behind virtual rendering is rendering only what is on the screen. There are one thousand data in the app, but it only shows around ten at any moment (the ones that fit on the screen), until you scroll to show more. So it makes sense to load only the elements that are visible and unload them when they are not by replacing them with new ones.

## database 
![relationForTweet](https://user-images.githubusercontent.com/44011462/105812886-4e945380-5ff2-11eb-9f55-8d95b7dbbd15.png)


## aws-ec2

### basic setup for ubuntu
```bash
$ sudo apt-get update
$ sudo apt-get install -y build-essential
```

### npm install for ubuntu
```bash
$ curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash --
$ sudo apt-get install -y nodejs
```

### mysql install for ubuntu
```bash
$ sudo apt-get install -y mysql-server
$ sudo su
$ mysql_secure_installation
$ mysql -u root -p
mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
$ vim .env
$ npx sequelize db:create
```
## aws-lambda

```bash
$ sudo git pull
$ cd lambda/
$ sudo apt install zip
$ sudo curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
$ sudo unzip awscliv2.zip
$ sudo ./aws/install
$ aws configure
  // AWS Access Key ID [None]: ****
  // AWS Secret Access Key [None]: ****
  // Default region name [None]: ap-northeast-2
  //Default output format [None]: json
$ sudo zip -r aws-upload.zip ./*
$ ls  
  // aws-upload.zip
$ aws s3 cp "aws-upload.zip" s3://yourBucketName
```

## https

![nginx](https://user-images.githubusercontent.com/44011462/106407535-a3671c80-647f-11eb-97c7-72cc5fb66743.png)

### ssl certification
```bash
$ sudo apt-get install nginx
$ sudo su
$ vim /etc/nginx/nginx.conf
  # {
  #   ...
  #   server {
  #     server_name tweeter.shinywaterjeong.com
  #     listen 80;
  #     location / {
  #       proxy_set_header HOST $host;
  #       proxy_pass http://127.0.0.1:3000;
  #       proxy_redirect off;
  #     }
  #   }
  #   ...
  # }
$ exit
$ sudo lsof -i tcp:80
  # port 80 should be idle
$ sudo apt install snapd
$ sudo snap install core; sudo snap refresh core
$ sudo snap install --classic certbot
$ sudo certbot --nginx
$ sudo certbot renew --dry-run
  # - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  # Congratulations, all simulated renewals succeeded: 
  #   /etc/letsencrypt/live/yourDomainName/chine.pem (success)
  # - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
```

### success ssl setting
```bash
# /etc/nginx/nginx.conf
{
  ...
  server {
    server_name tweeter.shinywaterjeong.com
    listen 80;
    location / {
      proxy_set_header HOST $host;
      proxy_pass http://127.0.0.1:3000;
      proxy_redirect off;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/tweeter.shinywaterjeong.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/tweeter.shinywaterjeong.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
  }
  server {
    if ($host = tweeter.shinywaterjeong.com) {
      return 301 https://$host$request_uri;
    } # managed by Certbot

    server_name tweeter.shinywaterjeong.com
    listen 80;
    return 404; # managed by Certbot
  }
}
```

## Forest Admin

```bash
# on root dir
$ npm install -g lumber-cli@latest -s
$ lumber generate "databaseName" --connection-url "mysql://root:password@localhost:3306/databaseName" --ssl "false" --application-host "localhost" --application-port "3310" --email "justin.jeong5@gmail.com" --token "****"
$ cd "databaseName"
$ npm install -s
$ npm start
#  https://app.forestadmin.com/projects
```
