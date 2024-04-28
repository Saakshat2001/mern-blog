import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref,uploadBytesResumable } from "firebase/storage";
import { app } from '../firebase';
import {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'; 

export default function CreatePost() {
  const [file , setFile] = useState(null);
  const[imageFileUploadProgress , setimageFileUploadProgress] = useState(null);
  const[imageFileUploadError , setimageFileUploadError] = useState(null);
  const [formData , setFormData] = useState({});
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
        <h1 className='text-center text-3xl my-7 font-semibold'> Create a Post </h1>
        <form className='flex flex-col gap-4'>
                <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                <TextInput type = 'text' placeholder='Title' requireed id = 'title' className='flex-1' /> 
               <Select>
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
                  {formData && (
                    <img 
                    src= {formData.image}
                    alt='upload'
                    className='w-full h-72 object-cover'
                    />
                  )}
                <ReactQuill theme='snow' placeholder='Write something...' className='h-72 mb-12' required/>
                <Button type='submit' gradientDuoTone='purpleToPink'> 
                Publish
                </Button>
        </form>
        </div>
  )
}
