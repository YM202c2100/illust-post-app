export const MyIllust:React.FC= ()=>{
  return (
    <div className="xl:flex justify-center space-x-8">
      <div className="w-[90vh] h-[90vh] bg-gray-300 rounded-3xl">

      </div>

      <div className="w-[45vh] h-[90vh] space-y-2 flex flex-col gap-1">
        <div className="flex-grow bg-slate-400 rounded-3xl"></div>
        <div className="h-[30%] bg-slate-400 rounded-3xl"></div>
        <div className="h-[40%] bg-slate-400 rounded-3xl"></div>
        <div className="h-[20%] bg-slate-400 rounded-3xl"></div>
      </div>
    </div>
  )
}