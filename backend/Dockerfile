FROM python:3.11-bullseye

WORKDIR /app

COPY ./requirements.txt .

RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    git \
    libffi-dev \
    curl \
 && curl https://sh.rustup.rs -sSf | sh -s -- -y \
 && PATH="/root/.cargo/bin:$PATH" pip install --upgrade pip setuptools wheel \
 && PATH="/root/.cargo/bin:$PATH" pip install --no-cache-dir -r requirements.txt \
 && rm -rf /var/lib/apt/lists/*

COPY . /app

EXPOSE 8000

CMD ["daphne", "-b", "0.0.0.0", "-p", "8000", "backend.asgi:application"]
