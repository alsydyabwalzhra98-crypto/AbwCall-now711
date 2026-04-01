from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import schemas
from app.crud import call as crud_call, user as crud_user
from app.api import deps
from app.models.user import User
from app.db.session import get_db

router = APIRouter()


@router.post("/", response_model=schemas.Call)
def make_call(
    *,
    db: Session = Depends(get_db),
    call_in: schemas.CallCreate,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    if current_user.balance <= 0:
        raise HTTPException(status_code=400, detail="Insufficient balance")

    active_call = crud_call.get_active_call(db, user_id=current_user.id)
    if active_call:
        raise HTTPException(status_code=400, detail="User already has an active call")

    call = crud_call.create_with_user(db=db, obj_in=call_in, user_id=current_user.id)
    return call


@router.get("/", response_model=List[schemas.Call])
def get_call_history(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    calls = crud_call.get_user_calls(db=db, user_id=current_user.id, skip=skip, limit=limit)
    return calls


@router.get("/rates", response_model=List[schemas.CallRate])
def get_call_rates() -> Any:
    return [
        schemas.CallRate(country="الأردن", country_code="+962", rate=0.05, currency="USD"),
        schemas.CallRate(country="مصر", country_code="+20", rate=0.08, currency="USD"),
        schemas.CallRate(country="السعودية", country_code="+966", rate=0.06, currency="USD"),
        schemas.CallRate(country="الإمارات", country_code="+971", rate=0.07, currency="USD"),
        schemas.CallRate(country="الكويت", country_code="+965", rate=0.07, currency="USD"),
        schemas.CallRate(country="USA", country_code="+1", rate=0.01, currency="USD"),
    ]


@router.get("/{call_id}", response_model=schemas.Call)
def get_call(
    *,
    db: Session = Depends(get_db),
    call_id: int,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    call = crud_call.get(db=db, id=call_id)
    if not call:
        raise HTTPException(status_code=404, detail="Call not found")
    if call.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return call


@router.post("/{call_id}/end")
def end_call(
    *,
    db: Session = Depends(get_db),
    call_id: int,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    call = crud_call.get(db=db, id=call_id)
    if not call:
        raise HTTPException(status_code=404, detail="Call not found")
    if call.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    from app.models.call import CallStatus
    call.status = CallStatus.COMPLETED
    db.commit()
    return {"message": "Call ended successfully"}
