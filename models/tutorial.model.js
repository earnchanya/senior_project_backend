module.exports = mongoose => {
     const Schema = mongoose.Schema
     const threadScheme = new Schema({
          _id: String,
          title: String,
          permalink: String,
          tags: Array,
          images: Array,
          probability: Array,
          total_probability: Array,
          clickstream: Number
     })
     threadScheme.method("toJSON", function() {
          const { __v, _id, ...object } = this.toObject();
          object.id = _id;
          return object;
     });
     const ThreadModel = mongoose.model('users', threadScheme)
     return ThreadModel;
};