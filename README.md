# Installation

### Prerequisites

```
node 8<
npm 
docker
terraform 0.11.11
```

### Manually

1. Install required dependencies

```
npm install
```

2. Run project 

``` 
npm start
```

### Using docker

1. Run docker image

```
docker run -d --name project_name zkenes/node-app:V1
```

### Using Terraform 

```
cd terraform-scripts
terraform init && terraform apply
```

and run our app
```
kubectl run app --image=zkenes/node-app:V1
```



