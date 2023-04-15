import Head from 'next/head'
import Image from 'next/image'
import CommentBox from './commentBox'

export default function Home() {
  return (
    <div className='w-screen h-screen bg-gray-300'>
     <CommentBox />
    </div>
  )
}
