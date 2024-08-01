# gdsc-api-wrapper

# Setup

## Step 1: Install the packages required to run the server.

Run the following command:

```
npm install mongoose express dotenv
```

## Step 2: Setup the environment files.

Create a file named `.env` in the `src` folder and add the provided Mongo URI.
It should look like this when its done:

```
URI=<mongo uri here>
```

After this, you should be all set!

# API endpoints

## GET

`/api/users/all`: Returns an array with all the documents from the database _Status Code 200_

`/api/users/:id`: Returns a document with the specified ID _Status Code: 200_. Returns with Status Code 404 if no document is found.

## POST

Note: This creates a new document in the database which can be fetched using the `GET` request.

`/api/users`: Adds a new document to the Database. Returns with Status Code 201 if the document is created. Returns with Status Code 400 if the proper format is not used or if the document with the same ID already exists.

### POST Format

```
{
  id: String,
  balance: Number // (Int32)
}
```
