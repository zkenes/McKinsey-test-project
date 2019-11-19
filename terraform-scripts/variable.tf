variable "profile" {
  description = "AWS User account Profile"
}

variable "region" {
  default = "us-west-2"
}

variable "key" {
  description = "Enter Key name"
}

variable "sub_ids" {
  default = []
}

variable "instance-ami" {
  default = "ami-b374d5a5"
}

variable "instance_type" {
  default = "t2.micro"
}


variable "cluster-name" {
  description = "Cluster Name"
  default = "digital-lab"
}

variable "server-name" {
  description = "Ec2 Server Name"
  default = "digital-lab"
}

variable "vpc_name" {
  description = "VPC name"
  default = "digital-lab-vpc"
}
