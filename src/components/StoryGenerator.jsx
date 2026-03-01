import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./StoryGenerator.css";

const API_URL = "http://127.0.0.1:8000/api";

const StoryGenerator = () => {

  const [prompt, setPrompt] = useState("");
  const [language, setLanguage] = useState("English");
  const [emotion, setEmotion] = useState("happy");
  const [length, setLength] = useState("medium");
  const [story, setStory] = useState("");
  const [originalStory, setOriginalStory] = useState("");
  const [currentStoryId, setCurrentStoryId] = useState(null);

  const [audioUrl, setAudioUrl] = useState("");
  const [audioLoading, setAudioLoading] = useState(false);
  const [libraryPreview, setLibraryPreview] = useState([]);

  const [loading, setLoading] = useState(false);

  // ================= LOAD LIBRARY ONLY ONCE =================
  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const res = await axios.get(`${API_URL}/library/`);
        setLibraryPreview(res.data.stories.slice(0, 8));
      } catch (err) {
        console.log(err);
      }
    };
    fetchLibrary();
  }, []);

  // Reset audio when story changes
  useEffect(() => {
    setAudioUrl("");
  }, [story]);

  // ================= GENERATE STORY =================
  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setStory("");
    setCurrentStoryId(null);

    try {
      const res = await axios.post(`${API_URL}/story/`, {
        prompt,
        language,
        emotion,
        length
      });

      setStory(res.data.story);
      setOriginalStory(res.data.story);

    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  // ================= OPEN LIBRARY STORY (NO API) =================
  const openLibraryStory = async (item) => {
    try {
      const res = await axios.post(`${API_URL}/open-story/`, {
        story_id: item.id,
        language: language
      });

      setStory(res.data.story);
      setOriginalStory(res.data.story);
      setCurrentStoryId(item.id);

    } catch (err) {
      console.log(err);
    }
  };
  // ================= TRANSLATE =================
  const handleLanguageChange = async (lang) => {
    setLanguage(lang);

    if (!story) return;

    try {

      // 🔥 Always use library API if story came from library
      if (currentStoryId !== null) {

        const res = await axios.post(`${API_URL}/open-story/`, {
          story_id: currentStoryId,
          language: lang
        });

        setStory(res.data.story);

      } else if (prompt.trim()) {

        const res = await axios.post(`${API_URL}/story/`, {
          prompt,
          language: lang,
          emotion,
          word_limit: 100
        });

        setStory(res.data.story);

      }

    } catch (err) {
      console.log("Translate error:", err);
    }
  };
  const generateAudio = async () => {
  if (!story) return;

  setAudioLoading(true);

  try {
    const res = await axios.post(`${API_URL}/audio/`, {
      story: story
    });

    setAudioUrl(res.data.audio + "?t=" + Date.now());

  } catch (err) {
    console.log("Audio error:", err);
  } finally {
    setAudioLoading(false);
  }
};

  return (
    <div className="story-container">

      {/* HERO */}
      <div className="hero-card">
        <h1>Create Emotional AI Stories</h1>

        <textarea
          placeholder="Example: Mahatma Gandhi story for kids..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <div className="controls">

          <select value={language} onChange={(e) => handleLanguageChange(e.target.value)}>
            <option>English</option>
            <option>Hindi</option>
            <option>Marathi</option>
            <option>Gujarati</option>
            <option>Tamil</option>
            <option>Telugu</option>
            <option>Bengali</option>
            <option>Punjabi</option>
            <option>Hinglish</option>
          
          </select>

          <select value={emotion} onChange={(e) => setEmotion(e.target.value)}>
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="funny">Funny</option>
          </select>

        </div>
        <div className="length-buttons">
          <button
            className={length === "short" ? "active" : ""}
            onClick={() => setLength("short")}
          >
            Short
          </button>

          <button
            className={length === "medium" ? "active" : ""}
            onClick={() => setLength("medium")}
          >
            Medium
          </button>

          <button
            className={length === "long" ? "active" : ""}
            onClick={() => setLength("long")}
          >
            Long
          </button>
        </div>

        <button className="generate-btn" onClick={handleGenerate}>
          {loading ? "Generating..." : "Generate Story"}
        </button>
      </div>

      {/* STORY MODAL */}
      {story && (
        <div className="story-modal-overlay">
          <div className="story-modal-card">

            <button
              className="story-modal-close"
              onClick={() => {
                setStory("");
                setCurrentStoryId(null);
              }}
            >
              ✕
            </button>

            <div className="story-modal-header">
              <h2>📖 Story</h2>

              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
              >
                <option>English</option>
                <option>Hindi</option>
                <option>Marathi</option>
                <option>Gujarati</option>
                <option>Tamil</option>
                <option>Telugu</option>
                <option>Bengali</option>
                <option>Punjabi</option>
                <option>Hinglish</option>
              </select>
            </div>

            <div className="story-modal-content">
              {story}
            </div>

            <div className="story-audio-section">
              {!audioUrl ? (
  <button
    className="listen-btn"
    onClick={generateAudio}
    disabled={audioLoading}
  >
    {audioLoading ? "⏳ Generating Audio..." : "🎧 Listen in Human Voice"}
  </button>
) : (
  <audio controls autoPlay className="audio-player">
    <source src={audioUrl} type="audio/mpeg" />
  </audio>
)}
            </div>

          </div>
        </div>
      )}

      {/* LIBRARY PREVIEW */}
      <div className="library-section">

        <div className="library-header-center">
          <h2>📚 Story Library 📚</h2>
          <p>Explore curated stories crafted with AI.</p>
        </div>

        <div className="library-grid">
          {libraryPreview.map(item => (
            <div
              key={item.id}
              className="library-card"
              onClick={() => openLibraryStory(item)}
            >
              <h3>{item.title}</h3>
              <p>{item.category}</p>
            </div>
          ))}
        </div>

        <div className="library-footer">
          <Link to="/library" className="explore-btn-big">
            📚 Explore Full Collection →
          </Link>
        </div>

      </div>

    </div>
  );
};

export default StoryGenerator;