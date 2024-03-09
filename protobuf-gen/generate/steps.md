## Node

**Dockerfile**

```dockerfile
FROM node:16.14.2

RUN apt update -y && apt upgrade -y
RUN apt install -y protobuf-compiler

RUN npm install -g protoc-gen-grpc-web

CMD protoc -I=./protobuf-gen/grpc/proto {file-name}.proto --js_out=import_style=commonjs,binary:./protobuf-gen/grpc/code-gen --grpc-web_out=import_style=typescript,mode=grpcwebtext:./protobuf-gen/grpc/code-gen
```

**Makefile**

```makefile
proto-gen:
	docker build -t proto-generate-image .
	docker run -d -v ./grpc:/protobuf-gen/grpc --name proto-generate-container proto-generate-image

delete-proto-payload:
	docker rm proto-generate-container --force
	docker rmi proto-generate-image --force

gen-proto-with-remove:
	make proto-gen
	make delete-proto-payload
```

**Execute .sh file**

```shell
#!/bin/bash
cd generate && make proto-gen
```

* Start docker on your machine
* Run executable file
  * `/bin/bash ./{executable-file-name}.sh`
