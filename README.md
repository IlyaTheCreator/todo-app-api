<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://sun1-96.userapi.com/impf/JK0QgUrFSEq9gULTdC4k5Pf5dNXm0GlTw9u_OQ/3dXYOf1sxq4.jpg?size=291x289&quality=96&sign=6482fe1c37ee092ff90a9fe616e2b5e9&type=album" alt="Project logo"></a>
</p>

<h1 align="center">Yandex Test Todo API</h1>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()

</div>

<p align="center">
    A simple API for a todo application.
</p>

## 📝 Table of Contents

- [About](#about)
- [Docs](#docs)
- [Getting Started](#getting_started)
- [Available NPM commands](#commands)
- [Usage](#usage)
- [Version 2.0.0 changes](#changes)
- [Built Using](#built_using)
- [Authors](#authors)

<br>

## 🧐 About <a name = "about"></a>

The purpose of this project is pretty obscure but out team is all in.
<br>
<br>

## 🧾 Docs <a name = "docs"></a>

You can view the documentation for this project at <em>/api-docs</em> route 
(e.g. http://localhost:8080/api-docs | after running the scripts below)
<br>
<br>

## 🏁 Getting Started <a name = "getting_started"></a>

### Prerequisites

You need to install <a href="https://nodejs.org/en/">nodejs</a> and npm before using the API.
<br>
Then:

Clone the repo:

```
git clone https://gitlab.mmtr.ru/alobovskiy/yandex-test-todo.git
```

CD into the project directory:

```
cd yandex-test-todo
```

Install all dependencies:

```
npm install
```

Run local development server:

```
npm start
```

<br>

## 🔧 Available NPM commands <a name = "commands"></a>
Run local development server

```
npm run start
```

Fill the database with mock data

```
npm run smallInsert
```

Fill the database with more mock data

```
npm run bigInsert
```

Clear the database

```
npm run clear
```

<br>

## 🎈 Usage <a name="usage"></a>

For available routes check <em><strong>/api-docs</strong></em> page where docs for the API are held.

<br>

## ❕ Version 2.0.0 changes <a name="changes"></a>

Later all responses contained one <em><strong>data</strong></em> property. Now we omit it 
and pass all the data directly in response body (check the docs bruh).

<br>

## ⛏️ Built Using <a name = "built_using"></a>

- [SQLite](https://sqlite.org/) - Database
- [Sequelize](https://sequelize.org/) - ORM
- [Express](https://expressjs.com/) - Server Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment

<br>

## ✍️ Authors <a name = "authors"></a>

- [@alobovskiy](https://gitlab.mmtr.ru/alobovskiy) - Superior front-end developer
- [@abiryulin](https://gitlab.mmtr.ru/abiryulin) - Superior front-end developer
- [@iklimov](https://gitlab.mmtr.ru/iklimov) - Superior front-end developer
- [@mnepritimov](https://gitlab.mmtr.ru/mnepritimov) - Supervisor
- [@atupikova](https://gitlab.mmtr.ru/atupikova) - Supervisor

See also the list of [contributors](https://gitlab.mmtr.ru/alobovskiy/yandex-test-todo/-/project_members) who participated in this project.