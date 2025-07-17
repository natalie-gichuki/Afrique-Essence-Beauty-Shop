import unittest
from app import create_app, db
from app.models.user import User
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash

class AuthTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app("testing")
        self.client = self.app.test_client()

        with self.app.app_context():
            db.create_all()
            # Pre-create a test user
            user = User(
                username="testuser",
                email="test@example.com",
                password_hash=generate_password_hash("testpass"),
                role="customer"
            )
            db.session.add(user)
            db.session.commit()

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def test_register_user_success(self):
        response = self.client.post('/auth/register', json={
            "username": "newuser",
            "email": "new@example.com",
            "password": "newpass"
        })
        self.assertEqual(response.status_code, 201)
        self.assertIn(b'User registered successfully', response.data)

    def test_register_existing_email(self):
        response = self.client.post('/auth/register', json={
            "username": "duplicate",
            "email": "test@example.com",
            "password": "somepass"
        })
        self.assertEqual(response.status_code, 400)
        self.assertIn(b'Email already exists', response.data)

    def test_register_missing_fields(self):
        response = self.client.post('/auth/register', json={
            "username": "incomplete"
            # Missing email and password
        })
        self.assertEqual(response.status_code, 400)

    def test_login_success(self):
        response = self.client.post('/auth/login', json={
            "email": "test@example.com",
            "password": "testpass"
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'access_token', response.data)

    def test_login_invalid_password(self):
        response = self.client.post('/auth/login', json={
            "email": "test@example.com",
            "password": "wrongpass"
        })
        self.assertEqual(response.status_code, 401)
        self.assertIn(b'Invalid email or password', response.data)

    def test_login_nonexistent_user(self):
        response = self.client.post('/auth/login', json={
            "email": "ghost@example.com",
            "password": "doesntmatter"
        })
        self.assertEqual(response.status_code, 401)

    def test_disabled_user_login(self):
        with self.app.app_context():
            user = User.query.filter_by(email="test@example.com").first()
            user.role = "disabled"
            db.session.commit()

        response = self.client.post('/auth/login', json={
            "email": "test@example.com",
            "password": "testpass"
        })
        self.assertEqual(response.status_code, 403)
        self.assertIn(b'User account is disabled', response.data)

    def test_profile_access_success(self):
        with self.app.app_context():
            user = User.query.filter_by(email="test@example.com").first()
            token = create_access_token(identity=user.id)

        response = self.client.get('/auth/profile', headers={
            "Authorization": f"Bearer {token}"
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'test@example.com', response.data)

    def test_profile_access_unauthorized(self):
        response = self.client.get('/auth/profile')  # No token
        self.assertEqual(response.status_code, 401)

if __name__ == '__main__':
    unittest.main()
