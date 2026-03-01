import React from "react";
import "./Library.css";

const LibraryGrid = ({ stories, onRead }) => {

  if (!stories || stories.length === 0) {
    return <p>No stories available.</p>;
  }

  return (
    <div className="library-grid">
      {stories.map((story) => (
        <div key={story.id} className="story-card">

          <span className="category-badge">
            {story.category}
          </span>

          <h3 className="story-title">
            {story.title}
          </h3>

          <button
            className="read-btn"
            onClick={() => onRead(story.id)}
          >
            Read Story
          </button>

        </div>
      ))}
    </div>
  );
};

export default LibraryGrid;