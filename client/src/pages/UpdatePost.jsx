import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref,uploadBytesResumable } from "firebase/storage";
import { app } from '../firebase';
import {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'; 
import {useNavigate, useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function CreatePost() {

    const {postId} = useParams(); 
  const navigate = useNavigate();
  const [file , setFile] = useState(null);
  const[imageFileUploadProgress , setimageFileUploadProgress] = useState(null);
  const[imageFileUploadError , setimageFileUploadError] = useState(null);
  const [formData , setFormData] = useState({});
  const [publishError , setPublishError] = useState(null);
  const {currentUser} = useSelector((state) => state.user);

  useEffect(() => {
      try{
            const fetchPosts = async () => {
                const res = await fetch(`/api/post/getposts?postId=${postId}`);
                const data = await res.json();
                 if(!res.ok){
                    console.log(data.message);
                    setPublishError(data.message);
                    return;
                 }
                 else{
                   
                    setPublishError(null);
                    setFormData(data.posts[0]);
                 }
            }
            fetchPosts();
      }catch(error){
        console.log(error);
      }
  } , [postId]);
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}` , {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(!res.ok){
        setPublishError(data.message);
        return;
      }
      if(res.ok){
        setPublishError(null);
        navigate(`/post/${data.slug}`);
        
      }
    }catch(error){
      setPublishError('Something went wrong');
    }

  }
  const handleUploadImage = async() => {
    try{
      if(!file){
        setimageFileUploadError('Please select an image');
        return;
      }
      setimageFileUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage , fileName);
      const uploadTask = uploadBytesResumable(storageRef , file);
      uploadTask.on('state_changed' ,(snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100; 
        setimageFileUploadProgress(progress.toFixed(0)); // storing image to firebase
      } , (error) => {
              setimageFileUploadError('Could not upload image (File must be less than 2MB )');
              setimageFileUploadProgress(null);
      },() => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setimageFileUploadProgress(null);
          setimageFileUploadError(null);
          setFormData({...formData , image: downloadURL });
        })
      }
    )
    } catch(error){
      setimageFileUploadError('Image upload failed');
      setimageFileUploadProgress(null);
            console.log(error);
    }
  }
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl my-7 font-semibold'> Update Post </h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                <TextInput type = 'text' placeholder='Title' required id = 'title' className='flex-1'
                onChange={(e) => setFormData({...formData , title: e.target.value})} 
                value={formData.title}
                /> 
               <Select
               onChange={(e) => setFormData({...formData , category: e.target.value})}
               value={formData.category}
               >
                <option value="uncategorized"> Select a category </option>
                <option value="javascript"> Javascript </option>
                <option value="reactjs"> React.js </option>
                <option value="nextjs"> Next.js </option>
               </Select>
                </div>
                <div className='flex gap-4 items-center justify-between border-4 border-dotted border-teal-500 p-3'>
                    <FileInput type='file' accept='image/*' onChange={(e) => setFile(e.target.files[0])}/>
                    <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline onClick={handleUploadImage}
                    disabled={imageFileUploadProgress}>
                      {imageFileUploadProgress ? 
                     ( <div className='w-16 h-16' >
                        <CircularProgressbar value={imageFileUploadProgress} text = {`${imageFileUploadProgress || 0}%`} />
                      </div>):('Upload Image')}
                        </Button>
                </div>
                {imageFileUploadError && <Alert color="failure">
                  {imageFileUploadError}
                  </Alert>}
                  {formData.image && (
                    <img 
                    src= {formData.image}
                    alt='upload'
                    className='w-full h-72 object-cover'
                    />
                  )}
                <ReactQuill theme='snow' 
                value = {formData.content} 
                placeholder='Write something...' className='h-72 mb-12' required
                onChange={(value) => {setFormData({...formData , content:value})}}
                />
                <Button type='submit' gradientDuoTone='purpleToPink'> 
                Update Post
                </Button>
        </form>
        </div>
  )
}
