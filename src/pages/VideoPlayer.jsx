import React, { useEffect, useState } from 'react'
import Player from '../shared/components/video/Player.jsx'
import { useParams } from 'react-router-dom'
import { getVideoById } from '../services/video/videoAPI.js'
import Spinner from '../shared/Loaders/Spinner.jsx'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { Button } from '../components/ui/button'

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

    return (
      <div className='flex items-center justify-center min-h-screen w-screen'>
        <Spinner size='xl' />
      </div>
    )
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;
  }

  if (!video) {
    return <div className="flex items-center justify-center min-h-screen">Video not found.</div>;
  }

  return (
    <div className="flex flex-col items-center gap-1.5 bg-background h-screen w-screen">
      <div className="w-full">
        <Player type="video" video={video} />
      </div>
      <div className='w-full bg-background'>
        <div className='flex px-10'>
          <h3 className='font-roboto font-semibold text-xl text-wrap'>{video.description}</h3>
        </div>
        <div className='px-10 py-2 flex items-center'>
          <div className='flex gap-3 items-center'>
            <Avatar className='h-10 w-10'>
              <AvatarFallback>
                <h3 className='text-xl'>
                  {video.creator?.username.charAt(0).toUpperCase()}
                </h3>
              </AvatarFallback>
              <AvatarImage src={video.creator?.avatar} />
            </Avatar>
            <h3>{video.creator?.username}</h3>
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;