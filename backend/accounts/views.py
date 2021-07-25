from django.shortcuts import render, redirect
<<<<<<< HEAD
from django.contrib.auth import (
    authenticate,
=======

from django.contrib.auth import (
    authenticate,
    get_user_model,
>>>>>>> 8dd004ffcbde8691d0914c23e803764fcefd1a53
    login,
    logout
)

<<<<<<< HEAD
from .forms import UserLoginForm

from .forms import UserRegisterForm
=======
from .forms import UserLoginForm, UserRegisterForm
>>>>>>> 8dd004ffcbde8691d0914c23e803764fcefd1a53


def login_view(request):
    next = request.GET.get('next')
    form = UserLoginForm(request.POST or None)
    if form.is_valid():
        username = form.cleaned_data.get('username')
        password = form.cleaned_data.get('password')
        user = authenticate(username=username, password=password)
        login(request, user)
        if next:
            return redirect(next)
        return redirect('/')

    context = {
        'form': form,
    }
<<<<<<< HEAD
=======

>>>>>>> 8dd004ffcbde8691d0914c23e803764fcefd1a53
    return render(request, 'login.html', context)


def register_view(request):
    next = request.GET.get('next')
    form = UserRegisterForm(request.POST or None)
    if form.is_valid():
        user = form.save(commit=False)
        password = form.save(commit=False)
        user.set_password(password)
        user.save()
        new_user = authenticate(username=user.username, password=password)
        login(request, new_user)
        if next:
            return redirect(next)
        return redirect('/')

    context = {
        'form': form,
    }
<<<<<<< HEAD
=======

>>>>>>> 8dd004ffcbde8691d0914c23e803764fcefd1a53
    return render(request, 'signup.html', context)


def logout_view(request):
    logout(request)
    return redirect('/')
