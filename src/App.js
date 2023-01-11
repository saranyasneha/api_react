
import './App.css';
import Axios from "axios";
import React, { useEffect, useState } from 'react';


const App=()=> {

  const [users,setUsers]=useState([]);
  const [search,setSearch]=useState("");
  const [usersPerPage,setUserPerPage]=useState(5);
  const [currentPage,setCurrentPage]=useState(1)

  const numberOfTotalPages=Math.ceil(users.length/usersPerPage);
  const pages=[...Array(numberOfTotalPages+1).keys()].slice(1);
  const indexOfLastUser=currentPage*usersPerPage;
  const indexOfFirstUser=indexOfLastUser-usersPerPage;

  const visibleUsers=users.slice(indexOfFirstUser,indexOfLastUser);

 const getUserData=async ()=>{
  try{
    const data=await Axios.get("https://jsonplaceholder.typicode.com/users");
   setUsers(data.data);
  }
  catch(e){
    console.log(e);
  }
 };

 useEffect(()=>{
  
  getUserData();
 },[]);
  return (
    
    <div className='App'>
<div className='search'>
    <input
    type="text" 
    className='seach-box'
    placeholder="Search Name.."
    onChange={(e)=>{
       setSearch(e.target.value);
    }}/>
</div>
  <table>
  <thead>
  <tr>
    <th>Id</th>
    <th>Name</th>
    <th>User Name</th>
    <th>City</th>
    <th>Phone</th>
    <th>Website</th>
  </tr>
  </thead>
  <tbody>
  {visibleUsers.filter((item)=>{
      if (search==""){
        return item;
      }
      else if(item.name.toLowerCase().includes(search.toLowerCase())){
        return item;
      }
      
   }).map((item)=>{
       return (
  <tr>
    <td>{item.id}</td>
    <td>{item.name}</td>
    <td>{item.username}</td>
    <td>{item.address.city}</td>
    <td>{item.phone}</td>
    <td>{item.website}</td>
  </tr>);
   })}
   
  </tbody>
</table>
 
<div className='pagination'>{pages.map(page=><span key={page} 
onClick={()=>setCurrentPage(page)} 
className={`${currentPage===page?"active":""}`}>{page}</span>)}</div>

  </div>
  
  )};
export default App;
