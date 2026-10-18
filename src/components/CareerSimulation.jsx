import { useState } from 'react'
import { Check, X, RefreshCw, Play, Info, Droplets, Megaphone } from 'lucide-react'
import Card from './Card.jsx'
import Button from './Button.jsx'
import Badge from './Badge.jsx'
import { cn } from '../utils/format.js'

const AGRI = {
  title: 'Water management on a tomato plot',
  prompt:
    "A farmer's half-acre tomato plot starts wilting in the afternoon. The village borewell runs only two hours a day. What would you try first?",
  icon: Droplets,
  options: [
    {
      id: 'a',
      label: 'Water the whole field every morning for longer',
      correct: false,
      feedback:
        'More water everywhere uses up the limited borewell time and can waterlog the soil. Plants may still wilt because roots cannot reach air. Good instinct to act, but efficiency matters more than quantity.',
    },
    {
      id: 'b',
      label: 'Set up drip irrigation with mulch on the root zones',
      correct: true,
      feedback:
        'Excellent. Drip delivers water directly to roots and mulch reduces evaporation, so the same two hours of water goes much further. This is a practical, low-cost agri-tech solution.',
    },
    {
      id: 'c',
      label: 'Stop watering to save the limited water',
      correct: false,
      feedback:
        'Saving water is important, but stopping entirely will harm the crop. The goal is smart use, not no use — drip and mulching cut waste while keeping plants healthy.',
    },
  ],
}

const MARKETING = {
  title: 'Promoting local honey',
  prompt:
    'A local family sells pure forest honey. They have a smartphone and no website. Which promotion approach would you suggest?',
  icon: Megaphone,
  options: [
    {
      id: 'a',
      label: 'Post the same message on every platform to everyone',
      correct: false,
      feedback:
        'Broadcasting the same message to everyone rarely works and can confuse people. A focused audience and a clear story perform much better with the same effort.',
    },
    {
      id: 'b',
      label: 'Target health-conscious urban buyers with short, honest videos',
      correct: true,
      feedback:
        'Strong choice. A clear audience, real footage of the honey and the family story builds trust and matches the product to people who value pure, local honey.',
    },
    {
      id: 'c',
      label: 'Create a brand-new account in English with no photos',
      correct: false,
      feedback:
        'Without photos or a warm local tone, buyers cannot see the quality. Visuals and authentic storytelling are the biggest strengths of a small local seller.',
    },
  ],
}

export default function CareerSimulation({ type }) {
  const data = type === 'marketing' ? MARKETING : AGRI
  const [choice, setChoice] = useState(null)
  const Icon = data.icon
  const selected = data.options.find((o) => o.id === choice)

  return (
    <Card className="border-forest-200">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-forest-50 text-forest-700">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-forest-600">Career exploration exercise</p>
          <h3 className="text-base font-bold text-charcoal-900">{data.title}</h3>
        </div>
      </div>

      <p className="mt-4 rounded-xl border border-sage-200 bg-cream-50 p-4 text-sm text-charcoal-700">
        <Play className="mr-1.5 inline h-3.5 w-3.5 text-forest-600" />
        {data.prompt}
      </p>

      <div className="mt-4 space-y-2.5">
        {data.options.map((o) => {
          const isSelected = choice === o.id
          return (
            <button
              key={o.id}
              onClick={() => setChoice(o.id)}
              className={cn(
                'flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition',
                isSelected
                  ? o.correct
                    ? 'border-forest-400 bg-forest-50'
                    : 'border-saffron-300 bg-saffron-50'
                  : 'border-sage-200 bg-white hover:border-forest-300'
              )}
            >
              <span
                className={cn(
                  'mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[10px] font-bold uppercase',
                  isSelected
                    ? o.correct
                      ? 'border-forest-500 bg-forest-600 text-white'
                      : 'border-saffron-500 bg-saffron-500 text-white'
                    : 'border-sage-300 text-charcoal-400'
                )}
              >
                {o.id}
              </span>
              <span className="flex-1 font-semibold text-charcoal-800">{o.label}</span>
              {isSelected && (o.correct ? <Check className="h-4 w-4 text-forest-600" /> : <X className="h-4 w-4 text-saffron-600" />)}
            </button>
          )
        })}
      </div>

      {selected && (
        <div
          className={cn(
            'mt-4 rounded-xl border p-4 animate-fade-in',
            selected.correct ? 'border-forest-200 bg-forest-50' : 'border-saffron-200 bg-saffron-50'
          )}
        >
          <div className="flex items-center gap-2">
            <Badge tone={selected.correct ? 'success' : 'warning'}>
              {selected.correct ? 'Good choice' : 'Try another idea'}
            </Badge>
          </div>
          <p className="mt-2 text-sm text-charcoal-700">{selected.feedback}</p>
          <Button variant="ghost" size="sm" className="mt-3 px-0 text-forest-700" icon={RefreshCw} onClick={() => setChoice(null)}>
            Try again
          </Button>
        </div>
      )}

      <p className="mt-4 flex items-start gap-2 text-xs text-charcoal-500">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        {type === 'marketing'
          ? 'A simplified educational exercise about audiences and messaging — not a professional job simulation.'
          : 'A simplified educational exercise about irrigation choices — not a professional job simulation.'}
      </p>
    </Card>
  )
}
