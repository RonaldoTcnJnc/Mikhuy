# Mikhuy

Mikhuy es una experiencia web tipo marketplace para descubrir y pedir comida local en Cusco. El proyecto presenta restaurantes, platos peruanos y negocios aliados mediante una interfaz responsive, clara y orientada a la compra.

Actualmente funciona como un prototipo frontend estatico. Las interacciones se ejecutan en el navegador y no existe un servidor, una base de datos ni un sistema real de pagos.

## Contenido

- [Caracteristicas](#caracteristicas)
- [Tecnologias](#tecnologias)
- [Estructura](#estructura-del-proyecto)
- [Puesta en marcha](#puesta-en-marcha)
- [Flujo de usuario](#flujo-de-usuario)
- [Datos e imagenes](#datos-e-imagenes)
- [Limitaciones actuales](#limitaciones-actuales)
- [Proximos pasos](#proximos-pasos)
- [Informe de laboratorio](#informe-de-laboratorio)

## Caracteristicas

### Catalogo de restaurantes

- Muestra seis negocios de ejemplo con categoria, puntuacion, tiempo estimado y plato destacado.
- Usa fotografias reales de platos peruanos.
- Permite ordenar por recomendacion, puntuacion o tiempo de entrega.

### Busqueda y filtros

- Busca por nombre del restaurante, categoria, descripcion o plato.
- Filtra por comida criolla, sabor andino, cafe y dulce, y opciones saludables.
- Muestra un estado vacio cuando no hay coincidencias.

### Favoritos

- Cada restaurante tiene un boton para guardar o quitar favoritos.
- El boton `Favoritos` del encabezado filtra el catalogo para mostrar solo los negocios guardados.
- El estado se mantiene mientras la pagina permanece abierta.

### Menu y carrito

- `Ver menu` abre un modal con los productos disponibles del restaurante.
- Los productos se agregan al carrito desde el modal.
- El carrito permite aumentar o disminuir cantidades.
- Calcula subtotal, tarifa de delivery y total.
- El boton `Continuar pedido` simula la confirmacion y limpia el carrito.

### Registro de aliados

- `Quiero ser aliado` abre un formulario para registrar el nombre del negocio, contacto y celular.
- La solicitud se valida en el navegador y muestra una confirmacion visual.

### Responsive

- La interfaz se adapta a escritorio y movil.
- El catalogo cambia de tres columnas a una columna en pantallas pequenas.
- El carrito y los modales ocupan el ancho disponible sin generar desplazamiento horizontal.

## Tecnologias

- HTML5 semantico.
- CSS3 sin frameworks, con variables, Grid, Flexbox, media queries y animaciones.
- JavaScript moderno sin dependencias externas.
- Wikimedia Commons para las fotografias del catalogo.
- Google Fonts para las familias tipograficas `DM Sans` y `Fraunces`.

## Estructura del proyecto

```text
Gestion_de_Pedidos/
|-- index.html       # Estructura de la pagina y componentes visuales
|-- styles.css       # Sistema visual y estilos responsive
|-- script.js        # Estado, catalogo y comportamiento interactivo
|-- README.md        # Documentacion del proyecto
```

## Puesta en marcha

### Requisitos

- Un navegador moderno: Chrome, Edge, Firefox o Safari.
- Conexion a internet para cargar las fotografias y fuentes externas.
- No se necesita Node.js ni instalar paquetes para ejecutar el prototipo.

### Ejecucion directa

1. Abre la carpeta del proyecto.
2. Abre `index.html` en el navegador.
3. Desplazate hasta el catalogo y prueba los filtros, la busqueda y el carrito.

### Servidor local opcional

Tambien se puede servir la carpeta con cualquier servidor estatico. Por ejemplo, si tienes Python instalado:

```bash
python -m http.server 8000
```

Luego visita `http://localhost:8000`.

## Flujo de usuario

1. El usuario llega al hero y busca un plato o restaurante.
2. Mikhuy desplaza la vista hacia el catalogo y muestra los resultados.
3. El usuario filtra o ordena los restaurantes disponibles.
4. Abre el menu de un restaurante con `Ver menu`.
5. Agrega un plato y revisa el carrito.
6. Ajusta cantidades y confirma el pedido.
7. Para un negocio, el usuario puede abrir el formulario de aliados y enviar sus datos.

## Datos e imagenes

El catalogo esta definido directamente en `script.js`, dentro del arreglo `restaurants`. Cada registro contiene:

- Identificador y nombre del restaurante.
- Categoria, descripcion, puntuacion y tiempo estimado.
- URL de la imagen del plato destacado.
- Nombre y precio del producto que se puede agregar al carrito.

Las fotografias utilizan URLs de Wikimedia Commons mediante `Special:FilePath`. Si una imagen deja de estar disponible, reemplaza el valor `image` del restaurante por otra URL publica y valida que incluya texto alternativo en la tarjeta.

## Limitaciones actuales

Este prototipo todavia no incluye:

- Registro y autenticacion de usuarios.
- Persistencia de favoritos o carrito despues de cerrar la pagina.
- Backend o API para restaurantes, productos y pedidos.
- Pagos reales.
- Geolocalizacion y calculo real de delivery.
- Notificaciones para cliente, restaurante o repartidor.
- Validacion de disponibilidad en tiempo real.

Los pedidos, favoritos y formularios son simulaciones locales en memoria del navegador.

## Proximos pasos

Para convertir el prototipo en un producto funcional se recomienda:

1. Crear una API para usuarios, restaurantes, productos y pedidos.
2. Agregar una base de datos con roles para cliente, restaurante y administrador.
3. Persistir el carrito y favoritos por usuario.
4. Integrar un proveedor de pagos y confirmar pedidos desde el backend.
5. Crear un panel para que los restaurantes gestionen menu, horarios y pedidos.
6. Incorporar geolocalizacion, zonas de reparto y estados del pedido.
7. Descargar o alojar las imagenes en un almacenamiento propio para tener mayor control.

## Estado del proyecto

Prototipo frontend interactivo listo para demostracion y validacion de experiencia de usuario.

## Informe de laboratorio

### 1. Objetivo

Configurar un entorno de desarrollo y aplicar control de versiones utilizando Git en un proyecto web basico. El trabajo incluyo la creacion de un repositorio local, el registro de cambios mediante commits y la publicacion del proyecto en un repositorio remoto de GitHub.

### 2. Resultados de aprendizaje

Al finalizar la actividad se logro:

- Comprender el uso de Git como herramienta de control de versiones.
- Configurar herramientas de desarrollo para iniciar un proyecto web.
- Crear y gestionar un repositorio local.
- Registrar cambios mediante commits.
- Conectar el repositorio local con GitHub.
- Publicar la rama principal en un repositorio remoto.

### 3. Fundamento teorico

El control de versiones permite administrar los cambios realizados en el codigo fuente a lo largo del tiempo. Git registra cada version mediante commits, los cuales contienen el autor, la fecha y una descripcion del cambio.

Git funciona de manera distribuida: cada desarrollador conserva una copia completa del historial en su equipo local. Este repositorio local puede conectarse con un repositorio remoto, como GitHub, para compartir el trabajo, mantener un respaldo y facilitar la colaboracion.

Entre sus principales beneficios se encuentran:

- Trazabilidad de los cambios.
- Recuperacion de versiones anteriores.
- Trabajo colaborativo mediante ramas y merges.
- Respaldo del codigo en un repositorio remoto.
- Identificacion del responsable de cada modificacion.

### 4. Herramientas utilizadas

- Visual Studio Code para editar el proyecto.
- Git para Windows ejecutado desde PowerShell o la linea de comandos.
- GitHub como repositorio remoto.
- Navegador web para comprobar la interfaz de Mikhuy.

### 5. Caso practico

Una startup de Cusco desea desarrollar un sistema web para gestionar pedidos de comida local. El proyecto trabajado se denomina `Gestion_de_Pedidos` y corresponde a la interfaz inicial de **Mikhuy**, una plataforma para descubrir restaurantes y solicitar platos de negocios locales.

La carpeta de trabajo se ubico en:

```text
C:\Users\USER\Documents\Gestion_de_Pedidos
```

### 6. Actividades desarrolladas

#### Parte 1: Configuracion de Git

Se configuro la identidad global del autor para asociar los commits con el estudiante:

```powershell
git config --global user.name "Ronal"
git config --global user.email "211816@unsaac.edu.pe"
```

Esta configuracion permite que Git registre correctamente el autor de cada cambio y facilita la trazabilidad del historial.

#### Parte 2: Ubicacion e inicializacion del proyecto

Se ingreso a la carpeta del proyecto y se inicializo el repositorio local:

```powershell
cd C:\Users\USER\Documents\Gestion_de_Pedidos
git init
```

El comando `git init` creo el directorio oculto `.git`, donde Git almacena el historial, la configuracion y la informacion del repositorio.

#### Parte 3: Primer registro de cambios

Se agregaron los archivos al area de preparacion y se creo el commit inicial:

```powershell
git add .
git commit -m "Primer commit"
```

El primer commit registrado fue:

```text
7d049ca Primer commit
```

Este commit incorporo el archivo inicial `README.md` al historial del proyecto.

#### Parte 4: Desarrollo de la primera version

Despues se creo la primera version de la landing page de Mikhuy y se registro un nuevo commit:

```powershell
git add .
git commit -m "Primera version de la Landingpage"
```

El segundo commit registrado fue:

```text
8b5d20d Primera version de la Landingpage
```

La primera version incluyo la estructura HTML, estilos CSS y la identidad visual inicial del proyecto.

#### Parte 5: Revision del historial

Se consulto el historial para verificar los cambios realizados:

```powershell
git log --oneline
```

El historial inicial mostro dos commits:

```text
8b5d20d Primera version de la Landingpage
7d049ca Primer commit
```

El historial permitio comprobar el orden de los cambios y la evolucion del proyecto desde el archivo inicial hasta la primera version visual.

#### Parte 6: Conexion con GitHub

Se creo el repositorio remoto `Mikhuy` en GitHub y se agrego como remoto con el nombre `origin`:

```powershell
git remote add origin https://github.com/RonaldoTcnJnc/Mikhuy.git
```

La URL del repositorio remoto es:

<https://github.com/RonaldoTcnJnc/Mikhuy>

#### Parte 7: Publicacion de la rama principal

Inicialmente Git creo la rama local con el nombre `master`. Al intentar publicar `main`, Git mostro el error `src refspec main does not match any` porque esa rama todavia no existia localmente.

Para resolverlo, se renombro la rama local y se publico en GitHub:

```powershell
git branch -M main
git push -u origin main
```

El comando `-u` establecio el seguimiento entre `main` y `origin/main`, por lo que las siguientes publicaciones pueden realizarse con:

```powershell
git push
```

La publicacion final confirmo que el repositorio local y el repositorio remoto quedaron conectados correctamente.

### 7. Entregable

El laboratorio genero los siguientes entregables:

- Repositorio local Git dentro de `Gestion_de_Pedidos`.
- Repositorio remoto publicado en GitHub: <https://github.com/RonaldoTcnJnc/Mikhuy>
- Historial de commits con el commit inicial y la primera version de la landing page.
- Rama principal `main` enlazada con `origin/main`.
- Archivo README documentado dentro del repositorio.
- Evidencias de los comandos `git config`, `git init`, `git add`, `git commit`, `git log`, `git remote` y `git push`.

### 8. Reflexion

#### Por que Git es importante en proyectos colaborativos

Git permite que varias personas trabajen sobre el mismo proyecto sin sobrescribir silenciosamente los cambios de los demas. Cada integrante puede trabajar en su copia local, registrar avances en commits y compartirlos mediante un repositorio remoto.

Ademas, el historial permite conocer quien realizo cada cambio, cuando se realizo y cual era su objetivo. En este laboratorio, `git log` permitio verificar la evolucion desde el commit inicial hasta la primera version de la landing page.

#### Problemas que Git ayuda a evitar

- **Perdida de codigo:** los commits permiten recuperar versiones anteriores.
- **Sobrescritura de trabajo:** las ramas y las fusiones ayudan a integrar cambios de forma controlada.
- **Falta de trazabilidad:** cada commit conserva autor, fecha y mensaje.
- **Dependencia de una sola computadora:** GitHub mantiene una copia remota del proyecto.
- **Conflictos no controlados:** Git identifica los conflictos para que puedan resolverse de forma explicita.

### 9. Conclusion

El laboratorio permitio configurar Git, iniciar un repositorio local, registrar la evolucion de Mikhuy mediante commits y publicar el proyecto en GitHub. Como resultado, el equipo cuenta con una base organizada para continuar el desarrollo del sistema de pedidos y agregar posteriormente un backend, una base de datos y autenticacion.
