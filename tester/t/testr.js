const coco = require('util')
const fs = require('fs')
const readFile = coco.promisify(fs.readFile)
const main = async() =>{
    const code = await readFile('./final.js', 'utf-8')
    eval(code)
}
main()