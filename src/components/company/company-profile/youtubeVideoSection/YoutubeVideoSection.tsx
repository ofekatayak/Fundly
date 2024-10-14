import React from "react";
import "./YoutubeVideoSection.css"; // Ensure the CSS file is correctly imported

interface YoutubeVideoSectionProps {
  youtubeVideoAddress: string;
}

export const YoutubeVideoSection: React.FC<YoutubeVideoSectionProps> = ({
  youtubeVideoAddress,
}) => {
  let embedUrl = "";

  try {
    const url = new URL(youtubeVideoAddress);
    if (url.hostname === "www.youtube.com" && url.searchParams.get("v")) {
      embedUrl = `https://www.youtube.com/embed/${url.searchParams.get("v")}`;
    } else if (url.hostname === "youtu.be") {
      embedUrl = `https://www.youtube.com/embed/${url.pathname.slice(1)}`;
    } else {
      throw new Error("Invalid YouTube URL");
    }
  } catch (error) {
    console.error("Error parsing YouTube URL:", error);
  }

  return (
    <>
      <h2 className="youtube-section__title">Promotional Video</h2>
      <div className="video-container">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <p>Invalid YouTube URL</p>
        )}
      </div>
    </>
  );
};
