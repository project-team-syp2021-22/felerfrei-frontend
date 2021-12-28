import Head from 'next/head'
import Image from 'next/image'
import AuthExample from '../components/authExample'
import styles from '../styles/Home.module.css'
import { useSelector } from 'react-redux'

export default function Index() {


  return (
    <>
      <div>
        <AuthExample />
      </div>
    </>
  )
}
