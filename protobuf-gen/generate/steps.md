## Node

**Makefile**

```makefile
proto-gen:
	make delete-proto-payload
	docker build -t proto-generate-image .
	docker run -d -v ./grpc:/protobuf-gen/grpc --name proto-generate-container proto-generate-image

delete-proto-payload:
	-docker stop proto-generate-container
	-docker rm proto-generate-container --force
	-docker rmi proto-generate-image --force

gen-proto-with-remove:
	make proto-gen
	make delete-proto-payload
```

**Dockerfile**

```dockerfile
FROM node:16.14.2

RUN apt update -y && apt upgrade -y
RUN apt install -y protobuf-compiler

RUN npm install -g protoc-gen-grpc-web

CMD protoc -I=./protobuf-gen/grpc/proto {your-proto-file}.proto --js_out=import_style=commonjs,binary:./protobuf-gen/grpc/code-gen --grpc-web_out=import_style=typescript,mode=grpcwebtext:./protobuf-gen/grpc/code-gen
```

**Execute .sh file**

```shell
#!/bin/bash
cd generate && make proto-gen
```

* Start docker on your machine
* Make sure "**Make**" is installed
* Add desired proto file
* Change "your-proto-file" to desired proto file name at Dockerfile
* Run executable file
  * `/bin/bash ./proto-generate.sh`

---

* If "**Make**" isn't installed, do all steps from "proto-gen" command at Makefile
