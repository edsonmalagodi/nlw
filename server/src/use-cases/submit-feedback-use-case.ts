import { MailAdapter } from "../adapters/mail-adapter"
import { FeedbackRepository } from "../repositories/feedbacks-repository"

interface SubmitFeedbackUseCaseRequest{
  type: string
  comment: string
  screenshot?: string
}

export class SubmitFeedbackUseCase{
  constructor (
    private feedbacksRepository: FeedbackRepository,
    private mailAdapter: MailAdapter
  ){}

  async execute(request: SubmitFeedbackUseCaseRequest){
    const { type, comment, screenshot } = request

    if(!type){
      throw new Error('Type is required')
    }
    
    if(!comment){
      throw new Error('Type is required')
    }

    if(screenshot && !screenshot.startsWith('data:image/png;base64')){
      throw new Error('Invalid screenshot format.')
    }

    await this.feedbacksRepository.create({
      type,
      comment, 
      screenshot,
    })

    await this.mailAdapter.sendMail({
      subject: 'novo feedback',
      body: [
        `<div>`,
        `<p>Tipo do feedback: ${type} </p>`,
        `<p>Comentário do feedback: ${comment} </p>`,
        screenshot ? `<img src="${screenshot}" />` : ``,
        `</div>`,
      ].join('\n')
    })
  }
}