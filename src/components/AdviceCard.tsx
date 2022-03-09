import './AdviceCard.css'
import { ReactComponent as IconDice } from '@/assets/icon-dice.svg'
import useAdvice from '@/hooks/useAdvice'

function AdviceCard() {
  const { data: advice, refetch } = useAdvice()
  return (
    <div className="AdviceCard">
      <h1 className="AdviceCard__advice-number">Advice #{advice?.id}</h1>
      <blockquote className="AdviceCard__quote">
        <p className="quote__content">“{advice?.advice}”</p>
      </blockquote>
      <div className="AdviceCard__divider"></div>
      <GenerateAdvice onClick={refetch} />
    </div>
  )
}

type GenerateAdviceProps = {
  onClick?: VoidFunction
}

function GenerateAdvice({ onClick }: GenerateAdviceProps) {
  return (
    <button type="button" className="GenerateAdvice" onClick={onClick}>
      <IconDice />
      <span>Generate Advice</span>
    </button>
  )
}

export default AdviceCard
