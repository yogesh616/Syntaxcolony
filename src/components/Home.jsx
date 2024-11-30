import React, { useEffect, useState } from 'react';
import { fetchData, getTags } from '../utility_functions/utility';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../Context/Context';

function Home() {
    const { prompt, setPrompt } = useLoading()
    const [posts, setPosts] = useState([]);
   
    const [isLoading, setIsLoading] = useState(false);
    const [visibleCount, setVisibleCount] = useState(10);
    const [tags, setTags] = useState(() => {
        const storedData = localStorage.getItem('tags')
        if (storedData) {
            const cachedTags = JSON.parse(storedData);
        return cachedTags || [];
        }
    });
    const navigate = useNavigate();



   // Fetch posts based on the given prompt
  const getData = async (prompt) => {
    setIsLoading(true);
    try {
      const { articles = [] } = await fetchData(prompt) || {};
      setPosts(articles);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };


useEffect(() => {
    if (prompt && posts.length > 0) {
       localStorage.setItem(prompt, JSON.stringify(posts));
    }
}, [prompt, posts])


useEffect(() => {
    async function fetchTags() {
      try {
       // const cachedTags = JSON.parse(localStorage.getItem('tags')) || [];
      //  setTags(cachedTags);
  
        const newTags = await getTags();
        if (newTags.length > 0) {
       //   localStorage.setItem('tags', JSON.stringify(newTags.tags));
          setTags(newTags.tags);
        }
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    }
  
    fetchTags();
  }, []);
  
   

    useEffect(() => {
        
        getData(prompt);
    }, [prompt]);

    const loadMore = () => {
        setVisibleCount((prevCount) => prevCount + 10);
    };

    function goToArticle(post) {
        navigate(`/article?title=${encodeURIComponent(post.title)}`, { state: { url: post.link }});
    }

    async function handleHashTag(text) {
        setPrompt(text)
        getData(text);
    }


    function sendUsername(username) {
        navigate(`/user?username=${username}`, { state: { username}});
    }

    return (
        <div className="container mx-auto p-4">
            <div className='flex items-center justify-center font-bold'><h1>{prompt.toUpperCase()}</h1></div>
            {/* Show loader when data is being fetched */}
            {isLoading && (
                /* From Uiverse.io by mobinkakei */ 
<div id="wifi-loader">
    <svg className="circle-outer" viewBox="0 0 86 86">
        <circle className="back" cx="43" cy="43" r="40"></circle>
        <circle className="front" cx="43" cy="43" r="40"></circle>
        <circle className="new" cx="43" cy="43" r="40"></circle>
    </svg>
    <svg className="circle-middle" viewBox="0 0 60 60">
        <circle className="back" cx="30" cy="30" r="27"></circle>
        <circle className="front" cx="30" cy="30" r="27"></circle>
    </svg>
    <svg className="circle-inner" viewBox="0 0 34 34">
        <circle className="back" cx="17" cy="17" r="14"></circle>
        <circle className="front" cx="17" cy="17" r="14"></circle>
    </svg>
    <div className="text" data-text="Loading"></div>
</div>
            )}



<button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
    <span className="sr-only">Open sidebar</span>
    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
    </svg>
 </button>
 <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
    <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <div className='text-slate-300'>Tags</div>
       <ul className="relative space-y-2 font-medium h-1/2 overflow-y-auto ">
        
         
       { 
         tags.map((tag, index) => (
                <li key={index} className='text-slate-300'>
             <a  className=" cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                   <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
                   <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z"/>
                   <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z"/>
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap" onClick={() => handleHashTag(tag.href.split('/').pop())} >{tag.name}</span>
             </a>
          </li>
            ))
         }
          
       </ul>

       <div onClick={()=> navigate('/videos')} className='text-slate-300 mt-4 cursor-pointer'>Videos</div>
    </div>
 </aside>

            {/* Render posts if available */}
            {!isLoading && posts.length > 0 && (
               <div className=' sm:ml-64 p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700'> 
                
                
                <div className="grid gap-6 lg:grid-cols-3 lg:grid-rows-3 md:grid-cols-1 sm:grid-cols-1 sm:min-w-full">
                    {posts.slice(0, visibleCount).map((post, index) => (
                        <div
                            key={index}
                            className="text-zinc-700 post bg-white p-4 rounded-lg shadow-md flex flex-col space-y-4 max-w-sm mx-auto"
                        >
                            {/* User Info */}
                            <div className="user flex items-center space-x-4">
                                <img
                                    src={post.authorPicture}
                                    alt={post.author}
                                    className="w-12 h-12 rounded-full object-cover cursor-pointer"
                                     onClick={() =>sendUsername(post.link.split('/')[3])}
                                />
                                <div>
                                    <p className="font-semibold cursor-pointer" onClick={() =>sendUsername(post.link.split('/')[3])}>{post.author}</p>
                                    <time className="text-gray-500 text-sm">{post.date}</time>
                                </div>
                            </div>

                            {/* Post Title */}
                            <h3 className="text-xl font-bold ">{post.title}</h3>

                            

                            {/* Read More Link */}
                            <a
                               onClick={() => goToArticle(post)}
                                className="text-indigo-600  hover:underline cursor-pointer"
                            >
                                Read More
                            </a>
                        </div>
                    ))}
                    {/* Show 'Load More' button if there are more posts */}
                    {visibleCount < posts.length && (
                        <div id='btn' className='absolute left-1/2 bottom-1'><button
                        onClick={loadMore}
                        className="bg-indigo-500 text-white py-2 px-4 mt-4 mx-auto block rounded-sm "
                    >
                        Load More
                    </button></div>
                    )}
                </div></div>
            )}

            {/* Show a message if no posts are found */}
            {!isLoading && posts.length === 0 && <div className='absolute top-1/2 left-1/2 flex items-center flex-col gap-3'><p className='text-lg'>No posts found. 😢</p> 
<button onClick={() => getData(prompt)} type="button" className="button">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-arrow-repeat"
    viewBox="0 0 16 16"
  >
    <path
      d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"
    ></path>
    <path
      fillRule="evenodd"
      d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
    ></path>
  </svg>
  Refresh
</button>
</div>}
        </div>
    );
}

export default Home;
