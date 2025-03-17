from app.models import db, User, Movie, Review

def add_review_controller(data):
    new_review = Review(
        user_id=data['user_id'],
        movie_id=data['movie_id'],
        rating=data['rating'],
        review_text=data['review_text']
    )
    db.session.add(new_review)
    db.session.commit()
    return {'message': 'Review added!'}

def get_all_movies_controller():
    movies = Movie.query.all()
    result = []
    for m in movies:
        result.append({
            'id': m.id,
            'title': m.title,
            'description': m.description,
            'release_year': m.release_year
        })
    return result

def register_user_controller(data):
    new_user = User(
        username=data['username'],
        email=data['email'],
        password=data['password']  # Plain password storage
    )
    db.session.add(new_user)
    db.session.commit()
    return {'message': 'User registered!'}

def login_user_controller(data):
    user = User.query.filter_by(username=data['username']).first()
    if user and user.password == data['password']:
        return {'message': 'Login successful!'}
    else:
        return {'message': 'Invalid credentials'}
