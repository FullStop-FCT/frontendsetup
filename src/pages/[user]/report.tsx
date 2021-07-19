import ReportForm from '../../Components/ReportForm';
import Head from "next/head";
import Header from '../../Components/Header'
import { Token } from '../../types';
import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie';
import styles from '../styles/createactivity.module.scss'

export default function Report() {

    let token: Token = null;
    
    let getJwt = Cookies.getJSON('token');

    if(getJwt){ 
        token = jwt_decode(Cookies.getJSON('token'));
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Denúncia</title>
            </Head>
            <div className={styles.header}>
                <Header />
            </div>
                
            <div className={styles.activityContainer}>
                <ReportForm />
            </div>
        </div>
    )
}