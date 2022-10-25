import React, { useState } from 'react'
import Header from '../components/Header'
import Search from '../components/Search'
import TableResponse from '../components/TableResponse'
import {getPedidoReference} from  '../services/getPedidoReference'
const Home = () => {
    const[data,setData]=useState([])
    
    
    return (
        <>
            <Header></Header>
            <Search data ={data} setData={setData}></Search>
            <TableResponse data={data} setData={setData}></TableResponse>
        </>

    )
}

export default Home