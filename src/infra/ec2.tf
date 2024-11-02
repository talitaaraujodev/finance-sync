# Definição do Security Group para permitir acesso HTTP e SSH
resource "aws_security_group" "finance_sync_sg" {
  name_prefix = var.security_group_name_prefix

  ingress {
    description = "Allow HTTP traffic"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = var.http_cidr_blocks
  }

  ingress {
    description = "Allow HTTPS traffic"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = var.https_cidr_blocks
  }

  ingress {
    description = "Allow SSH access"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = var.ssh_cidr_blocks
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Definição da Instância EC2
resource "aws_instance" "finance_sync_instance" {
  ami             = var.ami_id
  instance_type   = var.instance_type
  subnet_id       = module.vpc.public_subnets[0]
  security_groups = [aws_security_group.finance_sync_sg.name]

  tags = {
    Name = var.instance_name
  }

  user_data = <<-EOF
              #!/bin/bash
              apt-get update -y
              apt-get install -y nodejs npm
              # outros comandos para iniciar o servidor
              EOF
}

output "instance_public_ip" {
  value = aws_instance.finance_sync_instance.public_ip
}
