# edazzip

https://download4.epson.biz/sec_pubs/pos/reference_en/escpos/gs_lparen_cl.html

## dev

install dependencies: `poetry install --no-root --sync`

run server: `poetry run python server.py`

run server in container:

```plain
docker build -t edazzip:latest --target development .
docker run -p 31337:31337 edazzip:latest
```
