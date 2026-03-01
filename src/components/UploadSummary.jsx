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
        "https://emotitales-backend.onrender.com/api/summary/",
        formData
      );

      setSummary(res.data.summary || "");

      if (res.data.audio) setAudioUrl(res.data.audio);

    } catch (err) {
      console.error(err);
      alert("Error generating summary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="summary-page">
      <div className="summary-card">
        <h2>🤖 EmotiTales AI Summary</h2>
        <p className="subtitle">
          Upload PDF or enter text to get AI-powered summaries
        </p>

        <form onSubmit={handleSubmit} className="upload-form">

          {/* TEXT INPUT */}
          <textarea
            placeholder="✍️ Paste or type text here (optional)"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />

          <div className="divider">
            <span>OR</span>
          </div>

          {/* FILE INPUT */}
          <label className="custom-file-upload">
  📁 Choose PDF 
  <input
    type="file"
    accept=".pdf,.png,.jpg,.jpeg"
    onChange={(e) => {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
    }}
  />
</label>

{file && (
  <div className="file-name">
    ✅ {file.name}
  </div>
)}


          {/* MODE BUTTONS */}
          <div className="mode-buttons">
            <button
              type="button"
              className={mode === "text" ? "active" : ""}
              onClick={() => setMode("text")}
            >
              📝 Text
            </button>
            <button
              type="button"
              className={mode === "audio" ? "active" : ""}
              onClick={() => setMode("audio")}
            >
              🔊 Audio
            </button>
          </div>

          <button type="submit" disabled={loading} className="generate-btn">
            {loading ? "⏳ Processing..." : "Generate Output"}
          </button>
        </form>

        {/* OUTPUTS */}
        {summary && (
          <div className="output-box">
            <h3>📝 Summary</h3>
            <p>{summary}</p>
          </div>
        )}

        {audioUrl && (
          <div className="audio-box">
            <h3>🔊 Audio Summary</h3>
            <audio controls src={audioUrl}></audio>
          </div>
        )}

      </div>
    </div>
  );
};

export default UploadSummary;
