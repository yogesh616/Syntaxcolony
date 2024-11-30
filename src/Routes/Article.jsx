import React, { useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { fetchArticle } from '../utility_functions/utility';
import './article.css'

function Article() {
    const location = useLocation();
    const url = location.state?.url || null;
    const [ titleParams ] = useSearchParams()
    const title = titleParams.get('title');
    const [article, setArticle ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(false)

    const ArticlesData = async (url) => {
        try {
        setIsLoading(true);
        const data = await fetchArticle(url);
        console.log(data);
        setArticle(data);
        setIsLoading(false);
    }
        
        catch (error) {
            console.error('Error fetching article:', error);
            setArticle(null);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        ArticlesData(url)
        console.log(url)
    }, [])
  return (
    <div>
      <div className='flex items-center justify-center m-3 font-bold text-zinc-800'><h1>{title}</h1></div>
      <div className='border border-sky-500 mx-5 my-3 px-4 py-3 rounded-md'>
      {
        article &&  (
          <div className='flex flex-col gap-2 px-2 text-zinc-700 ' dangerouslySetInnerHTML={{ __html: article.data }} />
        )
  
     }
      </div>
     
      {isLoading && (
               
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
    </div>
  )
}

export default Article
