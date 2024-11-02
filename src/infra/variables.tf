variable "aws_region" {
  description = "Região usada para criar os recursos da AWS"
  type        = string
  default     = "us-east-1"
}

variable "aws_profile" {
  description = "Perfil AWS utilizado para autenticação"
  type        = string
  default     = "tf_talit"
}

data "aws_caller_identity" "current" {}

variable "aws_account_id" {
  description = "ID da conta AWS usada no projeto"
  type        = string
  default     = data.aws_caller_identity.current.account_id
}

variable "ami_id" {
  description = "ID da AMI para a instância EC2"
  type        = string
  default     = "ami-0c55b159cbfafe1f0" # Ubuntu Server 20.04 LTS
}

variable "instance_type" {
  description = "Tipo da instância EC2"
  type        = string
  default     = "t3.micro"
}

variable "security_group_name_prefix" {
  description = "Prefixo do nome do Security Group"
  type        = string
  default     = "finance-sync-sg"
}

variable "http_cidr_blocks" {
  description = "CIDR block para acesso HTTP"
  type        = list(string)
  default     = ["0.0.0.0/0"]
}

variable "https_cidr_blocks" {
  description = "CIDR block para acesso HTTPS"
  type        = list(string)
  default     = ["0.0.0.0/0"]
}

variable "ssh_cidr_blocks" {
  description = "CIDR block para acesso SSH"
  type        = list(string)
  default     = ["0.0.0.0/0"]
}

variable "instance_name" {
  description = "Nome da instância EC2"
  type        = string
  default     = "finance-sync-app"
}
variable "ses_domain" {
  description = "Domínio para configurar a identidade do SES"
  type        = string
  default     = "yourdomain.com"
}

variable "ses_policy_name" {
  description = "Nome da política SES para envio de e-mails"
  type        = string
  default     = "finance-sync-ses-policy"
}

variable "ses_actions" {
  description = "Ações permitidas para o SES"
  type        = list(string)
  default     = ["SES:SendEmail", "SES:SendRawEmail"]
}
variable "sqs_queue_name" {
  description = "Nome da fila SQS para sincronização de recebíveis"
  type        = string
  default     = "finance-sync-receivables-queue"
}

variable "sqs_visibility_timeout" {
  description = "Tempo de visibilidade da mensagem na fila SQS em segundos"
  type        = number
  default     = 60
}

variable "sqs_message_retention" {
  description = "Tempo de retenção de mensagem na fila SQS em segundos"
  type        = number
  default     = 345600 # 4 dias
}

variable "sqs_delay_seconds" {
  description = "Tempo de atraso para mensagens na fila SQS em segundos"
  type        = number
  default     = 0
}

variable "sqs_max_message_size" {
  description = "Tamanho máximo da mensagem na fila SQS em bytes"
  type        = number
  default     = 262144 # 256 KB
}

variable "sqs_receive_wait_time" {
  description = "Tempo de espera para recebimento de mensagens na fila SQS em segundos"
  type        = number
  default     = 0
}
