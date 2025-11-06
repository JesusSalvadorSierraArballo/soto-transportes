🧠** Examen de Programación Frontend Avanzado**  
  
**Objetivo general**  
  
Desarrollar una **SPA (Single Page Application)** con **React + TypeScript + Redux Toolkit + PrimeReact**, que implemente:  
	1.	**Login** con manejo de token (autenticación JWT).  
	2.	**CRUD completo** (GET, POST, PUT, DELETE) sobre una entidad de ejemplo: **Publicaciones (Posts)**.  
	3.	**Tabla avanzada** con búsqueda, filtros, paginado y acciones.  
	4.	**Formulario** para crear y editar publicaciones.  
	5.	**Visualización de un PDF** dentro de la aplicación.  
	6.	**Gestión global del estado** mediante Redux Toolkit.  
	7.	Buenas prácticas de arquitectura, tipado y UX.  
  
⸻  
  
🧩** API pública sugerida**  
  
Usa **DummyJSON**: [https://dummyjson.com](https://dummyjson.com)  
Es ideal para pruebas, ya que soporta login y CRUD simulado.  
  
**Endpoints principales:**  
	•	**Login (POST)** /auth/login  
Body: { username: "kminchelle", password: "0lelplR" }  
→ Devuelve un token que usarás como autenticación.  
	•	**Perfil (GET)** /auth/me (requiere Authorization: Bearer <token>)  
	•	**Posts**  
	•	GET /posts?limit=10&skip=0  
	•	GET /posts/search?q=<texto>  
	•	POST /posts/add  
	•	PUT /posts/:id  
	•	DELETE /posts/:id  
	•	**Users**  
	•	GET /users?limit=100  
  
⸻  
  
⚙️** Requerimientos funcionales**  
  
**1. Autenticación**  
	•	Login con username/password.  
	•	Guardar el token en Redux y persistir en localStorage.  
	•	Proteger rutas: si no hay token, redirigir a /login.  
	•	Logout que limpia estado y almacenamiento.  
  
**2. Tabla de publicaciones**  
  
Usa **PrimeReact DataTable**:  
	•	Columnas: **ID**, **Título**, **Usuario**, **Tags**, **Reacciones**, **Acciones**.  
	•	Búsqueda global (globalFilter).  
	•	Filtros: por usuario (Dropdown) y por tags (MultiSelect).  
	•	Paginado (paginator, rows, onPage).  
	•	Acciones: **Ver**, **Editar**, **Eliminar**.  
	•	Manejo de carga, vacíos y errores.  
	•	Uso de Toolbar, Toast, ConfirmDialog para UX.  
  
**3. Formulario de publicación**  
  
Usa componentes de **PrimeReact**:  
	•	InputText, InputTextarea, Dropdown, Chips, Button.  
	•	Validaciones con react-hook-form o Formik.  
	•	**POST** /posts/add → crear publicación.  
	•	**PUT** /posts/:id → editar publicación.  
	•	Mensajes de éxito/error con Toast.  
	•	**Optimistic UI** opcional (bonus).  
	•	**Optimistic UI** opcional (bonus).  
  
**4. Visualización de PDF**  
	•	Ruta /docs o sección “Ayuda”.  
	•	Usa react-pdf o @react-pdf-viewer/core para renderizar el documento.  
	•	Debe permitir:  
	•	**Ver el PDF** (local o remoto).  
	•	**Navegar entre páginas**.  
	•	**Zoom in/out**.  
	•	**Descargar el archivo**.  
	•	Controles implementados con botones de **PrimeReact** (Button, InputText).  
  
**5. Estado global**  
	•	Redux Toolkit con slices:  
	•	auth (login, token, logout)  
	•	posts (CRUD)  
	•	users (listado de usuarios)  
	•	ui (toasts, loading, errores)  
	•	createAsyncThunk o **RTK Query** para llamados API.  
  
**6. Calidad de código**  
	•	**TypeScript estricto**.  
	•	**React Router** para navegación.  
	•	**Eslint + Prettier**.  
	•	**Accesibilidad básica**: labels, focus visible, mensajes claros.  
	•	**Testing**: al menos 3 tests (reducers, login, fetch posts).  
  
⸻  
  
🧱** Stack técnico**  
  
**Herramienta**	**Uso principal**  
**React + TS**	Base de la aplicación  
**Vite**	Build rápido y moderno  
**Redux Toolkit**	Estado global  
**React Router DOM**	Rutas públicas y privadas  
**PrimeReact + PrimeFlex + PrimeIcons**	Componentes UI  
**Axios / fetch**	Requests HTTP  
**react-pdf**	Renderizado de PDF  
**ESLint + Prettier**	Calidad de código  
  
**Estilos**  
  
Importar en main.tsx:  
  
```
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

```
  
  
⸻  
  
🧭** Historias de usuario**  
	1.	**Login:** el usuario puede autenticarse y acceder al panel de publicaciones.  
	2.	**Listar:** puede ver una tabla de publicaciones paginadas y filtrarlas.  
	3.	**Buscar:** puede buscar publicaciones por texto, usuario o tags.  
	4.	**CRUD:** puede crear, editar y eliminar publicaciones.  
	5.	**PDF:** puede abrir y leer un documento PDF con zoom y navegación.  
	6.	**Logout:** puede cerrar sesión limpiamente.  
  
⸻  
  
✅** Criterios de aceptación**  
	•	No se puede acceder a rutas privadas sin token.  
	•	El token se almacena y usa en llamadas API.  
	•	El DataTable muestra correctamente los filtros, búsqueda y paginación.  
	•	Los formularios validan correctamente los campos.  
	•	Se puede visualizar y descargar el PDF.  
	•	Los errores y acciones muestran Toast o ConfirmDialog.  
  
⸻  
  
🧮** Rúbrica de evaluación (100 pts)**  
  
**Criterio**	**Puntos**  
Arquitectura y calidad de código			20  
Redux (estructura, thunks, estado)			15  
Autenticación y persistencia				15  
Tabla avanzada (PrimeReact)				15  
Formulario con validaciones (PrimeReact)	10  
Visualización de PDF funcional				10  
UX y accesibilidad (toasts, diálogos)			5  
Pruebas unitarias / integración				5  
Bonus (optimistic UI, RTK Query, E2E)		+5  
  
  
⸻  
  
🧪** Casos de prueba sugeridos**  
	1.	**Login correcto** → guarda token y redirige.  
	2.	**Login inválido** → muestra error sin guardar token.  
	3.	**GET /posts** → carga inicial con paginado correcto.  
	4.	**POST /posts/add** → crea un post y actualiza la tabla.  
	5.	**PUT /posts/:id** → edita correctamente un registro.  
	6.	**DELETE /posts/:id** → elimina y muestra confirmación.  
	7.	**PDF** → carga, navega entre páginas y permite zoom.  
  
⸻  
  
🌟** Extras (bonus)**  
	•	RTK Query para manejo de datos.  
	•	Skeletons de carga.  
	•	Persistencia del estado global.  
	•	Dockerfile + docker-compose.  
	•	Deploy (Vercel / Netlify).  
  
⸻  
  
📦** Entregables**  
	•	Repositorio con:  
	•	Código fuente completo.  
	•	README.md con instrucciones, dependencias y comandos.  
	•	Capturas o GIFs del flujo principal.  
	•	Scripts:  
	•	dev → desarrollo.  
	•	build → producción.  
	•	test → ejecutar tests.  
  
⸻  
  
🧰** Pistas útiles**  
	•	Usuario de prueba:  
  
{ "username": "kminchelle", "password": "0lelplR" }  
  
  
	•	Parámetros de paginación:  
  
```
limit = 10

```
skip = (page - 1) * limit  
  
  
	•	Búsqueda: /posts/search?q=<texto>  
	•	Filtros: /users/:id/posts o tags dentro de /posts.  
  
⸻  
