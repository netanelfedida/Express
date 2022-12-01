const express = require('express');
const fs = require('fs');
const { parse } = require('path');

const router = express.Router();
router.use(express.json())


router.get('/', (req, res) => {
    const files = fs.readdir('./public', (err, files) => {
        if (err) {
            alert(err);
        }

        const objectUser = files.map((file, idx) => {
            const { size, birthtime } = fs.statSync(`./public/${file}`);
            return { Name: file.split('.')[0], Type: file.split('.')[1], Directory: fs.lstatSync(`./public/${file}`).isDirectory(), Size: size, Created: birthtime };


        })

        // console.log(objectUser)

        res.send(objectUser)
        res.end()
    })

})

router
    .route('/:fileName')
    .put((req, res) => {
        let dirNames = fs.readdirSync('./public')
        let check = dirNames.find(name => name == `${req.body.nameFile}.${req.params.fileName.split('.')[1]}`)
        if (check) {
            res.status(500).json({ msg: "this name alredy existed" })
        } else {
            try {
                fs.rename(`./public/${req.params.fileName}`, `./public/${req.body.nameFile}.${req.params.fileName.split('.')[1]}`, function (err, file) {
                    res.status(200).json({ msg: "File renamed!" })
                })
            } catch {
                res.status(500).json({ msg: "500" })
            }
        }
    })
    .post((req, res) => {
        let url = req.url;
        let { dir, base, name, ext } = parse(`${__dirname}/public${url}`)
        let allFiles = fs.readdirSync(`./public`);
let nameFile;
        allFiles.forEach((item) => {
            let num = 0 ; 
            if(item === `${name}${ext}`){
                   num ++
                  return  nameFile = `${name}(${num})${ext}`
            }
           
        })
        
        console.log(allFiles);

        // console.log("hey", allSameFiles);
        // console.log("all", allFiles);
        // console.log(`${__dirname}/publicN${url}`);


        // console.log('dir', dir)
        // console.log('base :>> ', base);
        // console.log('name', name)
        // console.log('ext :>> ', ext);
        // console.log('url', url)
        // console.log('__dirname :>> ', __dirname);


        // console.log("kjujyujhyh", `${dir}${url}}`, `${dir}/${name}1${ext}}`);

        try {
            fs.copyFile(`./public${url}`, `./public/${nameFile}`, (err) => {
                res.status(200).json({ msg: "File copied!" })
            })
        }
        catch {
            res.status(500).json({ msg: "Error" })
        }
    })
    .delete((req,res)=>{
        let url = req.url;
        
            fs.unlink(`./public${url}`,(err) =>{
                if(err){
                   res.status(500).json({ msg: err })  
                }
               res.status(200).json({ msg: "File deleted!" })
            })
             })



module.exports = router