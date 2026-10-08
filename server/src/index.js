import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const researchEntries = [
  {
    id: 1,
    cancerType: 'Breast Cancer',
    stage: 'Metastatic',
    biomarker: 'HER2-positive',
    therapy: 'Trastuzumab deruxtecan',
    score: 96,
    status: 'Phase III',
    evidenceLevel: 'High confidence',
    summary: 'Antibody-drug conjugate with strong response in HER2-positive metastatic disease.',
    keyFindings: ['HER2 amplification', 'Progression-free survival', 'Targeted payload'],
    tags: ['precision oncology', 'ADC', 'biomarker']
  },
  {
    id: 2,
    cancerType: 'Lung Cancer',
    stage: 'Advanced',
    biomarker: 'PD-L1 high',
    therapy: 'Dual checkpoint inhibition',
    score: 91,
    status: 'Phase II',
    evidenceLevel: 'High confidence',
    summary: 'Combination immunotherapy improves response in PD-L1-positive non-small cell lung cancer.',
    keyFindings: ['Immune activation', 'Checkpoint blockade', 'Tumor response'],
    tags: ['immunotherapy', 'PD-L1', 'combination']
  },
  {
    id: 3,
    cancerType: 'Prostate Cancer',
    stage: 'Hormone resistant',
    biomarker: 'PSA rebound',
    therapy: 'AR-targeted precision therapy',
    score: 88,
    status: 'Phase II',
    evidenceLevel: 'Moderate confidence',
    summary: 'Androgen receptor pathway targets show benefit in resistant disease signals.',
    keyFindings: ['AR signaling', 'PSA surveillance', 'Resistance reversal'],
    tags: ['androgen receptor', 'precision medicine']
  },
  {
    id: 4,
    cancerType: 'Glioblastoma',
    stage: 'Recurrent',
    biomarker: 'MGMT unmethylated',
    therapy: 'Tumor vaccine + immune modulation',
    score: 84,
    status: 'Phase I/II',
    evidenceLevel: 'Emerging',
    summary: 'Immune infiltration signals show promise in recurrent glioblastoma.',
    keyFindings: ['Tumor microenvironment', 'Immune infiltration', 'Recurrence control'],
    tags: ['brain cancer', 'vaccine', 'immune therapy']
  }
];

const knowledgeEntries = [
  {
    title: 'Biomarker-driven matching',
    details: 'Patients with receptor-positive signatures show increased benefit from targeted therapy combinations.'
  },
  {
    title: 'Combination therapy advantage',
    details: 'Multimodal treatment strategies outperform monotherapy in recurrent and metastatic disease patterns.'
  },
  {
    title: 'Liquid biopsy monitoring',
    details: 'Serial ctDNA measurement reduces time to therapy adjustment in dynamic disease states.'
  }
];

const clinicalStudies = [
  {
    id: 'NCT-1042',
    title: 'Precision immunotherapy in PD-L1 high NSCLC',
    phase: 'Phase II',
    status: 'Recruiting',
    site: 'Memorial Sloan Kettering',
    summary: 'Assessing dual checkpoint inhibition and biomarker-guided selection.'
  },
  {
    id: 'NCT-2045',
    title: 'HER2-targeted ADC in metastatic breast cancer',
    phase: 'Phase III',
    status: 'Active',
    site: 'Dana-Farber Cancer Institute',
    summary: 'Comparative study of targeted conjugate therapy versus standard treatment.'
  },
  {
    id: 'NCT-3121',
    title: 'AR-targeted therapy in resistant prostate cancer',
    phase: 'Phase II',
    status: 'Interim analysis',
    site: 'Johns Hopkins',
    summary: 'Exploring biomarker-guided persistence and resistance reversal.'
  }
];

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'cancer-research-api' });
});

app.get('/api/research', (req, res) => {
  const query = String(req.query.query || '').toLowerCase();
  const cancer = String(req.query.cancer || 'All');

  const filtered = researchEntries.filter((entry) => {
    const matchesCancer = cancer === 'All' || entry.cancerType === cancer;
    const haystack = [
      entry.cancerType,
      entry.biomarker,
      entry.therapy,
      entry.summary,
      entry.status,
      entry.tags.join(' '),
      entry.keyFindings.join(' ')
    ].join(' ').toLowerCase();

    const matchesQuery = !query || haystack.includes(query);
    return matchesCancer && matchesQuery;
  });

  const highPriority = filtered.filter((entry) => entry.score >= 90).length;
  const activeTrials = filtered.filter((entry) => entry.status.includes('Phase')).length;

  res.json({
    data: filtered,
    summary: {
      totalStudies: filtered.length,
      highPriority,
      activeTrials,
      promisingTherapies: filtered
        .slice()
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map((entry) => entry.therapy)
    }
  });
});

app.get('/api/recommendations', (req, res) => {
  const recommendations = [
    {
      cancerType: 'Breast Cancer',
      recommendation: 'Prioritize HER2-positive targeted ADC regimens with biomarker-matched sequencing.',
      confidence: 95,
      impact: '+18.6% response lift'
    },
    {
      cancerType: 'Lung Cancer',
      recommendation: 'Expand dual checkpoint therapy for PD-L1-high subgroups and monitor ctDNA response.',
      confidence: 91,
      impact: '+14.9% response lift'
    },
    {
      cancerType: 'Glioblastoma',
      recommendation: 'Test multi-modal immune modulation with real-time tumor microenvironment tracking.',
      confidence: 82,
      impact: '+11.2% survival gain'
    }
  ];

  res.json({ recommendations });
});

app.get('/api/studies', (req, res) => {
  res.json({ studies: clinicalStudies });
});

app.get('/api/knowledge', (req, res) => {
  res.json({ knowledge: knowledgeEntries });
});

app.listen(PORT, () => {
  console.log(`Cancer research API listening on http://localhost:${PORT}`);
});
