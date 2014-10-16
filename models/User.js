mmodule.exports = function(mongoose){
	var Schema = mongoose.Schema;

	var UserShema = new Schema({
		name: String,
		birthdate: Date,
		isAdmin: Boolean
	});

	UserShema.methods.age = function(){
		return ~~((Date.now() - this.birthdate) / (315576000000));
	}

	return mongoose.model('User', UserShema);
}