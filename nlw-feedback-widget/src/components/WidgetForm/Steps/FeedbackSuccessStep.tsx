import { CloseButton } from "../../CloseButton";
import success from "../../../assets/Success.svg"

interface FeedbackSuccessStepProps{
  onFeedbackRestartRequested: () => void
}

export function FeedbackSuccessStep({onFeedbackRestartRequested}: FeedbackSuccessStepProps){
  return(
    <>
      <header>
        <CloseButton/>
      </header>

      <div className="flex flex-col items-center py-10 w-[304px]">
        <img src={success}></img>

        <span className="text-wl mt-2"> Agradecemos o Feedback </span>

        <button
        onClick={onFeedbackRestartRequested}
          className="py-2 px-6 mt-2 bg-zinc-800 rounded-md border-transparent text-sm leading-6 hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 disabled:opacity-50 disabled:hover:bg-brand"
        >
          Quero enviar outro
        </button>
      </div>
    </>
  )
}