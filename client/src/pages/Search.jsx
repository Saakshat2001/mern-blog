import { TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useNavigation } from "react-router-dom";

export default function Search() {

    const navigate = useNavigate();
    const location = useLocation();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);

    const [sideBarData , setSideBarData] = useState({
        searchTerm: '',
        sort: 'desc',
        category : 'uncategorized'
    })
    
    useEffect(() => {

    } , [location.search])

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm' , searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
      }

  return (
    <div className='flex flex-col md:flex-row'>
    <div className='p-7 border-b md:border-r md:min-h-screen border-gray-500'>
      <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
        <div className='flex   items-center gap-2'>
            <label>Search Term:</label>
            <TextInput placeholder='Search...' id = 'searchTerm' type='text'/>
            </div>
            </form>
            </div>
            </div>
  )
}
