## Node

**Dockerfile**

```dockerfile
FROM node:16.14.2
CMD tail -f /dev/null
```

* Create Docker image
  * `docker build -t empty-node-image .`
* Run Docker container
  * `docker run -d -v ./grpc:/protobuf-gen/grpc --name empty-node-container empty-node-image tail -f /dev/null`
* Dive into Docker container
  * `docker exec -it empty-node-container bash`
* Update all packages
  * `apt update -y && apt upgrade -y`
* Install protobuf
  * `apt install -y protobuf-compiler`
* Check protobuf version
  * `protoc --version`
* Install proto-gen to npm packages
  * `npm install -g protoc-gen-grpc-web`
* Execute proto
  * `protoc -I=./protobuf-gen/grpc/proto order_service.proto --js_out=import_style=commonjs,binary:./protobuf-gen/grpc/code-gen --grpc-web_out=import_style=typescript,mode=grpcwebtext:./protobuf-gen/grpc/code-gen`
