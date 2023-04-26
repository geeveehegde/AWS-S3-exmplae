import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ItemsSchema = new Schema({
	name:{type:String},
	path:{type:String},
	Key:{type:String}
});

const model = mongoose.model("Item", ItemsSchema);
export default model