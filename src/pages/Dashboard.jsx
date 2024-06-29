import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import "./css/Dashboard.css"
import axios from 'axios';

import { Button } from '../components/Button'
import { Card } from '../components/Card';
import { Header } from './Header';
import { Footer } from './Footer';
import { Searchbar } from '../components/Searchbar';
import Pagination from '../components/Pagination';
export const Dashboard = () => {
    const handleClick = (data) => {
       console.log(data.id);
      };
      const [Data, setData] = useState([]);
      useEffect(() => {
         axios.get('http://localhost:3001/items').then((response) => {
           setData(response.data);
         });
       }, []);
      
       const totalProduct=Data.length
       const productPerPage=5
       const totalPages=totalProduct/10
        //totalItems, itemsPerPage, onPageChange
        console.log(Data);
  return (
   <>
   <Header/>
    {totalProduct}

   {Data.map((data)=> {return(<><div className="card">
    {/* <Button onClick={()=>handleClick(data.id)} color="green"
   text="Add to Cart"> 

      </Button>*/}
       <Card 
        title={data.name}
        content={data.description}
        backgroundColor="#ffffff"
        image={data.photo}
        border="#38a2ff"
      />
      <img src={data.photo}/> 
      <Link to={`/items/${data._id}`}>Delete</Link>
      {data._id}
   </div></>)})}
     <Pagination
itemsPerPage={productPerPage}
totalItems={totalProduct}
     /><Footer/>
   </>
  )
}
