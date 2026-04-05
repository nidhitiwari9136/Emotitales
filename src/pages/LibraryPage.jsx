import React, { useEffect, useState } from "react";
import axios from "axios";
import LibraryGrid from "../components/LibraryGrid";
import "../components/Library.css";

const API_URL = "http://127.0.0.1:8000/api";

const LibraryPage = () => {

  const [stories, setStories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStory, setSelectedStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [audioUrl, setAudioUrl] = useState("");
  const [audioLoading, setAudioLoading] = useState(false);

  // ===========================
  // FETCH LIBRARY STORIES
  // ===========================

  useEffect(() => {
    fetchLibrary();
  }, []);

  useEffect(() => {
    setAudioUrl("");
  }, [selectedStory, selectedLanguage]);

  const fetchLibrary = async () => {
    try {
      const res = await axios.get(`${API_URL}/library/`);
      setStories(res.data.stories || []);
    } catch (error) {
      console.error("Library fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ===========================
  // OPEN STORY
  // ===========================

  const handleReadStory = async (id) => {
    try {
      const res = await axios.post(
        `${API_URL}/open-story/`,
        {
          story_id: id,
          language: selectedLanguage
        }
      );

      setSelectedStory({
        id: id,
        title: res.data.title,
        story: res.data.story
      });

    } catch (error) {
      console.error("Open story error:", error);
    }
  };

  // ===========================
  // CHANGE LANGUAGE
  // ===========================

  const handleLanguageChange = async (lang) => {
    setSelectedLanguage(lang);

    if (!selectedStory) return;

    try {
      const res = await axios.post(
        `${API_URL}/open-story/`,
        {
          story_id: selectedStory.id,
          language: lang
        }
      );

      setSelectedStory({
        ...selectedStory,
        story: res.data.story
      });

    } catch (error) {
      console.error("Language change error:", error);
    }
  };

  // ===========================
  // GENERATE HUMAN VOICE AUDIO
  // ===========================

  const handleGenerateAudio = async () => {
    if (!selectedStory) return;

    try {
      setAudioLoading(true);
      setAudioUrl("");

      const res = await axios.post(`${API_URL}/audio/`, {
        story: selectedStory.story
      });

      let audioPath = res.data.audio;

      if (!audioPath.startsWith("http")) {
        audioPath = "http://127.0.0.1:8000" + audioPath;
      }

      const fullUrl = audioPath + "?t=" + Date.now();

      setAudioUrl(fullUrl);


      setAudioUrl(fullUrl);

    } catch (error) {
      console.error("Audio generation error:", error);
    } finally {
      setAudioLoading(false);
    }
  };

  const filteredStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ===========================
  // UI
  // ===========================

  return (
    <div className="library-container">


      <div className="library-header">

        <div className="header-row">
          <input
            type="text"
            placeholder="🔍 Search stories..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <h1>📚 EmotiTales Library 📚</h1>
        </div>

        <p className="simple-text">
          <span>Explore</span>
          <span>70+</span>
          <span>Moral,</span>
          <span>Mythology</span>
          <span>&</span>
          <span>More</span>
          <span>Stories</span></p>

      </div>

      {loading ? (
        <div className="loading">Loading stories...</div>
      ) : (
        <LibraryGrid
          stories={filteredStories}
          onRead={handleReadStory}
        />
      )}

      {/* ================= MODAL ================= */}

      {selectedStory && (
        <div className="story-modal">

          <div className="modal-content">

            <button
              className="close-btn"
              onClick={() => setSelectedStory(null)}
            >
              ✖
            </button>

            <h2>{selectedStory.title}</h2>

            {/* Language Selector */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ marginRight: "10px" }}>
                🌍 Language:
              </label>

              <select
                value={selectedLanguage}
                onChange={(e) =>
                  handleLanguageChange(e.target.value)
                }
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

            {/* Audio Button */}
            <button
              className="read-btn"
              style={{ marginBottom: "25px" }}
              onClick={handleGenerateAudio}
              disabled={audioLoading}
            >
              {audioLoading ? "⏳ Generating Audio..." : "🔊 Listen"}
            </button>

            {audioUrl && (
              <audio key={audioUrl} controls autoPlay style={{ marginBottom: "20px" }}>
                <source src={audioUrl} type="audio/mpeg" />
              </audio>
            )}

            <p>{selectedStory.story}</p>

          </div>
        </div>
      )}

    </div>
  );
};

export default LibraryPage;