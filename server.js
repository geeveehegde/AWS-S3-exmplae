import express from "express";
import { handler } from './build/handler.js';
import multer from "multer";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"; // ES Modules import
import mongoose from "mongoose";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import model from "./userdata.js";

const Item = mongoose.model('Item')

/**
 * 
 * 
 * 
 */
const username = encodeURIComponent("<mongo_username>");
const password = encodeURIComponent("<mongo_password>");
const credentials = {
	accessKeyId:'access_id',
	secretAccessKey:'access_secret'
}
const uri = `mongo_uri`
/**
 * 
 * 
 * 
 */
const storage = multer.memoryStorage();
const upload = multer({storage: storage,limits: { fileSize: 3 * 1024 *1024 * 1024 }})
const client = new S3Client({
	region:'ap-south-1',
	credentials: credentials
});

mongoose.connect(uri).then(() => {
	console.log('connection done!!');
	const app = express()
	const port = 3000;
	
	app.get('/listfiles', async(req,res) => { // list files in the database
		const arr = await Item.find({});
		return res.json({status:200, data:arr});
	});
	
	app.get('/getFile/:file', async(req,res) => { // get perticular file
		const file = req.params["file"];
		const data = await Item.find({name:'geevi/default/'+file}).exec();
		return res.json({status:200, data:data});
	});
	
	app.post('/uploadFiles/',upload.any(), (req,res) => { // upload files to AWS and store signed url in database
		const file = req.files[0];
		const params = {
			Bucket:"pisignage-test",
			Key: 'geevi/default/'+file.originalname,
			Body:file.buffer,
			ContentType: file.mimetype
		};
		const command = new PutObjectCommand(params);
		client.send(command).then(async(resp) => {
			const getCommand = new GetObjectCommand({"Bucket":"pisignage-test","Key":'geevi/default/'+file.originalname});
			const url = await getSignedUrl(client,getCommand, {expiresIn:360000});
			await Item.create({name:'geevi/default/'+file.originalname, path:url, Key:file.originalname})
				
		});
	});
	
	app.delete('/deleteFile/:file',async(req, res) => { // delete file in the database
		const file = req.params["file"];
		const decoded = decodeURIComponent(file);
		await Item.deleteOne({name:decoded})
		return res.json({status:200, data:''});
	});

	app.use(handler);
	app.listen(port, () => {
	  console.log(`Example app listening on port ${port}`)
	})
}).catch(err => {
	console.log(err)
})



