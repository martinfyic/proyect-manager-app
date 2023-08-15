# ⚡ Proyect Manager App - Next Js

Para correr localmente se necesita la base de datos

- Reconstruir modulos de node:

```bash
# con yarn
yarn install

# con npm
npm install
```

- Conexion con base de datos mediante docker:

```bash
docker-compose up -d
```

_El -d significa **detached**_

_En el caso de que mongocompas no encuentre la base de datos debes correr el siguiente comando:_

```bash
net stop MongoDB
```

_Esto frena el servidor de mongo en el caso de que lo tengas correindo en tu pc, asi podras utilizarlo desde docker_

## Configurar variables de entorno

Renombrar el archivo [.env.example](.env.example) a `.env`

Ejemplo:

`MONGO_URL_DEV=`mongodb://localhost:27017/entries-database

## Llenar la base de datos con informacion de prueba

Se debe tener la app corriendo

```
yarn dev

# or

npm run dev
```

- Enpoint[GET]: `http://localhost:3000/api/seed`

**mock data:**

```typescript
entries: [
		{
			description:
				'Voluptate commodo labore excepteur ut aliqua pariatur minim do in nisi ad velit elit mollit.',
			createdAt: Date.now(),
			status: 'pending',
		},
		{
			description:
				'Sunt aute voluptate pariatur ex in mollit laboris in adipisicing magna dolore excepteur laboris.',
			createdAt: Date.now() - 1000000,
			status: 'inProgress',
		},
		{
			description: 'Excepteur nulla et eiusmod ex ipsum eu.',
			createdAt: Date.now() - 1100000,
			status: 'finished',
		},
	],
```
