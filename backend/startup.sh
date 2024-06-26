#!/usr/bin/env bash
# Exit on error
set -o errexit

# Modify this line as needed for your package manager (pip, poetry, etc.)
pip install -r requirements.txt

# Convert static asset files
python manage.py collectstatic --no-input

# Apply any outstanding database migrations
python manage.py makemigrations
python manage.py migrate

# # Create a virtual environment
# python3 -m venv venv

# # Activate the virtual environment
# source venv/bin/activate

# # Upgrade pip
# pip install --upgrade pip

# # Install required Python packages
# pip install django djangorestframework python-dateutil
# pip install djangorestframework-simplejwt

# # Run migrations 
# python manage.py makemigrations
# python manage.py migrate
