
function padZero(num:number) {
    return num.toString().padStart(2, '0');
}

export const formatDate = (date:Date) => { 

return `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())}`;
 
}
export const formatStarAndEndDate = (date:{startTime:Date | null, endTime:Date| null}) => { 
    if(!date.startTime || !date.endTime) return undefined;
    
    return {
        startDate: formatDate(date.startTime),
        endDate: formatDate(date.endTime)
      };
}