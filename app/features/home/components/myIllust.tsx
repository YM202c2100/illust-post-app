export const MyIllust:React.FC= ()=>{
  return (
    <div className="flex flex-col xl:flex-row justify-center items-center gap-8">
      <div className="w-[90vh] h-[90vh] bg-gray-300 rounded-3xl">

      </div>

      <div className="h-[90vh] flex xl:flex-col gap-2">
        <div className="h-1/2 w-[45vh] bg-slate-300 rounded-2xl">

        </div>

        <div className="h-1/2 w-[45vh] flex flex-col gap-2">
          <div className="h-[30%] bg-slate-300 rounded-2xl"></div>
          <div className="flex-grow bg-slate-300 rounded-2xl"></div>
          <div className="h-[20%] bg-slate-300 rounded-2xl"></div>
        </div>
      </div>
    </div>
  )
}