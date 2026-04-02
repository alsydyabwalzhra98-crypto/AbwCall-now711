import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.main import app
from app.api.deps import get_db
from app.core.config import settings


# Override database dependency for testing
@pytest.fixture
def db_session():
    # Create test database session
    # This is a simplified version - in production, use a test database
    from app.db.session import SessionLocal
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@pytest.fixture
def client(db_session):
    def override_get_db():
        try:
            yield db_session
        finally:
            pass
    
    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()


def test_signup(client):
    response = client.post(
        f"{settings.API_V1_STR}/auth/signup",
        json={
            "email": "test@example.com",
            "password": "testpassword123",
            "name": "Test User",
            "phone": "+1234567890"
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "test@example.com"
    assert data["name"] == "Test User"


def test_login(client):
    # First signup
    client.post(
        f"{settings.API_V1_STR}/auth/signup",
        json={
            "email": "test2@example.com",
            "password": "testpassword123",
            "name": "Test User 2"
        }
    )
    
    # Then login
    response = client.post(
        f"{settings.API_V1_STR}/auth/login",
        data={"username": "test2@example.com", "password": "testpassword123"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"


def test_get_current_user(client):
    # Signup and login
    client.post(
        f"{settings.API_V1_STR}/auth/signup",
        json={
            "email": "test3@example.com",
            "password": "testpassword123",
            "name": "Test User 3"
        }
    )
    
    login_response = client.post(
        f"{settings.API_V1_STR}/auth/login",
        data={"username": "test3@example.com", "password": "testpassword123"}
    )
    token = login_response.json()["access_token"]
    
    # Get current user
    response = client.get(
        f"{settings.API_V1_STR}/auth/me",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "test3@example.com"
