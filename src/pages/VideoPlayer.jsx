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
      setVideo(response?.data);
      console.log("RESPONSE DATA : 😄", response?.data);

    } catch (err) {
      setError("Error fetching video");
      console.error("Error fetching video:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (videoId) {
      fetchVideo();
    }
  }, [videoId]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading video...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;
  }

  if (!video) {
    return <div className="flex items-center justify-center min-h-screen">Video not found.</div>;
  }

  return (
    <div className='flex flex-col items-center bg-background  h-screen w-screen'>
      <div className='h-3/4 w-full'>
        <Player
          type='video'
          video={video}
        />
      </div>
      {/* <div className="mt-4 p-4 w-full max-w-4xl bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-2">{video.title}</h2>
        <p className="text-gray-700">{video.description}</p>
      </div> */}
    </div>
  );
}

export default VideoPlayer;