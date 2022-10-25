const dateFormatInputDate=(dateTime)=>{
    let date=new Date(dateTime);
    let year=date.getFullYear()
    let month =date.getMonth()+1
    let day=date.getDate()
    return `${year}-${month}-${day}`
    
}
export {dateFormatInputDate}

const dateFormat=(dateTime)=>{
    let date=new Date(dateTime);
    let year=date.getFullYear()
    let month =date.getMonth()+1
    let day=date.getDate()
    return `${day}-${month}-${year}`
    
}
export {dateFormat}
 