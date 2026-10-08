"use client";

import { useEffect, useMemo, useState } from "react";

type ResearchRecord = {
  id: number;
  cancerType: string;
  stage: string;
  biomarker: string;
  therapy: string;
  score: number;
  status: string;
  evidenceLevel: string;
  summary: string;
  keyFindings: string[];
  tags: string[];
};

type Summary = {
  totalStudies: number;
  highPriority: number;
  activeTrials: number;
  promisingTherapies: string[];
};

const defaultQuery = "";

export default function HomePage() {
  const [search, setSearch] = useState(defaultQuery);
  const [selectedCancer, setSelectedCancer] = useState("All");
  const [records, setRecords] = useState<ResearchRecord[]>([]);
  const [summary, setSummary] = useState<Summary>({
    totalStudies: 0,
    highPriority: 0,
    activeTrials: 0,
    promisingTherapies: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          query: search,
          cancer: selectedCancer,
        });

        const res = await fetch(`/api/research?${params.toString()}`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error("Failed to fetch research data");
        }

        const json = await res.json();
        setRecords(json.data);
        setSummary(json.summary);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [search, selectedCancer]);

  const cancerOptions = useMemo(
    () => ["All", "Breast Cancer", "Lung Cancer", "Prostate Cancer", "Glioblastoma", "Leukemia", "Melanoma"],
    []
  );

  return (
    <main className="page-shell">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">Cancer Cure Research Platform</p>
          <h1>Accelerate oncologic discovery with AI-powered insights.</h1>
          <p className="hero-copy">
            Track high-potential therapies, analyze biomarker-driven patterns, and surface the most promising
            clinical directions across cancer types.
          </p>
        </div>
        <div className="hero-actions">
          <button className="primary-button">Generate Strategy</button>
          <button className="secondary-button">View Research Queue</button>
        </div>
      </section>

      <section className="stats-grid">
        <StatCard label="Total studies" value={summary.totalStudies.toString()} accent="purple" />
        <StatCard label="High-priority signals" value={summary.highPriority.toString()} accent="blue" />
        <StatCard label="Active trials" value={summary.activeTrials.toString()} accent="teal" />
        <StatCard label="Promising therapies" value={summary.promisingTherapies.length.toString()} accent="orange" />
      </section>

      <section className="search-panel">
        <div className="toolbar-row">
          <div className="search-wrap">
            <span className="search-icon">⌕</span>
            <input
              type="text"
              placeholder="Search by cancer type, biomarker, therapy, or keyword"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="filter-row">
          {cancerOptions.map((option) => (
            <button
              key={option}
              className={selectedCancer === option ? "chip active" : "chip"}
              onClick={() => setSelectedCancer(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </section>

      <section className="insight-layout">
        <div className="panel recommendations-panel">
          <div className="panel-header">
            <h2>AI recommendation engine</h2>
            <span className="badge success">Live</span>
          </div>

          <div className="recommendation-box">
            <div className="mini-kpi">
              <strong>Top priority</strong>
              <span>{summary.promisingTherapies[0] || "Immunotherapy combination"}</span>
            </div>
            <div className="mini-kpi">
              <strong>Attention</strong>
              <span>{records[0]?.biomarker || "HER2"}</span>
            </div>
            <div className="mini-kpi">
              <strong>Projected impact</strong>
              <span>+18.6% response lift</span>
            </div>
          </div>

          <ul className="recommendation-list">
            {summary.promisingTherapies.length > 0 ? (
              summary.promisingTherapies.map((therapy) => <li key={therapy}>{therapy}</li>)
            ) : (
              <li>Dual checkpoint inhibition and targeted receptor blockade</li>
            )}
          </ul>
        </div>

        <div className="panel knowledge-panel">
          <div className="panel-header">
            <h2>Knowledge base</h2>
            <span className="badge accent">Updated</span>
          </div>
          <ul className="bullet-list">
            <li>Combination therapy shows stronger remission in biomarker-positive subgroups.</li>
            <li>PD-L1 expression correlates with improved checkpoint inhibition response.</li>
            <li>Liquid biopsy monitoring reduces treatment delay in metastatic profiles.</li>
          </ul>
        </div>
      </section>

      <section className="panel results-panel">
        <div className="panel-header">
          <h2>Research portfolio</h2>
          <span className="badge neutral">{records.length} matched</span>
        </div>

        {loading ? (
          <div className="loading-state">Loading research signals…</div>
        ) : records.length === 0 ? (
          <div className="empty-state">No studies matched your current search. Try a different term.</div>
        ) : (
          <div className="card-grid">
            {records.map((item) => (
              <article className="study-card" key={item.id}>
                <div className="card-topline">
                  <span className="tag cancer-tag">{item.cancerType}</span>
                  <span className="tag score-tag">Score {item.score}</span>
                </div>

                <h3>{item.therapy}</h3>
                <p className="card-meta">
                  {item.stage} • {item.biomarker} • {item.status}
                </p>

                <p className="summary">{item.summary}</p>

                <div className="key-findings">
                  {item.keyFindings.map((finding) => (
                    <span key={finding}>{finding}</span>
                  ))}
                </div>

                <div className="card-footer">
                  <span className="evidence-level">{item.evidenceLevel}</span>
                  <button className="small-button">Open brief</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function StatCard({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className={`stat-card ${accent}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
