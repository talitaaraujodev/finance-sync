module "sqs" {
  source = "./sqs.tf"
}

module "ses" {
  source = "./ses.tf"
}

module "ec2" {
  source = "./ec2.tf"
}
