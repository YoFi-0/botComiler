const coco = require('util')
const fs = require('fs')
const readFile = coco.promisify(fs.readFile)
const path = require('path')
const main = async() =>{
    const code = await readFile(path.join(__dirname, 'final.js'), 'utf-8')
    const finalCode = code.replace(/--ssssssssssssssss--/g, 'test').replace('"--duygowudqywdiqwh--"', "null").replace('""--dqwtqwfdiuyqwdyfidqw--"', 'null')
    await eval(finalCode)
}
main()