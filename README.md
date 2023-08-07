# ⚡ Proyect Manager App - Next Js

Para correr localmente se necesita la base de datos

```bash
docker-compose up -d
```

- El -d significa **detached**

MongoDB Url local `mongodb://localhost:27017/entries-database`

## Configurar variables de entorno

Renombrar el archivo [.env.example](.env.example) a `.env`

## Llenar la base de datos con informacion de prueba

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
