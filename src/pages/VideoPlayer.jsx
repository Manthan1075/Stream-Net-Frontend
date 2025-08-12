import React, { useEffect, useState } from 'react'
import Player from '../shared/components/video/Player.jsx'
import { useParams } from 'react-router-dom'
import { getVideoById } from '../services/video/videoAPI.js'

function VideoPlayer() {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVideo = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getVideoById(videoId);
      console.log("Video Details ::", response.data);
      setVideo(response?.data);
    } catch (error) {
      setError("Error fetching video");
      console.error("Error fetching video:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (videoId) {
      fetchVideo();
    }
    // Only run when videoId changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  if (loading) {
    return <div>Loading video...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!video) {
    return <div>Video not found.</div>;
  }

  return (
    <div>
      {/* <video
        src={video?.videoFile}
        controls
        muted
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        className="w-screen max-w-3xl rounded-xl shadow-lg bg-black"
      >
      </video> */}
      <Player type='video' videoURL={video?.videoFile} />
      <h2>{video.title}</h2>
      <p>{video.description}</p>
    </div>
  );
}

export default VideoPlayer
