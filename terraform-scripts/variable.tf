variable "profile" {
  description = "AWS User account Profile"
  default = "zkenes"
}

variable "region" {
  default = "eu-central-1"
}

variable "key" {
  description = "Enter Key name"
  default = "digital-lab-key"
}

variable "sub_ids" {
  default = []
}

variable "instance-ami" {
  default = "ami-0f686bcf073842e84" # AMI of Mumbai region
}

variable "instance_type" {
  default = "t2.micro"
}


variable "cluster-name" {
  description = "Cluster Name"
  default = "digital-labs-cluster"
}

variable "server-name" {
  description = "Ec2 Server Name"
  default = "digital-labs-server"
}

variable "vpc_name" {
  description = "VPC name"
  default = "digital-labs-vpc"
}
