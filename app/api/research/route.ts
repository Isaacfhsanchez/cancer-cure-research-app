"use client";

import { useEffect, useMemo, useState } from "react";

type ResearchRecord = {
  id: string;
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

type Recommendation = {
  id: string;
  cancerType: string;
  recommendation: string;
  confidence: number;
  impact: string;
};

type Summary = {
  totalStudies: number;
  highPriority: number;
  activeTrials: number;
  promisingTherapies: string[];
};

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [selectedCancer, setSelectedCancer] = useState("All");
  const [records, setRecords] = useState<ResearchRecord[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [knowledge, setKnowledge] = useState<{ id: string; title: string; details: string }[]>([]);
  const [summary, setSummary] = useState<Summary>({ totalStudies: 0, highPriority: 0, activeTrials: 0, promisingTherapies: [] });
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("admin@oncology.research");
  const [password, setPassword] = useState("demo123");
  const [name, setName] = useState("Dr. Maya Chen");
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [authError, setAuthError] = useState("");

  const cancerOptions = useMemo(
    () => ["All", "Breast Cancer", "Lung Cancer", "Prostate Cancer", "Glioblastoma", "Leukemia"],
    []
  );

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ query: search, cancer: selectedCancer });
      const res = await fetch(`/api/research?${params.toString()}`);
      const json = await res.json();
      setRecords(json.data || []);
      setSummary(json.summary || { totalStudies: 0, highPriority: 0, activeTrials: 0, promisingTherapies: [] });

      const recRes = await fetch("http://localhost:4000/api/recommendations");
      const recJson = await recRes.json();
      setRecommendations(recJson.recommendations || []);

      const knowledgeRes = await fetch("http://localhost:4000/api/knowledge");
      const knowledgeJson = await knowledgeRes.json();
      setKnowledge(knowledgeJson.knowledge || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search, selectedCancer]);

  const login = async () => {
    setAuthError("");
    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const payload = await res.json();
      if (!res.ok) {
        throw new Error(payload.error || "Login failed");
      }

      setToken(payload.token);
      setUser(payload.user);
      await fetchData();
    } catch (error) {
      setAuthError((error as Error).message);
    }
  };

  const register = async () => {
    setAuthError("");
    try {
      const res = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const payload = await res.json();
      if (!res.ok) {
        throw new Error(payload.error || "Registration failed");
      }

      setToken(payload.token);
      setUser(payload.user);
      await fetchData();
    } catch (error) {
      setAuthError((error as Error).message);
    }
  };

  return (
    <main className="page-shell">
      {!token ? (
        <section className="auth-panel">
          <div>
            <p className="eyebrow">Cancer Cure Research Access</p>
            <h1>Secure oncology research workspace</h1>
            <p className="hero-copy">
              Sign in to access treatment intelligence, trial tracking, knowledge synthesis, and AI-driven recommendation workflows.
            </p>
          </div>

          <div className="auth-form">
            <label>
              Full name
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Dr. Maya Chen" />
            </label>
            <label>
              Email
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@oncology.research" />
            </label>
            <label>
              Password
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            </label>

            {authError ? <div className="error-box">{authError}</div> : null}

            <div className="auth-actions">
              <button className="primary-button" onClick={login}>Login</button>
              <button className="secondary-button" onClick={register}>Register</button>
            </div>
          </div>
        </section>
      ) : (
        <>
          <section className="hero-panel">
            <div>
              <p className="eyebrow">Cancer Cure Research Platform</p>
              <h1>Accelerate oncologic discovery with evidence-driven AI insights.</h1>
              <p className="hero-copy">
                Welcome back, {user?.name || "researcher"}. Review promising therapies, monitor clinical direction, and prioritize actionable cancer pathways.
              </p>
            </div>
            <div className="hero-actions">
              <button className="primary-button">Generate Strategy</button>
              <button className="secondary-button" onClick={() => setToken("")}>Log out</button>
            </div>
          </section>

          <section className="stats-grid">
            <StatCard label="Total studies" value={summary.totalStudies.toString()} accent="purple" />
            <StatCard label="High-priority signals" value={summary.highPriority.toString()} accent="blue" />
            <StatCard label="Active trials" value={summary.activeTrials.toString()} accent="teal" />
            <StatCard label="Promising therapies" value={summary.promisingTherapies.length.toString()} accent="orange" />
          </section>

          <section className="search-panel">
            <div className="search-wrap">
              <span className="search-icon">⌕</span>
              <input
                type="text"
                placeholder="Search by cancer type, biomarker, therapy, or keyword"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
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
            <div className="panel">
              <div className="panel-header">
                <h2>AI recommendation engine</h2>
                <span className="badge success">Live</span>
              </div>

              <div className="recommendation-box">
                <div className="mini-kpi">
                  <strong>Top priority</strong>
                  <span>{summary.promisingTherapies[0] || "Targeted ADC"}</span>
                </div>
                <div className="mini-kpi">
                  <strong>Attention</strong>
                  <span>{records[0]?.biomarker || "HER2-positive"}</span>
                </div>
                <div className="mini-kpi">
                  <strong>Projected impact</strong>
                  <span>+18.6% response lift</span>
                </div>
              </div>

              <ul className="recommendation-list">
                {recommendations.length ? recommendations.map((item) => (
                  <li key={item.id}>
                    <strong>{item.cancerType}</strong>
                    <div>{item.recommendation}</div>
                    <small>{item.confidence}% confidence • {item.impact}</small>
                  </li>
                )) : <li>No recommendations available.</li>}
              </ul>
            </div>

            <div className="panel">
              <div className="panel-header">
                <h2>Knowledge base</h2>
                <span className="badge accent">Updated</span>
              </div>
              <ul className="bullet-list">
                {knowledge.length ? knowledge.map((item) => (
                  <li key={item.id}><strong>{item.title}</strong><div>{item.details}</div></li>
                )) : <li>Knowledge base is loading.</li>}
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
                    <p className="card-meta">{item.stage} • {item.biomarker} • {item.status}</p>
                    <p className="summary">{item.summary}</p>

                    <div className="key-findings">
                      {item.keyFindings.map((finding) => <span key={finding}>{finding}</span>)}
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
        </>
      )}
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
