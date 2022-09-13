export const sleep = async(dlay:number) => {
    await new Promise(r => setTimeout(() => r(true), dlay))
}
export const removeFromArray = <T>(arr:T[], itme:T) =>{
    return arr.filter(theItme => {
        return itme != theItme
    })
}