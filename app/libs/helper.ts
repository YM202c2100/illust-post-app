export function convertToValidSrc(filename:string){
  return "/postedImages/"+filename
}

export function formatDate(dateTime:string){
  const dateISO8601 = new Date(dateTime)
  
  //getMonthは0~11を返すため+1
  const month = dateISO8601.getMonth()+1
  const date = dateISO8601.getDate()
  return `${month}/${date}`
}