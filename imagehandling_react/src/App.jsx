import React, { useState } from 'react';

const App = () => {
  const [file, setFile] = useState(null);
  const [imglink, setImgLink] = useState(null);
  const [originalName, setOriginalName] = useState(null);
  const [error,setError] = useState(null)

  console.log(file)

  const handleImageUpload = async (e) => {
    e.preventDefault();
    setImgLink(null);
    const formData = new FormData();
    formData.append('file', file);
    if (!file) {
      setError('Please select an image to upload.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('File type is not supported. Please upload an image.');
      return;
    }
      try {
        const response = await fetch('http://localhost:3000/uploads', {
          method: 'POST',
          body: formData,
          credentials: 'include',
          mode: 'cors',
        });
        const responseData = await response.json();
        if (!responseData.success) {
          console.log(responseData.error);
        } else {
          console.log(responseData);
          setImgLink(responseData.path.filename);
          setOriginalName(responseData.path.originalfilename)
          setFile('')
          setError('')
        }
      } catch (error) {
        setError('can not upload image')
      }
    }

  return (
    <>
      <form onSubmit={handleImageUpload}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <input type="submit" value="Upload" />
      </form>

      {imglink && (
        <div style={{width:'200px', marginTop:'20px'}}>
          <img src={`http://localhost:3000/public/Images/${imglink}`} height={200} width={200} alt="" />
          <p style={{textAlign:'center'}}>{originalName?originalName:''}</p>
        </div>
      )}

      {error ? error : ''}
    </>
  );
}
export default App;
