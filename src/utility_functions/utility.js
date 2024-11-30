import axios from 'axios';

const base_url = 'http://localhost:3000'


export async function fetchData(prompt) {
    try {
        const response = await axios.get(`${base_url}/search?prompt=${prompt}`);
        
        return response.data;
    }
  catch (err) {
    console.error('Error fetching data:', err);
   
  }
}


export async function fetchArticle(url) {
  try {
    const response = await axios.get(`${base_url}/article?url=${url}`);
    
    return response.data;
  } catch (err) {
    console.error('Error fetching article:', err);
   
  }
}


export async function getTags() {
  try {
    const response = await axios.get(`${base_url}/tags`);
    
    return response.data;
  } catch (err) {
    console.error('Error fetching tags:', err);
   
  }
}


export async function getUserData(username) {
  try {
    const response = await axios.get(`${base_url}/username?username=${username}`);
   
    return response.data;
  }
  catch (err) {
    console.error('Error fetching user data:', err);
   
  }
}

(async () => {
  try {
    const response = await axios.get(`${base_url}/tags`);
    
   
    localStorage.setItem('tags', JSON.stringify(response.data.tags));
  } catch (err) {
    console.error('Error fetching tags:', err);
   
  }
})()



export async function getVideos(page = 1) {
  const urlprefix = 'https://dev.to/api/videos?page='
 const urlpostfix = '&signature=4332367'
  try {
    const res = await fetch(urlprefix + page + urlpostfix)
    const data = await res.json()
   
    return data
  }
  catch (err) {
    console.log(err)
  }
}

