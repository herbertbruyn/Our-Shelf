<!-- markdownlint-disable -->
# Our-Shelf Project

---
## CS50 2020 - Introduction to Computer Science
##### _by Professor David Malan_

---
## Team
* _Herbert Alexander Santana de Bruyn_
* _Caio Moysés de Lima_

---
## Overview

`Our Shelf` is our final project for CS50 Introduction to Computer Science 2020. It is intended to be an interactive network for personal book collections. Each user creates his own collection, signing in with her Google Account. In the website, users can register their books by adding the following:
- _author's biography;_
- _publisher;_
- _cover photo;_
- _book's description;_
- _book's general info._
- _privacy status (public or private)_

Once the books are registered in the database, they are displayed online in the user's collection dashboard. Users may also browse other users' collections. However, only books marked as "public" will be displayed to others.

The app also allows users to retrieve book information from `Amazon.com`, so as to make it easier to register new books in the database.

---
## Main Features
* _Users CRUD (create, retrieve, update, delete), with Google sign in_
* _Books CRUD, with info retrieval from `Amazon.com`_
* _user interactive area containing:_
    * _dashboard_
    * _book collection display (grid view and list view options)_
    * _famous quotes carousel_
    * _charts with general collection stats_

Here are some screenshots of the app while running:

<div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-around;">

  <img width="900px" style="margin-top: 16px" src="https://github.com/cmlima/our-shelf/raw/master/static/screenshot1.png" alt="Screenshot 1" />
  <small>Screenshot 1. Initial screen. Option to sign-in with Google. Anonymous user has access to famous quotes.</small>

  <img width="900px" style="margin-top: 16px" src="https://github.com/cmlima/our-shelf/raw/master/static/screenshot2.png" alt="Screenshot 2" />
  <small>Screenshot 2. Collection view screen. Charts with general stats.</small>

  <img width="900px" style="margin-top: 16px" src="https://github.com/cmlima/our-shelf/raw/master/static/screenshot3.png" alt="Screenshot 3" />
  <small>Screenshot 3. Collection view screen. Grid view.</small>

  <img width="900px" style="margin-top: 16px" src="https://github.com/cmlima/our-shelf/raw/master/static/screenshot4.png" alt="Screenshot 4" />
  <small>Screenshot 3. Collection view screen. List view.</small>

</div>

---
## Current Scope

Initially, `Our Shelf Project` was thought as a social network for book lovers, who would share online their passion and ideas about books and culture in general. The plan was to enable even the exchange of books themselves (physically) through the social network.

Our dream is still that `Our Shelf` will one day become a huge hub for literature lovers in which users will be able to collaborate and form a huge public shared library. However, due to the present time restrictions (deadline comming very soon), the current scope is obviously much narrower and comprises only the features described above.

---
## Technical Considerations

#### Language and Frameworks

The project was developed using Javascript on both server and client-side. We took advantage of existing frameworks in order to speed up development and asure that the whole architecture had a minimum quality.

In particular, we used `Nuxt`, which is a SSR (server-side-rendering) framework built on top of `Vue`. 

`Nuxt` comes with `express`, a `NodeJS` server, which allowed us to create a REST API to connect our app with a `MongoDB` instance hosted in `MongoDB Atlas` via `Mongoose`.

#### Helper Libraries

`Amazon.com` book info retrieval was possible thanks to `puppeteer`.

We also used, along with other libraries, `Moment`, `Chart.js` and `Axios`.

#### REST API

Our REST API has the following design:

Method    | Route                     | Resources
--------- | ------------------------- | -------------
`POST`    | `/api/users`              | sign-in or sign-up with `Google Account` profile
`GET`     | `/api/users`              | retrieve all users
`PUT`     | `/api/users/:id`          | update current user
`DELETE`  | `/api/users/:id`          | delete current user
`POST`    | `/api/authors`            | create author
`GET`     | `/api/authors`            | retrieve all authors matching query params
`GET`     | `/api/authors/:id`        | retrieve one author
`PUT`     | `/api/authors/:id`        | update author
`DELETE`  | `/api/authors/:id`        | delete author
`POST`    | `/api/publishers`         | create publisher
`GET`     | `/api/publishers`         | retrieve all publishers matching query params
`GET`     | `/api/publishers/:id`     | retrieve one publisher
`PUT`     | `/api/publishers/:id`     | update publisher
`DELETE`  | `/api/publishers/:id`     | delete publisher
`POST`    | `/api/books`              | create book
`GET`     | `/api/books`              | retrieve all books matching query params
`GET`     | `/api/books/:id`          | retrieve one book
`PUT`     | `/api/books/:id`     | update book
`DELETE`  | `/api/books/:id`     | delete book
`GET`     | `/api/search/:isbn`  | retrieve book info from `Amazon.com` 


#### JWT Tokens

Authentication and authorization are assured for every route (except sign-in / sign-up route) through the implementation of JWT tokens.

A JWT token is generated each time a user signs in. The token is returned to the client, where it is kept stored in cookies, in memory and in the Local Storage.

In every requesto to the server, the token is sent in the headers, in a custom property named "x-token".

A server middleware than decodes the token and cheks if the requester is duly authorized.

What makes this system secured is that JWT tokens can only be decoded with the use of a secret, which is shared between client and server, but never exchanged in requests (the secret is kept in environment variables only).

#### Build Setup

In order to setup the project for development, after the repository is cloned locally, it is simply a matter of installing dependencies and starting the server in development mode, as follows:

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).


#### Reference

Links to the most relevant libraries used in the project are found below:

<div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-around;">

  <a href="https://nuxtjs.org/" target="_blank" style="margin: 32px;">
    <img width="200px" src="https://miro.medium.com/max/798/1*i8-he4qWFllqM2lNArl1UA.png" alt="Nuxt Logo" />
  </a>

  <a href="https://vuejs.org/" target="_blank" style="margin: 32px;">
    <img width="150px" src="https://www.sbaum.com.br/src/img/tecnologias/vuejs.png" alt="Vue Logo" />
  </a>

  <a href="https://expressjs.com/pt-br/" target="_blank" style="margin: 32px;">
    <img width="200px" src="https://miro.medium.com/max/6668/1*XP-mZOrIqX7OsFInN2ngRQ.png" alt="ExpressJS Logo" />
  </a>

  <a href="https://pptr.dev/" target="_blank" style="margin: 32px;">
    <img width="60px" src="https://pptr.dev/images/pptr.png" alt="Puppeteer Logo" />
  </a>

  <a href="https://momentjs.com/" target="_blank" style="margin: 32px;">
    <img width="120px" src="https://miro.medium.com/max/918/1*s_yRzdt5-339dfl5r_AasQ.png" alt="MomentJS Logo" />
  </a>

  <a href="https://www.chartjs.org/" target="_blank" style="margin: 32px;">
    <img width="100px" src="https://www.chartjs.org/media/logo-title.svg" alt="ChartJS Logo" />
  </a>

  <a href="https://www.mongodb.com/" target="_blank" style="margin: 16px;">
    <img width="200px" src="https://nakedsecurity.sophos.com/wp-content/uploads/sites/2/2017/01/mongodb.png?w=775" alt="MongoDB Logo" />
  </a>

  <a href="https://mongoosejs.com/" target="_blank" style="margin: 16px;">
    <img width="150px" src="https://i2.wp.com/easyontheweb.com/wp-content/uploads/2019/09/20160620102203_885_o1fgwu.jpg?fit=639%2C178&ssl=1" alt="Mongoose Logo" />
  </a>

</div>

#### Repository

Source code may be found at [GitHub](https://github.com/herbertbruyn/Our-Shelf).




