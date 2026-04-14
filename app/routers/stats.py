from fastapi import APIRouter, HTTPException, Depends, Request
from fastapi.responses import HTMLResponse, RedirectResponse
from sqlmodel import select
from app.database import SessionDep
from app.models import *
from app.auth import *
from fastapi.security import OAuth2PasswordRequestForm
from typing import Annotated
from fastapi import status
from . import templates

stats_router = APIRouter(tags=["Statistics"])

@stats_router.get("/stats", response_class=HTMLResponse)
async def stats_page(
    request: Request,
    user: AdminDep
):
    """
    Render the statistics page (admin only)
    """
    return templates.TemplateResponse(
        request=request, 
        name="stats.html",
        context={
            "request": request,
            "current_user": user
        }
    )

@stats_router.get("/todo-stats")
async def todo_stats(
    request: Request,
    user: AdminDep,
    db: SessionDep
):
    """
    API endpoint that returns todo statistics grouped by user
    Returns a dictionary with usernames as keys and todo counts as values
    """
    # Get all todos
    todos = db.exec(select(Todo)).all()
    
    # Count todos per user
    res = {}
    for todo in todos:
        if todo.user.username in res:
            res[todo.user.username] += 1
        else:
            res[todo.user.username] = 1
    
    return res
