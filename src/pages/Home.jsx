import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <>
      <Navbar />

      <div className="home-wrapper">

        {/* HERO */}
        <section className="hero-section">
          <div className="hero-content">
            <h1>
              Intelligent AI Storytelling
              <span> & Smart Summarization</span>
            </h1>

            <p>
              EmotiTales AI transforms long documents and raw text into
              structured summaries and emotionally adaptive stories,
              powered by advanced Natural Language Processing models.
            </p>

            <div className="hero-cta">
              <Link to="/summary" className="btn-primary">Start Summarizing</Link>
              <Link to="/story" className="btn-secondary">Generate Story</Link>
              <Link to="/library" className="btn-third">Explore Library</Link>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="stats-section">
          <div className="stats-grid">
            <div>
              <h3>Multilingual</h3>
              <p>English & Hindi Support</p>
            </div>
            <div>
              <h3>AI Powered</h3>
              <p>Advanced NLP Models</p>
            </div>
            <div>
              <h3>Audio Enabled</h3>
              <p>Neural Text-to-Speech</p>
            </div>
            <div>
              <h3>PDF Support</h3>
              <p>Document Processing</p>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="features-section">
          <h2>Core Capabilities</h2>

          <div className="features-grid">
            <div className="feature-card">
              <h3>PDF Summarization</h3>
              <p>Extract structured insights from uploaded documents.</p>
            </div>

            <div className="feature-card">
              <h3>Text Summarization</h3>
              <p>Generate concise summaries from long input text.</p>
            </div>

            <div className="feature-card">
              <h3>Multilingual AI</h3>
              <p>Supports Hindi & English story and summary generation.</p>
            </div>

            <div className="feature-card">
              <h3>AI Audio Output</h3>
              <p>Natural AI voice narration for summaries and stories.</p>
            </div>
          </div>
        </section>

        {/* LIBRARY + AUDIO FEATURE */}
        <section className="advanced-section">

          <h2>Advanced AI Capabilities</h2>

          <div className="advanced-grid">

            <div className="advanced-card">
              <h3>📚 Smart Story Library</h3>
              <p>
                Access curated AI-generated stories. Translate instantly
                and listen in natural human voice.
              </p>
            </div>

            <div className="advanced-card">
              <h3>🌍 Indian Language Support</h3>
              <p>
                Supports Hindi, Marathi, Hinglish, Gujarati, Punjabi,
                Bengali, Tamil and Telugu.
              </p>
            </div>

            <div className="advanced-card">
              <h3>🎧 Human Voice Narration</h3>
              <p>
                Neural AI voice with emotion detection and
                dynamic gender-based narration.
              </p>
            </div>

            <div className="advanced-card">
              <h3>📄 Text + PDF Intelligence</h3>
              <p>
                Summarize long documents, PDFs and raw text
                into structured intelligent summaries.
              </p>
            </div>

          </div>
        </section>

      </div>
    </>
  );
}

export default Home;
