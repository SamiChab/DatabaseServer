
const mongoose = require('mongoose');
const Schema = mongoose.Schema; // pareil que const { Schema } = mongoose

const noteSchema = new Schema({
	title: String,
	body: String,
	date: { type: Date, default: Date.now() } 
})

mongoose.model('notes', noteSchema);
