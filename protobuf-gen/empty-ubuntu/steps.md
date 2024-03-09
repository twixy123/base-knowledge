## Ubuntu

**Dockerfile**

```dockerfile
FROM ubuntu:latest
CMD tail -f /dev/null
```

* Create Docker image
  * `docker build -t empty-ubuntu-image .`
* Run Docker container
  * `docker run -d --name empty-ubuntu-container empty-ubuntu-image tail -f /dev/null`
* Dive into Docker container
  * `docker exec -it empty-ubuntu-container bash`
* Update all packages
  * `apt update && apt upgrade`
* Install protobuf
  * `apt install -y protobuf-compiler`
* Check protobuf version
  * `protoc --version`
* install curl
  * `apt-get -y install curl`
* Add NodeSource into filesystem
  * `curl -fsSL https://deb.nodesource.com/setup_16.x`
* Install node js
  * `apt-get install -y nodejs`
* install npm
  * `apt-get -y install npm`
* Install proto-gen to npm packages
  * `npm install -g protoc-gen-grpc-web`
* Add execute folder into PATH
  * `PATH=$PATH:node_modules/.bin`
* Create protobuf-gen/grpc
  * `mkdir protobuf-gen`
  * `cd protobuf-gen`
  * `mkdir grpc`
  * `cd grpc`
* Create folder proto and code-gen
  * `mkdir proto`
  * `mkdir code-gen`
* Put proto file into proto folder
* Execute proto
  * `protoc -I=./proto {file_name}.proto --js_out=import_style=commonjs,binary:./code-gen --grpc-web_out=import_style=typescript,mode=grpcwebtext:./code-gen`
