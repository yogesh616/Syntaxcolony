import React, { useEffect, useState } from 'react'
import {  useSearchParams, useNavigate } from 'react-router-dom'
import { getUserData } from '../utility_functions/utility'
import './user.css'

function User() {
  const [ userDetails, setUserDetails ] = useState(null)
  const [ userParams ] = useSearchParams()
  const username = userParams.get('username')
  const navigate = useNavigate()

  async function getuserdata(username) {
    try {
      const userData = await getUserData(username)
      console.log(userData)
      setUserDetails(userData)
    }
    catch (err) {
      console.error('Error fetching user data:', err)
    }
  }

  useEffect(() => {
   getuserdata(username)
  }, [])

  function goToArticle(post) {
    navigate(`/article?title=${encodeURIComponent(post.title)}`, { state: { url: post.link }});
}
  
  return (
    <div>
      
      <div className='flex items-center justify-center'>{
        userDetails ? userDetails.user.map((data, index) => (
          /* From Uiverse.io by andrew-demchenk0 */ 
<div key={index} className="card">
    <div className="card__img"><svg xmlns="http://www.w3.org/2000/svg" width="100%"><rect fill="#ffffff" width="540" height="450"></rect><defs><linearGradient id="a" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="0" y2="100%" gradientTransform="rotate(222,648,379)"><stop offset="0" stopColor="#ffffff"></stop><stop offset="1" stopColor="#FC726E"></stop></linearGradient><pattern patternUnits="userSpaceOnUse" id="b" width="300" height="250" x="0" y="0" viewBox="0 0 1080 900"><g fillOpacity="0.5"><polygon fill="#444" points="90 150 0 300 180 300"></polygon><polygon points="90 150 180 0 0 0"></polygon><polygon fill="#AAA" points="270 150 360 0 180 0"></polygon><polygon fill="#DDD" points="450 150 360 300 540 300"></polygon><polygon fill="#999" points="450 150 540 0 360 0"></polygon><polygon points="630 150 540 300 720 300"></polygon><polygon fill="#DDD" points="630 150 720 0 540 0"></polygon><polygon fill="#444" points="810 150 720 300 900 300"></polygon><polygon fill="#FFF" points="810 150 900 0 720 0"></polygon><polygon fill="#DDD" points="990 150 900 300 1080 300"></polygon><polygon fill="#444" points="990 150 1080 0 900 0"></polygon><polygon fill="#DDD" points="90 450 0 600 180 600"></polygon><polygon points="90 450 180 300 0 300"></polygon><polygon fill="#666" points="270 450 180 600 360 600"></polygon><polygon fill="#AAA" points="270 450 360 300 180 300"></polygon><polygon fill="#DDD" points="450 450 360 600 540 600"></polygon><polygon fill="#999" points="450 450 540 300 360 300"></polygon><polygon fill="#999" points="630 450 540 600 720 600"></polygon><polygon fill="#FFF" points="630 450 720 300 540 300"></polygon><polygon points="810 450 720 600 900 600"></polygon><polygon fill="#DDD" points="810 450 900 300 720 300"></polygon><polygon fill="#AAA" points="990 450 900 600 1080 600"></polygon><polygon fill="#444" points="990 450 1080 300 900 300"></polygon><polygon fill="#222" points="90 750 0 900 180 900"></polygon><polygon points="270 750 180 900 360 900"></polygon><polygon fill="#DDD" points="270 750 360 600 180 600"></polygon><polygon points="450 750 540 600 360 600"></polygon><polygon points="630 750 540 900 720 900"></polygon><polygon fill="#444" points="630 750 720 600 540 600"></polygon><polygon fill="#AAA" points="810 750 720 900 900 900"></polygon><polygon fill="#666" points="810 750 900 600 720 600"></polygon><polygon fill="#999" points="990 750 900 900 1080 900"></polygon><polygon fill="#999" points="180 0 90 150 270 150"></polygon><polygon fill="#444" points="360 0 270 150 450 150"></polygon><polygon fill="#FFF" points="540 0 450 150 630 150"></polygon><polygon points="900 0 810 150 990 150"></polygon><polygon fill="#222" points="0 300 -90 450 90 450"></polygon><polygon fill="#FFF" points="0 300 90 150 -90 150"></polygon><polygon fill="#FFF" points="180 300 90 450 270 450"></polygon><polygon fill="#666" points="180 300 270 150 90 150"></polygon><polygon fill="#222" points="360 300 270 450 450 450"></polygon><polygon fill="#FFF" points="360 300 450 150 270 150"></polygon><polygon fill="#444" points="540 300 450 450 630 450"></polygon><polygon fill="#222" points="540 300 630 150 450 150"></polygon><polygon fill="#AAA" points="720 300 630 450 810 450"></polygon><polygon fill="#666" points="720 300 810 150 630 150"></polygon><polygon fill="#FFF" points="900 300 810 450 990 450"></polygon><polygon fill="#999" points="900 300 990 150 810 150"></polygon><polygon points="0 600 -90 750 90 750"></polygon><polygon fill="#666" points="0 600 90 450 -90 450"></polygon><polygon fill="#AAA" points="180 600 90 750 270 750"></polygon><polygon fill="#444" points="180 600 270 450 90 450"></polygon><polygon fill="#444" points="360 600 270 750 450 750"></polygon><polygon fill="#999" points="360 600 450 450 270 450"></polygon><polygon fill="#666" points="540 600 630 450 450 450"></polygon><polygon fill="#222" points="720 600 630 750 810 750"></polygon><polygon fill="#FFF" points="900 600 810 750 990 750"></polygon><polygon fill="#222" points="900 600 990 450 810 450"></polygon><polygon fill="#DDD" points="0 900 90 750 -90 750"></polygon><polygon fill="#444" points="180 900 270 750 90 750"></polygon><polygon fill="#FFF" points="360 900 450 750 270 750"></polygon><polygon fill="#AAA" points="540 900 630 750 450 750"></polygon><polygon fill="#FFF" points="720 900 810 750 630 750"></polygon><polygon fill="#222" points="900 900 990 750 810 750"></polygon><polygon fill="#222" points="1080 300 990 450 1170 450"></polygon><polygon fill="#FFF" points="1080 300 1170 150 990 150"></polygon><polygon points="1080 600 990 750 1170 750"></polygon><polygon fill="#666" points="1080 600 1170 450 990 450"></polygon><polygon fill="#DDD" points="1080 900 1170 750 990 750"></polygon></g></pattern></defs><rect x="0" y="0" fill="url(#a)" width="100%" height="100%"></rect><rect x="0" y="0" fill="url(#b)" width="100%" height="100%"></rect></svg></div>
    <div className="card__avatar">
        <img className='rounded-full mb-5' src={data.userPicture} alt={data.username} />
      </div>
    <div className="card__title ">{data.username}</div>
    <div className="card__subtitle">{data.userBio}</div>
    <div className="card__wrapper">
        <button className="flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#eabd11"} fill={"none"}>
    <path d="M21.1677 7C22.2774 9.54466 22.2774 12.4569 21.1677 15.0015M2.83226 15.0015C1.72258 12.4569 1.72258 9.54466 2.83226 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13.3472 19.9619C12.9858 20.3071 12.5028 20.5 12.0002 20.5C11.4975 20.5 11.0145 20.3071 10.6531 19.9619C7.34389 16.7821 2.90913 13.2299 5.07183 8.07272C6.24118 5.28428 9.04815 3.5 12.0002 3.5C14.9522 3.5 17.7591 5.28428 18.9285 8.07272C21.0885 13.2234 16.6646 16.793 13.3472 19.9619Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M15 11C15 12.6569 13.6569 14 12 14C10.3431 14 9 12.6569 9 11C9 9.34315 10.3431 8 12 8C13.6569 8 15 9.34315 15 11Z" stroke="currentColor" strokeWidth="1.5" />
</svg>{data.address}</button>
        <button className="flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"skyblue"} fill={"none"}>
    <path d="M22 12.6344C18 16.1465 17.4279 10.621 15.3496 11.0165C13 11.4637 11.5 16.4445 13 16.4445C14.5 16.4445 12.5 10.5 10.5 12.5556C8.5 14.6111 7.85936 17.2946 6.23526 15.3025C-1.5 5.81446 4.99998 -1.14994 8.16322 3.45685C10.1653 6.37256 6.5 16.9769 2 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 21H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>{ data.joinedTime.includes('http') ? (<a target='_blank' href={data.joinedTime}>{data.joinedTime}</a>) : data.joinedTime}</button>
    </div>
</div>
        )) : null
      }</div>



{userDetails &&  (
               <div className=' sm:ml-64 p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700'> 
                
                
                <div className="grid gap-6 lg:grid-cols-3 lg:grid-rows-3 md:grid-cols-1 sm:grid-cols-1 sm:min-w-full">
                    {userDetails.posts.map((post, index) => (
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
                                    
                                />
                                <div>
                                    <p className="font-semibold cursor-pointer" >{post.author}</p>
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
                    
                </div></div>
            )}




    </div>
  )
}

export default User
