import styles from './styles/users.module.scss'
import  Head  from "next/head"
import { useEffect, useState } from 'react'
import {atividades} from '../Components/atividades';
import {AuthContext} from '../Context/AuthContext';
import React, {useContext} from 'react'
import {useRouter} from 'next/router'
import Cookies from 'js-cookie'
import Header from '../Components/Header'
import { api } from '../../services/api';
import useSWR from 'swr'
import SessionOf from '../Components/SessionOf'

type userProps = {
  username: string;
  name: string;
  email: string;
  profile: string;
  phoneNumber: string;
  mobileNumber: string;
  address: string;
  location: string;
  postalCode: string;
  birthday: string;
  gender: string;
  
}
type Token = {
  username: string,
   tokenID: string,
    role: string,
     creationData: number, 
     expirationData: number
}


async function fetcher(path:string): Promise<userProps> {

  const token: Token  = Cookies.getJSON('token')
  return  await api.post(path,token).then(response => response.data);
  
}

export default function User(){
  const{subEdit,setSubEdit, authenticated} = useContext(AuthContext);
  const router = useRouter();
  
  const[page,changepage] = useState(1);
  
  const change = (number: number) => {
    if(number === 1){
      changepage(1);
    }
    if(number === 2){
      changepage(2);
    }
    if(number === 3){
      changepage(3);
    }
  }
  
  
  
 
  
  console.log(window.location.pathname)
  let username = window.location.pathname.replace('/','')
  console.log(username)
  //const token: Token  = Cookies.getJSON('token')
  const { data, error} = useSWR(`users/get/${username}`, fetcher);
  let  user: userProps = data;
  if (error) {return <SessionOf/>}
  if (!data) return <div>loading...</div>
    
 
return (
    
  <div className={styles.container}>
    <Head>
      <title>User</title>
      </Head>
    
    <div className={styles.header}>
      <Header/>
    </div>
    <div className={styles.banneravatar}>
      <div className={styles.banner}>
        <div className={styles.avatar}>
        
        </div>       
      </div>
      <div className={styles.userinfo}>
        <h2>{user.name}</h2>
        <p><span>@{user.username}</span></p><br/>
        <button onClick={()=>setSubEdit(!subEdit)}>Edit info</button>
        {
            subEdit ? <h1>oi</h1> : <></>
          }
        
      </div>
      <div>
      <hr className={styles.line}/>
        <div className={styles.atividades}>
         {atividades.map((item,index) =>{
           return(
              <button key={index} onClick={() => change(item.number)}>
                <span >{item.title}</span>
              </button>
           )
         })}
        </div>
       
        <div className={styles.currentpage}>
        <h1>{page}</h1>
        </div>
        <div></div>
      </div>

    </div>
    <div className={styles.other}></div>
   
   
  </div>
   

)
  
  









          
}