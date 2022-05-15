module.exports = (mongoose) => {
    const Genre = mongoose.model(
      "genre",
      mongoose.Schema({
        genreid: {
          type: Number,
          required: true,
          unique: true,
        },
        genre: {
          type: String,
          required: true,
        },
      })
    );
    return Genre;
  };