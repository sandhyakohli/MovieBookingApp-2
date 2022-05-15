module.exports = (mongoose) => {
    const Movie = mongoose.model(
      "movie",
      mongoose.Schema({
        movieid: {
          type: Number,
          required: true,
          unique: true,
        },
        title: {
          type: String,
          required: true,
        },
        published: {
          type: Boolean,
          required: true,
        },
        released: {
          type: Boolean,
          required: true,
        },
        poster_url: {
          type: String,
          required: true,
        },
        release_date: {
          type: String,
          required: true,
        },
        publish_date: {
          type: String,
          required: true,
        },
        artists: {
          type: [],
          required: true,
        },
        genres: {
          type: [],
          required: true,
        },
        duration: {
          type: Number,
          required: true,
        },
        critic_rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        trailer_url: {
          type: String,
          required: true,
        },
        wiki_url: {
          type: String,
          required: true,
        },
        story_line: {
          type: String,
          required: true,
        },
        shows: {
          type: [],
          required: true,
        },
      })
    );
    return Movie;
  };