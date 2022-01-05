import Head from 'next/head'
import Image from 'next/image'
import AuthExample from '../components/authExample'
import styles from '../styles/Home.module.css'
import { useSelector } from 'react-redux'
import Login from "./login";
import Sign_In from "./signup";
import Profile from "./profile";

export default function Index() {


  return (
    <>
      <div>
        das hier ist nur die start seite, hier keine anderen pages aufrufen DANKE {"<3"}
      </div>
    </>
  )
}
