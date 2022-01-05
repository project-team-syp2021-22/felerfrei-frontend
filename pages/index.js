import Head from 'next/head'
import Image from 'next/image'
import AuthExample from '../components/authExample'
import styles from '../styles/Home.module.css'
import { useSelector } from 'react-redux'
import Log_In from "./Log_In";
import Sign_In from "./Sign_In";
import Account_Management from "./Account_Management";

export default function Index() {


  return (
    <>
      <div>
       <Log_In></Log_In>
            <Sign_In></Sign_In>
          testi
          <Account_Management></Account_Management>
      </div>
    </>
  )
}
