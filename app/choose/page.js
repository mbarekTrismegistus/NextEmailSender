import dynamic from 'next/dynamic'

 
const Choose = dynamic(() => import('./choose'), { ssr: false })

export default function page() {
    
    
  return (
    <div className='choose'>
        <Choose/>
    </div>
  )
}