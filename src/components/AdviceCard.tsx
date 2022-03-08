import './AdviceCard.css'
import { ReactComponent as IconDice } from '@/assets/icon-dice.svg'

function AdviceCard() {
  return (
    <div className="AdviceCard">
      <h1 className="AdviceCard__advice-number">Advice #117</h1>
      <blockquote className="AdviceCard__quote">
        <p className="quote__content">
          “It is easy to sit up and take notice, what's difficult is getting up
          and taking action.”
        </p>
      </blockquote>
      <div className="AdviceCard__divider"></div>
      <GenerateAdvice />
    </div>
  )
}

function GenerateAdvice() {
  return (
    <button type="button" className="GenerateAdvice">
      <IconDice />
      <span>Generate Advice</span>
    </button>
  )
}

export default AdviceCard
