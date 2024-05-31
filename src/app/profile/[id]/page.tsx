

export default function page({params}:any) {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen py-2'>
        <h1 >Profile Page</h1>
        <h2 className="bg-green-500 text-black rounded px-4 py-2 mt-3">{params.id}</h2>
      
    </div>
  )
}


