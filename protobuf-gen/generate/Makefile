proto-gen:
	docker build -t proto-generate-image .
	docker run -d -v ./grpc:/protobuf-gen/grpc --name proto-generate-container proto-generate-image

delete-proto-payload:
	docker rm proto-generate-container --force
	docker rmi proto-generate-image --force

gen-proto-with-remove:
	make proto-gen
	make delete-proto-payload
