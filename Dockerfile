# syntax=docker.io/docker/dockerfile:1
FROM docker.io/library/python:3.12.2-slim AS build-python-base
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    POETRY_VERSION=1.8.2 \
    POETRY_HOME="/opt/poetry" \
    POETRY_VIRTUALENVS_IN_PROJECT=true \
    POETRY_NO_INTERACTION=1 \
    PYSETUP_PATH="/opt/pysetup" \
    VENV_PATH="/opt/pysetup/.venv"
ENV PATH="$POETRY_HOME/bin:$VENV_PATH/bin:$PATH"
RUN adduser --system --no-create-home edazzip

# build chain
#FROM build-python-base as build-chain
#RUN apt-get update
#RUN apt-get install --no-install-recommends -y curl build-essential pkg-config

# poetry and application runtime
#FROM build-chain as build-runtime-deps
FROM build-python-base AS build-runtime-deps
COPY ./install-poetry.py /
RUN python /install-poetry.py
WORKDIR $PYSETUP_PATH
COPY ./poetry.lock ./pyproject.toml ./
RUN poetry install --only main

# development
#FROM build-chain as development
FROM build-python-base AS development
COPY --from=build-runtime-deps $POETRY_HOME $POETRY_HOME
COPY --from=build-runtime-deps $PYSETUP_PATH $PYSETUP_PATH
WORKDIR $PYSETUP_PATH
RUN poetry install
WORKDIR /app
COPY server.py .
USER edazzip
CMD ["python","server.py"]
EXPOSE 31337

# runtime
FROM build-python-base AS production
COPY --from=build-runtime-deps $PYSETUP_PATH $PYSETUP_PATH
WORKDIR /app/
COPY server.py .
USER edazzip
CMD ["python","server.py"]
EXPOSE 31337
