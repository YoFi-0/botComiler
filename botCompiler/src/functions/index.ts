export const sleep = async(dlay:number) => {
    await new Promise(r => setTimeout(() => r(true), dlay))
}