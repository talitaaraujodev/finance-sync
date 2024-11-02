resource "aws_sqs_queue" "receivables_queue" {
  name                       = var.sqs_queue_name
  visibility_timeout_seconds = var.sqs_visibility_timeout
  message_retention_seconds  = var.sqs_message_retention
  delay_seconds              = var.sqs_delay_seconds
  max_message_size           = var.sqs_max_message_size
  receive_wait_time_seconds  = var.sqs_receive_wait_time
}

resource "aws_sqs_queue_policy" "receivables_queue_policy" {
  queue_url = aws_sqs_queue.receivables_queue.id

  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Effect" : "Allow",
        "Principal" : "*",
        "Action" : "sqs:SendMessage",
        "Resource" : aws_sqs_queue.receivables_queue.arn,
        "Condition" : {
          "ArnEquals" : {
            "aws:SourceArn" : "arn:aws:ses:${var.aws_region}:${var.aws_account_id}:identity/${var.ses_domain}"
          }
        }
      }
    ]
  })
}

# Output da URL da fila
output "receivables_queue_url" {
  value = aws_sqs_queue.receivables_queue.id
}
