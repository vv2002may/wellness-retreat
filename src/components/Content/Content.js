import React, { useState, useEffect } from 'react'
import './Content.css'

const dataURL = 'https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats';

export default function Content() {
   const [data, setData] = useState([])
   const [page, setPage] = useState(1);
   const [condition, setCondition] = useState('');

   useEffect(() => {
      fetch(`${dataURL}?page=${page}&limit=3&${condition}`)
         .then(response => response.json())
         .then(data => setData(data))
         .catch(error => console.error(error))
      console.log(condition);
   }, [page, condition])

   const typeChangeHandler = (event) => {
      setCondition(`filter=${event.target.value}`);
      setPage(1);
   }

   // given API does not have filter method for less than or greater than, so I have to filter the data in the frontend
   const dateChangeHandler = (event) => {
      const year = event.target.value;
      if (year == '') {
         setPage(1);
         setCondition('');
      }
      else {
         let newData = [];
         fetch(dataURL)
            .then(response => response.json())
            .then(data => {
               data.forEach(item => {
                  let date = new Date(item.date * 1000);
                  let dateYear = date.getFullYear();
                  if (dateYear == year) {
                     newData.push(item);
                  }
               })
               setData(newData);
            })
            .catch(error => console.error(error))
      }
   }

   const searchChangeHandler = (event) => {
      setCondition(`title=${event.target.value}`);
      setPage(1);
   }

   return (
      <div className='allContent'>
         <div className='filsea'>
            <div className='filter'>
               <select onChange={typeChangeHandler} className='type'>
                  <option value=''>Filter By Type</option>
                  <option value='Yoga'>Yoga</option>
                  <option value='Meditation'>Meditation</option>
                  <option value='Detox'>Detox</option>
               </select>
               <select onChange={dateChangeHandler}>
                  <option value=''>Filter By Date</option>
                  <option value='2023'>2023</option>
                  <option value='2024'>2024</option>
               </select>
            </div>
            <div className='search'>
               <input className='search-input' onChange={searchChangeHandler} type='text' placeholder='Search retreats by title' />
            </div>
         </div>
         <div className='content'>
            {
               data !== "Not found" ?
                  data.map(function (item, index) {
                     let date = new Date(item.date * 1000);
                     let dateStart = date.toLocaleString(
                        "en-US",
                        {
                           month: "short",
                           day: "2-digit",
                           year: "numeric",
                        }
                     )

                     return (
                        <div className='card' key={index}>
                           <h2 className='card-title'>{item.title}</h2>
                           <div className='card-data'>
                              <img className='card-image' src={item.image} />
                              <div className='card-content'>
                                 <p>{item.description}</p>
                                 <p>
                                    Date: {dateStart}
                                 </p>
                                 <p>Location: {item.location}</p>
                                 <p>Price: ${item.price}</p>
                              </div>
                           </div>
                        </div>
                     )
                  })
                  :
                  <p className='noDataFound'>No Retreats Found!</p>
            }
         </div>
         <div className='pagination'>
            <button className='previous' onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
            <button
               className='next'
               onClick={() => setPage(page + 1)}
               disabled={data.length == 0}>
               Next
            </button>
         </div>
      </div>
   )
}