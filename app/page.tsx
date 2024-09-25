import Link from "next/link";

export default function Home(){
  return(
    <div className="flex flex-col space-y-2 items-start">
      <TempLink pageName="post"/>
      <TempLink pageName="register"/>
      <TempLink pageName="login"/>
    </div>
  )
}

const TempLink:React.FC<{pageName:string}> = ({pageName})=>{
  return(
    <Link href={pageName} className="underline underline-offset-2">{pageName}</Link>
  )
}