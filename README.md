# 3scale Hello World NodeJS app

This is a 'hello world' REST API to use as a starting point for integrating your APIs with the 3scale NodeJS plugin. 

# Install the 3scale NodeJS library with ```npm install 3scale```

# Group Hello World API

# hello [/hello]

'Hello world' endpoint.

## hello [POST] 

'Hello world' endpoint.

+ Request (application/json)
    + Body
            {
              "hello": "world"
            }

+ Response 200 (application/json)
    + Body
            {
              "msg": "Hello world"
            }
