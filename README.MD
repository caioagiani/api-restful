<p align="center">
  <img width="115" height="100%" src="https://swellcom.com/content/wp-content/uploads/2017/09/api.png" alt="API RESTful"></a>
</p>

<h3 align="center">API RESTful - NoSQL MongoDB</h3>

<div align="center">
  
[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

## Apresentação:

Projeto BackEnd: API RESTful seguindo conceito **MVC** utilizando Stack **NodeJS**, padronizado o código com **Eslint** e **Prettier**.

Pacotes principais: **Express** responsável pela criação de rotas, Middleware **JWT** para persistência do token por 30minutos, mantendo a segurança e credêncial do usuário, ORM **Mongoose** para conexão com banco de dados NoSQL (**MongoDB**) e por fim, **Jest** para realização de tests.

Rotas mapeada do arquivo exportado Insominia: `Insomnia.json`

## Requisitos

#### Sign up

- [x] Este endpoint deverá receber um usuário com os seguintes campos: nome,
      email, senha e uma lista de objetos telefone.

```java
{
  "nome": "string",
  "email": "string",
  "senha": "senha",
  "telefones": [
    {
     "numero": "123456789",
     "ddd": "11"
    }
  ]
}
```

- [x] Usar status codes de acordo
- [x] Em caso de sucesso irá retornar um usuário mais os campos:

* **id**: id do usuário (pode ser o próprio gerado pelo banco, porém seria interessante
  se fosse um GUID
* **data_criacao**: data da criação do usuário
* **data_atualizacao**: data da última atualização do usuário
* **ultimo_login**: data do último login (no caso da criação, será a mesma que a
  criação)
* **token**: token de acesso da API (pode ser um GUID ou um JWT)

- [x] Caso o e-mail já exista, deverá retornar erro com a mensagem "E-mail já
      existente".
- [x] Token deverá ser persistido junto com o usuário

#### Sign in

- [x] Este endpoint irá receber um objeto com e-mail e senha.
- [x] Caso o e-mail exista e a senha seja a mesma que a senha persistida, retornar
      igual ao endpoint de `sign_up`.
- [x] Caso o e-mail não exista, retornar erro com status apropriado mais a mensagem
      "Usuário e/ou senha inválidos"
- [x] Caso o e-mail exista mas a senha não bata, retornar o status apropriado 401
      mais a mensagem "Usuário e/ou senha inválidos"

#### Buscar usuário

- [x] Chamadas para este endpoint devem conter um header na requisição de
      Authentication com o valor "Bearer {token}" onde {token} é o valor do token
      passado na criação ou sign in de um usuário.
- [x] Caso o token não exista, retornar erro com status apropriado com a mensagem
      "Não autorizado".
- [x] Caso o token exista, buscar o usuário pelo user_id passado no path e comparar
      se o token no modelo é igual ao token passado no header.
- [x] Caso não seja o mesmo token, retornar erro com status apropriado e mensagem
      "Não autorizado"
- [x] Caso seja o mesmo token, verificar se o último login foi a MENOS que 30
      minutos atrás.
- [x] Caso não seja a MENOS que 30 minutos atrás, retornar erro com status
      apropriado com mensagem "Sessão inválida".
- [x] Caso tudo esteja ok, retornar o usuário.

## Instação:

- Variável de ambiente `.env.example`:

```java
SECRET_JWT=XXX
MONGO_CONN=mongodb+srv://<user>:<pass>@cluster0-okpdn.gcp.mongodb.net/api
```

- Instalar dependências: `yarn install` ou `npm install`
- Iniciar aplicação em modo de desenvolvimento: `yarn dev:start` ou `npm run dev:start`.
- Deploy da aplicação: `yarn start`
- Tests Jest: `yarn test`

## Rotas

**POST** `localhost:3333/user/create`

```java
{
   "name": "Caio Agiani",
   "email": "caio.agiani14@gmail.com",
   "password": "123",
   "telefones": [
      {
	"numero": "999865802",
	"ddd": "11"
      },
      {
	"numero": "999865802",
	"ddd": "11"
      }
   ]
}
```

**POST** `localhost:3333/login`

```java
{
   "email": "caio.agiani14@gmail.com",
   "password": "123"
}
```

**GET** `localhost:3333/user/:user_id`

Observação importante: rota `/user/:user_id` é necessário passsar no **header** o parâmetro **authentication** contendo o Token Bearer coletado na rota `login`

## Test

```javascript
caio-agiani in api-restful on  master [!] took 2s ❯ yarn test
yarn run v1.22.5
$ jest --setupFiles dotenv/config --detectOpenHandles --forceExit
 PASS  tests/api.test.js
  Authentication
    ✓ should create session authentication (1233 ms)
  Login
    ✓ should create user session (131 ms)
  User
    ✓ should list user by id (9 ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        2.136 s
Ran all test suites.
Done in 2.58s.
```

## Contato

- [LinkedIn](https://www.linkedin.com/in/caioagiani/)
- caio.agiani14@gmail.com
