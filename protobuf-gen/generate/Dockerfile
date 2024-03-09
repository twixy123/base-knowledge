FROM node:16.14.2

RUN apt update -y && apt upgrade -y
RUN apt install -y protobuf-compiler

RUN npm install -g protoc-gen-grpc-web

CMD protoc -I=./protobuf-gen/grpc/proto order_service.proto --js_out=import_style=commonjs,binary:./protobuf-gen/grpc/code-gen --grpc-web_out=import_style=typescript,mode=grpcwebtext:./protobuf-gen/grpc/code-gen
