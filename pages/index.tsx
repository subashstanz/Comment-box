import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import CommentBox from './commentBox'

export default function Home() {
  return (
    <div className='w-screen h-screen bg-gray-300'>
     <CommentBox />
    </div>
  )
}
