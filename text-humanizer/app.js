const AI_VOCAB = [
  "delve", "delves", "delving",
  "underscore", "underscores", "underscoring",
  "showcase", "showcases", "showcasing",
  "leverage", "leverages", "leveraging",
  "navigate", "navigates", "navigating",
  "multifaceted", "nuanced", "robust",
  "comprehensive", "holistic", "pivotal",
  "crucial", "critical", "landscape",
  "tapestry", "realm", "framework",
  "paradigm", "synergy", "cutting-edge",
  "game-changer", "unlock", "unlocks",
  "foster", "fosters", "fostering",
  "empower", "empowers", "empowering",
];

const HEDGING_VERBS = [
  "ensuring", "ensures", "ensure",
  "highlights", "highlight", "highlighting",
  "supports", "support", "supporting",
  "reflects", "reflect", "reflecting",
  "facilitates", "facilitate", "facilitating",
  "enhances", "enhance", "enhancing",
  "enables", "enable", "enabling",
];

const INTENSIFIERS = [
  "significantly", "effectively", "directly",
  "increasingly", "inherently", "fundamentally",
  "essentially", "ultimately", "notably",
  "particularly", "remarkably", "substantially",
];

const TRANSITIONS = [
  "furthermore", "moreover", "additionally",
  "in conclusion", "in summary", "overall",
  "it is important to note", "it's important to note",
  "in today's landscape", "in today's world",
  "that being said", "as a result",
  "in this regard", "to summarize",
  "first and foremost", "at the end of the day",
];

const FORMULAIC_PATTERNS = [
  {
    id: "plays-role",
    label: "Formulaic 'plays a role' construction",
    regex: /\b[\w'-]+\s+plays?\s+an?\s+(crucial|critical|important|vital|key|significant)\s+role\s+in\b/gi,
    severity: "high",
    detectorLooksFor: "Template sentence shapes such as “X plays a crucial/critical/important role in Y.”",
    howToFix: "Rewrite with a concrete verb. Instead of “X plays a crucial role in Y,” say what X actually does.",
  },
  {
    id: "capable-of",
    label: "Stiff 'capable of' phrasing",
    regex: /\bcapable of\b/gi,
    severity: "medium",
    detectorLooksFor: "Formal AI-leaning substitutions like “capable of” instead of natural “able to.”",
    howToFix: "Replace “capable of” with “able to,” or rewrite the sentence more directly.",
  },
  {
    id: "in-conclusion",
    label: "Template closing phrase",
    regex: /\b(in conclusion|in summary|to summarize|overall,)\b/gi,
    severity: "medium",
    detectorLooksFor: "Neat, repetitive conclusions that restate earlier points with stock closers.",
    howToFix: "End with a specific takeaway, consequence, or next step instead of a stock summary phrase.",
  },
  {
    id: "generic-opener",
    label: "Generic opener / hook formula",
    regex: /\b(in recent years|in today's (world|landscape|society)|it is no secret that|most people|here's the thing)\b/gi,
    severity: "medium",
    detectorLooksFor: "Predictable openings and hooks that appear often in AI drafts.",
    howToFix: "Start with a concrete fact, scene, claim, or example unique to your topic.",
  },
];

const CRITERIA = [
  {
    title: "Low perplexity / predictability",
    body: "AI often chooses the statistically likely next word, producing smooth but unsurprising phrasing.",
  },
  {
    title: "Low burstiness",
    body: "Human writing mixes short and long sentences. AI often keeps a more even sentence rhythm.",
  },
  {
    title: "AI-favored vocabulary",
    body: "Words like delve, leverage, multifaceted, robust, and landscape appear at unusually high rates.",
  },
  {
    title: "Hedging & intensifiers",
    body: "Phrases such as ensuring, highlights, significantly, and effectively can pad ideas without adding evidence.",
  },
  {
    title: "Formulaic structure",
    body: "Balanced paragraphs, stock transitions, and template sentence shapes are common detector signals.",
  },
  {
    title: "Vague generality",
    body: "AI text can stay high-level, overly neat, and short on personal voice, specifics, or sharp opinions.",
  },
];

const SAMPLE_TEXT = `In today's landscape, artificial intelligence plays a crucial role in shaping modern education. Furthermore, it is important to note that these tools ensure students can leverage comprehensive resources effectively. Moreover, educators are capable of navigating multifaceted challenges while fostering a robust learning environment. Overall, AI highlights the synergy between technology and pedagogy, ultimately empowering learners in a holistic manner.`;

const els = {
  input: document.getElementById("inputText"),
  analyzeBtn: document.getElementById("analyzeBtn"),
  sampleBtn: document.getElementById("sampleBtn"),
  clearBtn: document.getElementById("clearBtn"),
  findingsList: document.getElementById("findingsList"),
  riskScore: document.getElementById("riskScore"),
  riskLabel: document.getElementById("riskLabel"),
  issueCount: document.getElementById("issueCount"),
  issueBreakdown: document.getElementById("issueBreakdown"),
  burstinessScore: document.getElementById("burstinessScore"),
  burstinessMeta: document.getElementById("burstinessMeta"),
  wordCount: document.getElementById("wordCount"),
  sentenceCount: document.getElementById("sentenceCount"),
  criteriaGrid: document.getElementById("criteriaGrid"),
};

let currentFindings = [];
let activeFilter = "all";
let analyzeTimer = null;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function tokenizeWords(text) {
  return (text.toLowerCase().match(/[a-z0-9']+/g) || []);
}

function splitSentences(text) {
  return text
    .replace(/\s+/g, " ")
    .trim()
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function stdDev(values) {
  if (values.length < 2) return 0;
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance = values.reduce((sum, v) => sum + (v - mean) ** 2, 0) / values.length;
  return Math.sqrt(variance);
}

function findWordHits(text, wordList) {
  const hits = [];
  const lower = text.toLowerCase();
  wordList.forEach((word) => {
    const regex = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi");
    let match;
    while ((match = regex.exec(text)) !== null) {
      hits.push({
        word: match[0],
        index: match.index,
        snippet: excerptAround(text, match.index, match[0].length),
      });
    }
  });
  return hits;
}

function findPhraseHits(text, phrases) {
  const hits = [];
  phrases.forEach((phrase) => {
    const regex = new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
    let match;
    while ((match = regex.exec(text)) !== null) {
      hits.push({
        phrase: match[0],
        index: match.index,
        snippet: excerptAround(text, match.index, match[0].length),
      });
    }
  });
  return hits;
}

function excerptAround(text, index, length, radius = 42) {
  const start = Math.max(0, index - radius);
  const end = Math.min(text.length, index + length + radius);
  const prefix = start > 0 ? "…" : "";
  const suffix = end < text.length ? "…" : "";
  return `${prefix}${text.slice(start, end).trim()}${suffix}`;
}

function analyzeBurstiness(sentences) {
  const lengths = sentences.map((s) => tokenizeWords(s).length).filter((n) => n > 0);
  if (!lengths.length) {
    return { score: null, mean: 0, sd: 0, min: 0, max: 0, low: false };
  }
  const mean = lengths.reduce((a, b) => a + b, 0) / lengths.length;
  const sd = stdDev(lengths);
  const coefficient = mean ? sd / mean : 0;
  return {
    score: Number(coefficient.toFixed(2)),
    mean: Number(mean.toFixed(1)),
    sd: Number(sd.toFixed(1)),
    min: Math.min(...lengths),
    max: Math.max(...lengths),
    low: lengths.length >= 4 && coefficient < 0.35,
  };
}

function analyzeRepetition(sentences) {
  if (sentences.length < 4) return [];
  const starts = sentences.map((s) => s.toLowerCase().split(/\s+/).slice(0, 3).join(" "));
  const counts = {};
  starts.forEach((s) => {
    counts[s] = (counts[s] || 0) + 1;
  });
  return Object.entries(counts)
    .filter(([, count]) => count >= 3)
    .map(([start, count]) => ({ start, count }));
}

function analyzeParagraphUniformity(text) {
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (paragraphs.length < 3) return null;
  const lengths = paragraphs.map((p) => tokenizeWords(p).length);
  const mean = lengths.reduce((a, b) => a + b, 0) / lengths.length;
  const sd = stdDev(lengths);
  const coefficient = mean ? sd / mean : 0;
  return {
    count: paragraphs.length,
    mean: Number(mean.toFixed(1)),
    coefficient: Number(coefficient.toFixed(2)),
    uniform: coefficient < 0.25,
  };
}

function analyzeSpecificity(text, words) {
  const properNouns = (text.match(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b/g) || [])
    .filter((w) => !["I", "The", "A", "An", "In", "On", "At", "To", "For", "With", "This", "That", "These", "Those", "It", "As"].includes(w));
  const numbers = text.match(/\b\d+(?:\.\d+)?%?\b/g) || [];
  const firstPerson = (text.match(/\b(I|me|my|mine|we|our|ours)\b/gi) || []).length;
  return {
    properNouns: properNouns.length,
    numbers: numbers.length,
    firstPerson,
    thin: words.length >= 80 && properNouns.length + numbers.length + firstPerson < 2,
  };
}

function buildFindings(text) {
  const findings = [];
  const words = tokenizeWords(text);
  const sentences = splitSentences(text);
  const burstiness = analyzeBurstiness(sentences);
  const vocabHits = findWordHits(text, AI_VOCAB);
  const hedgeHits = findWordHits(text, HEDGING_VERBS);
  const intensifierHits = findWordHits(text, INTENSIFIERS);
  const transitionHits = findPhraseHits(text, TRANSITIONS);
  const repetition = analyzeRepetition(sentences);
  const paragraphs = analyzeParagraphUniformity(text);
  const specificity = analyzeSpecificity(text, words);

  if (burstiness.low) {
    findings.push({
      id: "burstiness",
      severity: "high",
      title: "Low sentence burstiness",
      detectorLooksFor: "Uniform sentence length and rhythm. Detectors treat low variation as an AI-like signal.",
      evidence: `Average sentence length ${burstiness.mean} words (range ${burstiness.min}–${burstiness.max}). Burstiness score ${burstiness.score}.`,
      howToFix: "Mix short punchy sentences with longer ones. Break up evenly paced paragraphs and vary openings.",
      category: "structure",
    });
  }

  if (vocabHits.length) {
    const unique = [...new Set(vocabHits.map((h) => h.word.toLowerCase()))];
    findings.push({
      id: "ai-vocab",
      severity: vocabHits.length >= 4 ? "high" : "medium",
      title: "AI-favored vocabulary",
      detectorLooksFor: "Elevated use of words commonly overrepresented in AI writing.",
      evidence: `Found ${vocabHits.length} hit(s): ${unique.slice(0, 8).join(", ")}${unique.length > 8 ? "…" : ""}. Example: “${vocabHits[0].snippet}”`,
      howToFix: "Swap elevated filler words for plain, specific language. Prefer concrete verbs and exact nouns.",
      category: "vocabulary",
      quotes: vocabHits.slice(0, 4).map((h) => h.snippet),
    });
  }

  if (hedgeHits.length) {
    const unique = [...new Set(hedgeHits.map((h) => h.word.toLowerCase()))];
    findings.push({
      id: "hedging",
      severity: hedgeHits.length >= 3 ? "high" : "medium",
      title: "Hedging / padding verbs",
      detectorLooksFor: "Verbs like ensuring, highlights, supports, and reflects used to sound thoughtful without adding detail.",
      evidence: `Found ${hedgeHits.length} hit(s): ${unique.join(", ")}.`,
      howToFix: "Replace hedging verbs with concrete actions, or delete them and state the claim directly.",
      category: "style",
      quotes: hedgeHits.slice(0, 3).map((h) => h.snippet),
    });
  }

  if (intensifierHits.length) {
    const unique = [...new Set(intensifierHits.map((h) => h.word.toLowerCase()))];
    findings.push({
      id: "intensifiers",
      severity: intensifierHits.length >= 3 ? "medium" : "low",
      title: "Empty intensifiers",
      detectorLooksFor: "Adverbs that imply importance or impact without evidence.",
      evidence: `Found ${intensifierHits.length} hit(s): ${unique.join(", ")}.`,
      howToFix: "Keep an intensifier only if you can back it with a number, example, or clear comparison. Otherwise cut it.",
      category: "style",
      quotes: intensifierHits.slice(0, 3).map((h) => h.snippet),
    });
  }

  if (transitionHits.length) {
    const unique = [...new Set(transitionHits.map((h) => h.phrase.toLowerCase()))];
    findings.push({
      id: "transitions",
      severity: transitionHits.length >= 3 ? "high" : "medium",
      title: "Stock transitions and filler connectors",
      detectorLooksFor: "Overused connectors such as Furthermore, Moreover, and It is important to note.",
      evidence: `Found ${transitionHits.length} hit(s): ${unique.join(", ")}.`,
      howToFix: "Delete filler transitions when the logic is already clear, or replace them with content-specific bridges.",
      category: "structure",
      quotes: transitionHits.slice(0, 3).map((h) => h.snippet),
    });
  }

  FORMULAIC_PATTERNS.forEach((pattern) => {
    const matches = [...text.matchAll(pattern.regex)];
    if (!matches.length) return;
    findings.push({
      id: pattern.id,
      severity: pattern.severity,
      title: pattern.label,
      detectorLooksFor: pattern.detectorLooksFor,
      evidence: `Found ${matches.length} example(s). First match: “${matches[0][0]}”`,
      howToFix: pattern.howToFix,
      category: "formula",
      quotes: matches.slice(0, 3).map((m) => excerptAround(text, m.index, m[0].length)),
    });
  });

  if (repetition.length) {
    findings.push({
      id: "sentence-starts",
      severity: "medium",
      title: "Repetitive sentence openings",
      detectorLooksFor: "Cadence uniformity and repeated structural progressions across sentences.",
      evidence: repetition.map((r) => `“${r.start}…” appears ${r.count} times`).join("; "),
      howToFix: "Vary how sentences begin. Alternate subjects, questions, short claims, and concrete details.",
      category: "structure",
    });
  }

  if (paragraphs?.uniform) {
    findings.push({
      id: "paragraph-symmetry",
      severity: "medium",
      title: "Overly uniform paragraph lengths",
      detectorLooksFor: "Structural symmetry: paragraphs of similar size and neat balance.",
      evidence: `${paragraphs.count} paragraphs averaging ${paragraphs.mean} words with low length variation (${paragraphs.coefficient}).`,
      howToFix: "Let some paragraphs stay short. Expand one with an example, and compress another to a sharp point.",
      category: "structure",
    });
  }

  if (specificity.thin) {
    findings.push({
      id: "specificity",
      severity: "high",
      title: "Low specificity / vague generality",
      detectorLooksFor: "High-level claims with few names, numbers, personal details, or sharp commitments.",
      evidence: `Detected ${specificity.properNouns} proper-noun-like items, ${specificity.numbers} numbers, and ${specificity.firstPerson} first-person references in ${words.length} words.`,
      howToFix: "Add concrete examples, names, dates, numbers, or a clear personal stance. Replace abstractions with specifics.",
      category: "content",
    });
  }

  if (words.length >= 40 && !findings.length) {
    findings.push({
      id: "clean",
      severity: "ok",
      title: "No strong AI-pattern flags",
      detectorLooksFor: "Common stacked signals such as AI vocabulary, low burstiness, hedging, and formulaic transitions.",
      evidence: "This pass did not find dense AI-style markers. That does not prove the text is human-written.",
      howToFix: "Still review for voice, accuracy, and specifics. Detectors can miss polished AI text and can also false-flag formal human writing.",
      category: "summary",
    });
  }

  return {
    findings,
    stats: {
      words: words.length,
      sentences: sentences.length,
      burstiness,
      high: findings.filter((f) => f.severity === "high").length,
      medium: findings.filter((f) => f.severity === "medium").length,
      low: findings.filter((f) => f.severity === "low").length,
    },
  };
}

function scoreRisk(result) {
  if (!result.stats.words) return { score: null, label: "Paste text to analyze", color: "" };

  let score = 0;
  result.findings.forEach((f) => {
    if (f.severity === "high") score += 18;
    if (f.severity === "medium") score += 10;
    if (f.severity === "low") score += 5;
  });

  if (result.stats.burstiness.low) score += 8;
  score = Math.min(100, score);

  let label = "Low AI-pattern risk";
  let color = "#047857";
  if (score >= 70) {
    label = "High AI-pattern risk";
    color = "#b91c1c";
  } else if (score >= 40) {
    label = "Moderate AI-pattern risk";
    color = "#c2410c";
  } else if (score >= 20) {
    label = "Mild AI-pattern risk";
    color = "#a16207";
  }

  return { score, label, color };
}

function renderCriteria() {
  els.criteriaGrid.innerHTML = CRITERIA.map(
    (item) => `
      <article class="criteria-card">
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.body)}</p>
      </article>
    `
  ).join("");
}

function renderFindings() {
  const filtered = currentFindings.filter((f) => {
    if (activeFilter === "all") return true;
    return f.severity === activeFilter;
  });

  if (!els.input.value.trim()) {
    els.findingsList.innerHTML = `
      <div class="empty-state">
        Paste text on the left. Findings will appear here with what detectors look for and how to correct it.
      </div>
    `;
    return;
  }

  if (!filtered.length) {
    els.findingsList.innerHTML = `
      <div class="empty-state">No findings in this filter.</div>
    `;
    return;
  }

  els.findingsList.innerHTML = filtered
    .map((f) => {
      const quotes = (f.quotes || [])
        .map((q) => `<div class="quote">${escapeHtml(q)}</div>`)
        .join("");
      return `
        <article class="finding">
          <div class="finding-top">
            <h3>${escapeHtml(f.title)}</h3>
            <span class="severity ${escapeHtml(f.severity)}">${escapeHtml(f.severity.toUpperCase())}</span>
          </div>
          <div class="label">What AI detectors look for</div>
          <p>${escapeHtml(f.detectorLooksFor)}</p>
          <div class="label">What was found</div>
          <p>${escapeHtml(f.evidence)}</p>
          ${quotes}
          <div class="fix-box">
            <div class="label">How to correct it</div>
            <p>${escapeHtml(f.howToFix)}</p>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderStats(result) {
  const risk = scoreRisk(result);
  els.wordCount.textContent = String(result.stats.words);
  els.sentenceCount.textContent = `${result.stats.sentences} sentence${result.stats.sentences === 1 ? "" : "s"}`;

  if (risk.score == null) {
    els.riskScore.textContent = "—";
    els.riskScore.style.color = "";
    els.riskLabel.textContent = risk.label;
    els.issueCount.textContent = "0";
    els.issueBreakdown.textContent = "No scan yet";
    els.burstinessScore.textContent = "—";
    els.burstinessMeta.textContent = "Sentence length variation";
    return;
  }

  els.riskScore.textContent = String(risk.score);
  els.riskScore.style.color = risk.color;
  els.riskLabel.textContent = risk.label;
  els.riskLabel.style.color = risk.color;

  const actionable = result.findings.filter((f) => f.severity !== "ok");
  els.issueCount.textContent = String(actionable.length);
  els.issueBreakdown.textContent = `${result.stats.high} high · ${result.stats.medium} medium · ${result.stats.low} low`;

  if (result.stats.burstiness.score == null) {
    els.burstinessScore.textContent = "—";
    els.burstinessMeta.textContent = "Need more sentences";
  } else {
    els.burstinessScore.textContent = String(result.stats.burstiness.score);
    els.burstinessMeta.textContent = result.stats.burstiness.low
      ? "Low variation (AI-like)"
      : "Healthier variation";
    els.burstinessScore.style.color = result.stats.burstiness.low ? "#b91c1c" : "#047857";
  }
}

function runAnalysis() {
  const text = els.input.value.trim();
  if (!text) {
    currentFindings = [];
    renderStats({
      findings: [],
      stats: { words: 0, sentences: 0, burstiness: { score: null, low: false }, high: 0, medium: 0, low: 0 },
    });
    renderFindings();
    return;
  }

  const result = buildFindings(text);
  currentFindings = result.findings;
  renderStats(result);
  renderFindings();
}

function scheduleAnalysis() {
  clearTimeout(analyzeTimer);
  analyzeTimer = setTimeout(runAnalysis, 250);
}

els.analyzeBtn.addEventListener("click", runAnalysis);
els.input.addEventListener("input", scheduleAnalysis);

els.sampleBtn.addEventListener("click", () => {
  els.input.value = SAMPLE_TEXT;
  runAnalysis();
});

els.clearBtn.addEventListener("click", () => {
  els.input.value = "";
  runAnalysis();
});

document.querySelectorAll(".chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    activeFilter = chip.dataset.filter;
    renderFindings();
  });
});

renderCriteria();
runAnalysis();
