import dynamic from 'next/dynamic'

 
const Mainemail = dynamic(() => import('./mainemail'), { ssr: false })

export default function page() {
    
    
  return (
    <div>
        <Mainemail/>
    </div>
  )
}
