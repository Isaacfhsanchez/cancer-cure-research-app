html {
  color-scheme: dark;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background:
    radial-gradient(circle at top left, rgba(72, 96, 255, 0.2), transparent 30%),
    linear-gradient(180deg, #07141f 0%, #0d1b2a 100%);
  color: #e8f3ff;
}

button,
input {
  font: inherit;
}

.page-shell {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px 80px;
}

.hero-panel,
.panel,
.stat-card,
.search-panel,
.auth-panel,
.auth-form {
  background: rgba(12, 20, 35, 0.76);
  border: 1px solid rgba(139, 160, 201, 0.18);
  box-shadow: 0 12px 32px rgba(2, 10, 20, 0.35);
}

.auth-panel {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 24px;
  padding: 30px 28px;
  border-radius: 24px;
}

.auth-form {
  border-radius: 18px;
  display: grid;
  gap: 14px;
  padding: 22px;
}

.auth-form label {
  display: grid;
  gap: 8px;
  color: #dfeaf9;
  font-size: 0.9rem;
}

.auth-form input {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(140, 170, 216, 0.2);
  border-radius: 10px;
  color: white;
  padding: 12px 14px;
}

.auth-actions {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

.error-box {
  background: rgba(255, 100, 100, 0.12);
  border: 1px solid rgba(255, 100, 100, 0.3);
  color: #ffc7c7;
  border-radius: 10px;
  padding: 10px 12px;
}

.hero-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 28px;
  border-radius: 24px;
  margin-bottom: 28px;
}

.eyebrow {
  margin: 0 0 14px;
  color: #8ad4ff;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 700;
}

.hero-panel h1 {
  margin: 0;
  max-width: 700px;
  font-size: clamp(2.2rem, 3vw, 3.5rem);
  line-height: 1.05;
}

.hero-copy {
  max-width: 700px;
  margin-top: 14px;
  color: #bfd5ef;
  font-size: 1rem;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.primary-button,
.secondary-button,
.small-button,
.chip {
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.primary-button,
.small-button {
  background: linear-gradient(135deg, #7c5cff 0%, #38b6ff 100%);
  color: white;
  font-weight: 700;
}

.primary-button {
  padding: 12px 20px;
}

.secondary-button {
  padding: 12px 18px;
  background: rgba(146, 171, 255, 0.12);
  color: #dfe9ff;
  border: 1px solid rgba(146, 171, 255, 0.25);
}

.primary-button:hover,
.secondary-button:hover,
.small-button:hover,
.chip:hover {
  transform: translateY(-1px);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(150px, 1fr));
  gap: 16px;
  margin-bottom: 28px;
}

.stat-card {
  padding: 20px 18px;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.stat-card span {
  color: #aac0dc;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.stat-card strong {
  font-size: clamp(1.7rem, 2vw, 2.3rem);
}

.stat-card.purple { box-shadow: inset 0 0 0 1px rgba(154, 118, 255, 0.4); }
.stat-card.blue { box-shadow: inset 0 0 0 1px rgba(87, 184, 255, 0.4); }
.stat-card.teal { box-shadow: inset 0 0 0 1px rgba(59, 214, 195, 0.4); }
.stat-card.orange { box-shadow: inset 0 0 0 1px rgba(255, 168, 98, 0.4); }

.search-panel {
  margin-bottom: 24px;
  padding: 18px 20px 16px;
  border-radius: 20px;
}

.search-wrap {
  display: flex;
  align-items: center;
  width: 100%;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(140, 170, 216, 0.2);
  border-radius: 14px;
  padding: 12px 14px;
}

.search-wrap input {
  width: 100%;
  background: transparent;
  border: none;
  color: #edf6ff;
  outline: none;
  font-size: 0.98rem;
}

.search-wrap input::placeholder {
  color: #87a4c7;
}

.search-icon {
  margin-right: 10px;
  color: #7cc9ff;
  font-size: 1.1rem;
}

.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 18px;
}

.chip {
  background: rgba(126, 149, 255, 0.08);
  color: #dfeaff;
  padding: 8px 14px;
  border: 1px solid rgba(126, 149, 255, 0.2);
}

.chip.active {
  background: linear-gradient(135deg, rgba(124, 92, 255, 0.32), rgba(56, 182, 255, 0.25));
  border-color: rgba(152, 170, 255, 0.5);
}

.insight-layout {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 20px;
  margin-bottom: 24px;
}

.panel {
  border-radius: 20px;
  padding: 20px 18px;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.panel-header h2 {
  margin: 0;
  font-size: 1.2rem;
}

.badge {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.badge.success {
  background: rgba(81, 200, 144, 0.15);
  color: #92f0b8;
}

.badge.accent {
  background: rgba(94, 168, 255, 0.15);
  color: #99d6ff;
}

.badge.neutral {
  background: rgba(255, 255, 255, 0.08);
  color: #dfeaf9;
}

.recommendation-box {
  display: grid;
  grid-template-columns: repeat(3, minmax(120px, 1fr));
  gap: 14px;
  margin-bottom: 18px;
}

.mini-kpi {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(146, 171, 255, 0.12);
  border-radius: 14px;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mini-kpi strong {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #9eb9d8;
}

.mini-kpi span {
  font-weight: 700;
  font-size: 1rem;
}

.recommendation-list,
.bullet-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 12px;
}

.recommendation-list li,
.bullet-list li {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(143, 169, 218, 0.1);
  border-radius: 12px;
  padding: 12px 14px;
  line-height: 1.5;
  color: #dfeaf9;
}

.results-panel {
  padding: 20px 18px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 18px;
}

.study-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(160, 178, 227, 0.14);
  border-radius: 18px;
  padding: 18px 16px;
}

.card-topline,
.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.tag {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 0.72rem;
  font-weight: 700;
}

.cancer-tag {
  background: rgba(124, 92, 255, 0.15);
  color: #d3c8ff;
}

.score-tag {
  background: rgba(83, 210, 194, 0.15);
  color: #9ff0e4;
}

.study-card h3 {
  margin: 16px 0 8px;
  font-size: 1.3rem;
}

.card-meta,
.summary {
  color: #bed3ee;
  line-height: 1.6;
}

.key-findings {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 16px 0 14px;
}

.key-findings span {
  display: inline-flex;
  padding: 6px 9px;
  border-radius: 999px;
  background: rgba(102, 107, 255, 0.12);
  border: 1px solid rgba(150, 179, 255, 0.14);
  font-size: 0.75rem;
  color: #dfeafe;
}

.evidence-level {
  color: #9fd7ff;
  font-weight: 700;
}

.small-button {
  padding: 8px 12px;
  font-size: 0.82rem;
}

.loading-state,
.empty-state {
  padding: 30px 16px;
  text-align: center;
  color: #cfe0f8;
  border: 1px dashed rgba(147, 171, 221, 0.25);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.02);
}

@media (max-width: 900px) {
  .auth-panel,
  .hero-panel,
  .insight-layout {
    grid-template-columns: 1fr;
    display: grid;
  }

  .stats-grid {
    grid-template-columns: repeat(2, minmax(140px, 1fr));
  }
}

@media (max-width: 600px) {
  .page-shell {
    padding-left: 16px;
    padding-right: 16px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .recommendation-box {
    grid-template-columns: 1fr;
  }

  .hero-actions,
  .auth-actions {
    width: 100%;
    flex-direction: column;
  }

  .primary-button,
  .secondary-button {
    width: 100%;
  }
}
