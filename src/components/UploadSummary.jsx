import React, { useState } from "react";
import axios from "axios";
import "./UploadSummary.css";

const UploadSummary = () => {
  const [file, setFile] = useState(null);
  const [textInput, setTextInput] = useState("");
  const [summary, setSummary] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [mode, setMode] = useState("text"); // text | audio 
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file && !textInput.trim()) {
      alert("Please upload a file or enter text");
      return;
    }

    const formData = new FormData();
    if (file) formData.append("file", file);
    if (textInput) formData.append("text", textInput);
    formData.append("mode", mode);

    try {
      setLoading(true);
      setSummary("");
      setAudioUrl("");

      const res = await axios.post(
        "http://127.0.0.1:8000/api/summary/",
        formData
      );

      setSummary(res.data.summary || "");

      if (res.data.audio) {
        const fullUrl = "http://127.0.0.1:8000" + res.data.audio;
        setAudioUrl(fullUrl);
        console.log("Audio URL:", fullUrl);
      }
    } catch (err) {
      console.error(err);
      alert("Error generating summary. Backend check karo!");
    } finally {
      setLoading(false);
    }
  }; // <--- Ye bracket zaroori tha

  return (
    <div className="summary-page">
      <div className="summary-card">
        <h2>🤖 EmotiTales AI Summary</h2>
        <p className="subtitle">
          Upload PDF or enter text to get AI-powered summaries
        </p>

        <form onSubmit={handleSubmit} className="upload-form">
          <textarea
            placeholder="✍️ Paste or type text here (optional)"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />

          <div className="divider"><span>OR</span></div>

          <label className="custom-file-upload">
            📁 Choose PDF
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>

          {file && <div className="file-name">✅ {file.name}</div>}

          <div className="mode-buttons">
            <button
              type="button"
              className={mode === "text" ? "active" : ""}
              onClick={() => setMode("text")}
            >📝 Text</button>
            <button
              type="button"
              className={mode === "audio" ? "active" : ""}
              onClick={() => setMode("audio")}
            >🔊 Audio</button>
          </div>

          <button type="submit" disabled={loading} className="generate-btn">
            {loading ? "⏳ Processing..." : "Generate Output"}
          </button>
        </form>

        {summary && (
          <div className="output-box">
            <h3>📝 Summary</h3>
            <p>{summary}</p>
          </div>
        )}

        {audioUrl && (
          <div className="audio-box">
            <h3>🔊 Audio Summary</h3>
            {/* key={audioUrl} har baar naya player load karega */}
            <audio key={audioUrl} controls autoPlay>
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <br />
            <a href={audioUrl} target="_blank" rel="noreferrer" style={{ color: '#4cc9f0', fontSize: '12px' }}>
              
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadSummary;