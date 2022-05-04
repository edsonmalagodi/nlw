import express from 'express'
import { prisma } from './prisma'
import nodemailer from 'nodemailer'

const app = express()

app.use(express.json())

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "b866a0ab6c2faa",
    pass: "e3328f9403d738"
  }
});

app.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body

  const feedback = await prisma.feedback.create({
    data:{
      type,
      comment,
      screenshot,
    }
  })

await transport.sendMail({
    from: 'Equipe Dev <edson.malagodi12@gmail.com>',
    to: 'Edson Malagodi <edson.malagodi12@gmail.com>',
    subject: 'Novo feedback',
    html:[
      `<p>Tipo do feedback: ${type} </p>`,
      `<p>Comentário do feedback: ${comment} </p>`,
    ].join('\n')
  })

  return res.status(201).json({ data: feedback })
})

app.listen(3333, () => {
  console.log('HTTP Server running')
})