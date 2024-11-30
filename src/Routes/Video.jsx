import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const Video = () => {
  const videoRef = useRef(null);
  const location = useLocation();
  const url = location.state?.url || null;
  const thumbnail = location.state?.thumbnail || null;

  useEffect(() => {
    console.log('video: ' + url);
    console.log('thumbnail: ' + thumbnail);

    // Dynamically load HLS.js and initialize
    const initializeHLS = async () => {
      if (url && videoRef.current) {
        if (window.Hls) {
          const hls = new window.Hls();
          hls.loadSource(url);
          hls.attachMedia(videoRef.current);
        } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
          videoRef.current.src = url;
        } else {
          alert('Your browser does not support HLS playback.');
        }
      }
    };

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/hls.js@latest';
    script.async = true;
    script.onload = initializeHLS;
    document.body.appendChild(script);

    return () => {
      if (videoRef.current && videoRef.current.src) {
        videoRef.current.src = ''; // Stop playback and cleanup
      }
      document.body.removeChild(script); // Remove script on unmount
    };
  }, [url]);

  return (
    <div className="flex justify-center items-center absolute  top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 h-screen bg-gray-100 video-container" >
      {url && thumbnail ? (
        <video
          id="my-video"
          ref={videoRef}
          className="video-js"
          controls
          preload="auto"
          width="640"
          height="264"
          poster={thumbnail}
          data-setup="{}"
        >
          <source src={url} type="application/x-mpegURL" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p className="text-gray-500">No video URL provided.</p>
      )}
    </div>
  );
};

export default Video;
