import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getVideos } from '../utility_functions/utility';

function Videos() {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  
  useEffect(() => {
    async function getVids() {
      const videos = await getVideos(1);
      setVideos(videos.slice(0, 24)); // Ensure only 24 results
    }
    getVids();
}, []);

async function nextVideos() {
  setPage(page + 1);
  const videos = await getVideos(page);
  setVideos(prevVideos => [...prevVideos,...videos.slice(0, 24)]); // Ensure only 24 results
}
    
function sendVideoData(data) {
    navigate(`/video?url=${data.video_source_url}&thumbnail=${data.cloudinary_video_url}`, { state: { url: data.video_source_url, thumbnail: data.cloudinary_video_url}});
}

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Videos</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.map((video, index) => (
          <li
            key={index}
            className="relative list-none bg-white shadow rounded overflow-hidden cursor-pointer"
            onClick={() =>sendVideoData(video)}
          >
            <div className="relative">
              <img
                className="w-full h-48 object-cover"
                src={video.cloudinary_video_url}
                alt={video.title}
              />
              <span className="absolute bottom-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">
                {video.video_duration_in_minutes} min
              </span>
            </div>
            <div className="p-2">
              <h2 className="text-lg font-semibold">
                <button>{video.title}</button>
              </h2>
              <p className="text-sm text-gray-600">{video.user.name}</p>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={nextVideos} type="button" className=" gap-1 text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 my-2">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#4285"} fill={"none"}>
    <path d="M18.001 20C16.3295 21.2558 14.2516 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 12.8634 21.8906 13.7011 21.6849 14.5003C21.4617 15.3673 20.5145 15.77 19.6699 15.4728C18.9519 15.2201 18.6221 14.3997 18.802 13.66C18.9314 13.1279 19 12.572 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C13.3197 19 14.554 18.6348 15.6076 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
</svg>
Load more videos
</button>

     
     
    </div>
  );
}

export default Videos;
