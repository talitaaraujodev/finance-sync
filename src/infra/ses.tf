# Identidade do domínio para enviar e-mails
resource "aws_ses_domain_identity" "finance_sync_identity" {
  domain = var.ses_domain
}

# Configuração de DKIM para autenticação do domínio SES
resource "aws_ses_domain_dkim" "finance_sync_dkim" {
  domain = aws_ses_domain_identity.finance_sync_identity.domain
}

# Política para permitir que o SES envie e-mails em nome do domínio
resource "aws_ses_identity_policy" "finance_sync_ses_policy" {
  name     = var.ses_policy_name
  identity = aws_ses_domain_identity.finance_sync_identity.arn

  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Effect" : "Allow",
        "Principal" : "*",
        "Action" : var.ses_actions,
        "Resource" : aws_ses_domain_identity.finance_sync_identity.arn
      }
    ]
  })
}

output "ses_domain_identity_arn" {
  value = aws_ses_domain_identity.finance_sync_identity.arn
}
