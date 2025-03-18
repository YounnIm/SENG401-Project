import requests
from app import create_app, db
from app.models import Movie

# Put your actual OMDB API key here
OMDB_API_KEY = "c3300e02"
MOVIE_TITLES = [
    "The Shawshank Redemption",
    "The Godfather",
    "The Dark Knight",
    "Inception",
    "The Matrix",
    "The Lord of the Rings: The Fellowship of the Ring",
    "Forrest Gump",
    "Pulp Fiction",
    "Star Wars: Episode V – The Empire Strikes Back",
    "Interstellar",
    "Fight Club",
    "The Silence of the Lambs",
    "Schindler's List",
    "Titanic",
    "Goodfellas",
    "The Green Mile",
    "Parasite",
    "Gladiator",
    "Avengers: Endgame",
    "The Departed",
]

app = create_app()

with app.app_context():
    for title in MOVIE_TITLES:
        # Call OMDB API
        params = {"apikey": OMDB_API_KEY, "t": title}  # "t" param is the movie title
        response = requests.get("http://www.omdbapi.com/", params=params)
        data = response.json()

        if data.get("Response") == "True":
            # Extract the fields you care about
            movie_title = data.get("Title")
            release_date = data.get("Released")
            plot = data.get("Plot")
            poster_url = data.get("Poster")

            # Create a new Movie object
            new_movie = Movie(
                title=movie_title,
                release_date=release_date,
                plot=plot,
                poster_url=poster_url,
            )
            db.session.add(new_movie)

        else:
            print(f"OMDB could not find movie: {title}")

    db.session.commit()
    print("Movies added to the database!")
