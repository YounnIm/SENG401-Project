from app.models import db, User, Movie, Review


def add_review_controller(data):
    new_review = Review(
        user_id=data['user_id'],
        movie_id=data['movie_id'],
        review_text=data['review_text'],
    )
    db.session.add(new_review)
    db.session.commit()
    return {"message": "Review added!"}

def add_movie_controller(data):
    new_movie = Movie(
        title=data["title"],
        plot=data["plot"],
        poster_url=data["poster_url"],
    )
    db.session.add(new_movie)
    db.session.commit()
    return {
        "message": "Movie added successfully",
        "movie": {
            "id": new_movie.id,
            "title": new_movie.title,
            "plot": new_movie.plot,
            "poster_url": new_movie.poster_url,
        }
    }

def get_movie_by_id_controller(movie_id):
    movie = Movie.query.get(movie_id)
    if movie:
        return {
            "id": movie.id,
            "title": movie.title,
            "plot": movie.plot,
            "poster_url": movie.poster_url,
        }
    return None

def delete_movie_controller(movie_id):
    """Delete a movie by ID."""
    print(f"Attempting to delete movie with ID: {movie_id}")
    movie = Movie.query.get(movie_id)
    if movie:
        db.session.delete(movie)
        db.session.commit()
        return True
    return False

def get_all_movies_controller():
    movies = Movie.query.all()
    result = []
    for m in movies:
        result.append(
            {
                "id": m.id,
                "title": m.title,
                "plot": m.plot,
                "poster_url":m.poster_url,
            }
        )
    return result


def register_user_controller(data):
    new_user = User(
        username=data['username'],
        #email=data['email'],
        password=data['password'],  # Store plain text password
    )
    db.session.add(new_user)
    db.session.commit()
    return {"message": "User registered!", "user_id": new_user.id}


def login_user_controller(data):
    user = User.query.filter_by(username=data['username']).first()
    if user and user.password == data['password']:  # Compare plain text passwords
        return {"message": "Login successful!", "user_id": user.id}
    return {"message": "Invalid credentials"}

def get_review_controller(movie_id):
    reviews = (
            db.session.query(Review, User.username)
            .join(User, Review.user_id == User.id)
            .filter(Review.movie_id == movie_id)
            .all()
        )
    result = []
    for review, username in reviews:
        result.append({
                "id": review.id,
                "username": username,  
                "review_text": review.review_text,
            })
    for res in result:
        print(res['review_text'])
    return result