import './App.css';
import React,{useState,useEffect} from 'react'
import Axios from 'axios';
require('dotenv').config();
function App() {
  const [MovieName,setMovieName]=useState('');
  const [MovieReview,setReview]=useState('');
  const [MovieReviewList,setList]=useState([]);
  const [newReview,setNewReview]=useState("");
useEffect(()=>{
  Axios.get("http://localhost:PORT_NUMBER/api/get").then((response)=>{
    setList(response.data);
  })
},[])




  const SubmitReview=()=>{
Axios.post("http://localhost:PORT_NUMBER/api/insert",{
  movieName:MovieName,
  moviewReview:MovieReview,
});
setList([...MovieReviewList,
  {MovieName:MovieName,MovieReview:MovieReview}
])
}
  const DeleteReview=(movie)=>{
    Axios.delete(`http://localhost:PORT_NUMBER/api/delete/${movie}`)
  }
  const UpdateReview=(movie)=>{
    console.log(`thishishis ${movie}`);
    Axios.put(`http://localhost:PORT_NUMBER/api/update/${movie}`,{
      movieName:movie,
      moviewReview:newReview,
    })
  }
  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>
      <div className='form'>
        <label><b>Movie Name</b></label>
      <input type="text" onChange={(e)=>{
        setMovieName(e.target.value)
      }} name="MovieName" />
      <label><b>Movie Review</b></label>
      <input type="text"  onChange={(e)=>{
        setReview(e.target.value)
      }} name="MovieReview" /><br/>
      <button className='btn btn-success' type='submit' onClick={SubmitReview}>Submmit</button>
      {MovieReviewList.map((val)=>{
    return <div className='card'>
   <h1>{val.MovieName}</h1>
    <p>{val.MovieReview}</p>
    <input type="text"  className='updateInput' onChange={(e)=>{
      setNewReview(e.target.value)
    }} />
    <button type='button' className='btn btn-outline-warning btn-sm' onClick={()=>UpdateReview(val.MovieName)}>Update</button>
    <button type='button' className='btn btn-outline-danger btn-sm' onClick={()=>{DeleteReview(val.MovieName)}}>Delete</button>
    </div>
  })}
    </div>
    </div>

  );
}

export default App;
