import axios from 'axios';
import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom';

const Read = () => {
    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        axios.get("https://636389a78a3337d9a2e04a35.mockapi.io/data")
            .then((response) => {
                setApiData(response.data)
            })
    })
    const setData=(data)=>{
        console.log(data);
        let { id, firstName, lastName, checkbox } = data;
        localStorage.setItem('ID', id);
        localStorage.setItem('First Name', firstName);
        localStorage.setItem('Last Name', lastName);
        localStorage.setItem('Checkbox Value', checkbox)

    }
    const onDelete = (id) => {
        axios.delete(`https://636389a78a3337d9a2e04a35.mockapi.io/data/${id}`)
        .then(()=>{
            getData();
        })
      }
      const getData = () => {
        axios.get(`https://636389a78a3337d9a2e04a35.mockapi.io/data`)
            .then((getData) => {
                setApiData(getData.data);
             })
    }
    return (
        <div>
            <table class="ui celled table">

                <thead>
                    <tr>
                        <th>firstName</th>
                        <th>lastName</th>
                        <th>Checkbox</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {apiData.map((data) => {
                        return (
                            <tr>
                                <td data-label="Name">{data.firstName}</td>
                                <td data-label="Age">{data.lastName}</td>
                                <td data-label="Job">{data.checkbox}</td>
                                <Link to="/update"> 
                                <td ><button onClick={()=>setData(data)}>Update</button></td>
                                
                                </Link>
                                <td ><button onClick={()=>onDelete(data.id)}>Delete</button></td>
                                
                            </tr>
                        )
                    })}
                </tbody>
            </table></div>
    )
}

export default Read