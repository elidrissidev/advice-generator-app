import './AdviceCard.css'

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
    </div>
  )
}

export default AdviceCard
