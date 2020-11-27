const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')

const Product = require('../models/product')
const {errorHandler} = require('../helpers/dbErrorHandler')

exports.create = (req, res) => {

	let form = new formidable.IncomingForm()
	form.keepExtensions = true
	form.parse(req, (err, fields, files) => {
		if(err){
			return res.status(400).json({
				err: "Image could not be uploaded!!"
			})
		}
	//check for all fields
	const {name, description, price, category, quantity, shipping} = fields
	
	if(!name || !description || !category || !price || !shipping){
		return res.status(400).json({
			err: "All fields are required!!"
	});
}
		let product = new Product(fields)

		//1kb = 1000
		//1mb = 100000

		//models photo is a pojo name
		if(files.photo){
			//console.log('FILES PHOTO: ', files.photo)
			if(files.photo.size > 1000000) {
				return res.status(400).json({
				err: "Image should be less than 1 MB in size"
			});
			}
			product.photo.data = fs.readFileSync(files.photo.path)
			product.photo.contentType = files.photo.type
		}
			product.save((err,result) => {
				if(err) {
					return res.status(400).json({
						err: errorHandler(err)
					})
				}
				res.json(result);
			});
	});

};
