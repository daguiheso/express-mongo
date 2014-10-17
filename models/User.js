module.exports = function(mongoose){
	var Schema = mongoose.Schema;

	var UserSchema = new Schema({
		name: String,
		birthdate: Date,
		isAdmin: Boolean
	});

	UserSchema.methods.age = function(){
		return ~~((Date.now() - this.birthdate) / (31557600000));
	}

	return mongoose.model('User', UserSchema);
}