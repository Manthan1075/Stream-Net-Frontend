import React, { useEffect, useState } from 'react'
import Player from '../shared/components/video/Player.jsx'
import { useParams } from 'react-router-dom'
import { getVideoById } from '../services/video/videoAPI.js'
import Spinner from '../shared/Loaders/Spinner.jsx'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { Button } from '../components/ui/button'
import { Download, MessageSquareText, Share, ThumbsUp } from 'lucide-react'
import { toggleLike } from '../services/like/likeAPI.js'

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

  async function videoToggleLike() {
    try {
      const res = await toggleLike({
        contentId: videoId,
        contentType: "Video",
      })
      console.log("LIKE TOGGLED : 😄", res);
    } catch (error) {
      console.error("Error While Toggle Like Of Video ::", error);
    }
  }

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
        <div className='flex px-5'>
          <h3 className='font-roboto font-semibold text-xl text-wrap'>{video.description}</h3>
        </div>
        <div className="flex items-center justify-around gap-6 w-full py-4">
          <div className="flex gap-5">
            <Button
              variant="outline"
              className="rounded py-3 bg-grey-900/15 hover:bg-grey-900/25 border-none shadow-sm 
                    flex items-center justify-center"
              onClick={videoToggleLike}
            >
              <ThumbsUp className='text-green-500' />
              {video.likes?.length}
            </Button>

            <Button
              variant="outline"
              className="rounded py-3 bg-blue-500/15 hover:bg-blue-500/25 border-none shadow-sm 
                    flex items-center justify-center"
            >
              <MessageSquareText className="text-blue-500" />
              150
            </Button>

            <Button
              variant="outline"
              className="rounded py-3 bg-purple-500/15 hover:bg-purple-500/25 border-none shadow-sm 
                    flex items-center justify-center"
            >
              <Share className="text-purple-500" />
              Share
            </Button>

            <Button
              variant="outline"
              className="rounded py-3 bg-orange-500/15 hover:bg-orange-500/25 border-none shadow-sm 
                    flex items-center justify-center"
            >
              <Download className="text-orange-500" />
              Download
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14 border">
              <AvatarFallback className="text-xl font-semibold">
                {video.creator?.username?.charAt(0).toUpperCase()}
              </AvatarFallback>
              <AvatarImage src={video.creator?.avatar} />
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{video.creator?.username}</h3>
              <p className="text-sm text-muted-foreground">
                {video?.totalSubscribers} Subscribers
              </p>
            </div>
            <Button size="lg" className="rounded-full px-6">
              Subscribe
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default VideoPlayer;