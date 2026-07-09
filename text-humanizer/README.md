# Text Humanizer

Paste text to scan for patterns commonly associated with AI writing, then review what was found and how to fix it.

## Features

- Paste window for source text
- Findings window showing:
  - what AI detectors look for
  - what was found in your text
  - how to correct it
- Risk score based on stacked detector-style signals
- Burstiness / sentence-variation check
- Filters for High / Medium / Low findings

## Criteria used

Based on publicly discussed AI-detection signals:

1. Low perplexity / predictable phrasing
2. Low burstiness (uniform sentence rhythm)
3. AI-favored vocabulary
4. Hedging verbs and empty intensifiers
5. Formulaic transitions and sentence templates
6. Vague generality / low specificity

## Easiest way to open

Download **`Text-Humanizer.html`** and double-click it.

Or open:

`text-humanizer/index.html`

## Disclaimer

This is a revision checklist, not proof of authorship. Detectors can false-flag formal human writing and can miss polished AI text.
