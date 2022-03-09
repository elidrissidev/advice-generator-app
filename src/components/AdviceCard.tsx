import './AdviceCard.css'
import { ReactComponent as IconDice } from '@/assets/icon-dice.svg'
import useAdvice from '@/hooks/useAdvice'

function AdviceCard() {
  const { data: advice, refetch, isFetching, isLoading } = useAdvice()
  return (
    <div className="AdviceCard">
      <h1
        className="AdviceCard__advice-number"
        aria-live="polite"
        aria-busy={isFetching}
      >
        {isLoading ? 'Loading...' : `Advice #${advice?.id}`}
      </h1>
      <blockquote className="AdviceCard__quote">
        <p className="quote__content" aria-live="polite" aria-busy={isFetching}>
          {isLoading ? 'Loading...' : `“${advice?.advice}”`}
        </p>
      </blockquote>
      <div className="AdviceCard__divider"></div>
      <GenerateAdvice onClick={() => refetch()} disabled={isFetching} />
    </div>
  )
}

type GenerateAdviceProps = React.ButtonHTMLAttributes<HTMLButtonElement>

function GenerateAdvice(props: GenerateAdviceProps) {
  return (
    <button type="button" className="GenerateAdvice" {...props}>
      <IconDice pointerEvents="none" />
      <span>Generate Advice</span>
    </button>
  )
}

export default AdviceCard
