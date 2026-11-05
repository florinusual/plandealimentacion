# Plan de alimentación · Recetario

App para llevar el plan de recomposición corporal basado en equivalentes. Es una app web instalable (PWA), con el mismo estilo del Diario de Lectura: se agrega a la pantalla de inicio y funciona sin conexión.

## Qué incluye

- **Hoy:** eliges la receta de cada tiempo de comida (Desayuno 9:00, Colación 1 12:00, Comida 15:30, Colación 2 18:00, Cena 21:00), la marcas como hecha y ves las porciones del día cubiertas contra tu tabla de equivalentes.
- **Recetas:** las 25 recetas con ingredientes y preparación. En cada ingrediente, **Cambiar** muestra los alimentos del mismo grupo con la cantidad equivalente. También puedes crear y editar recetas; la app te dice si cuadran con las porciones de ese tiempo de comida.
- **Semana:** eliges un rango de días (por ejemplo, de miércoles a sábado) y la receta de cada comida. “Esta semana” abarca de lunes a domingo; los días que ya pasaron sin nada registrado aparecen como “Sin registros”. Con “Omitir día” marcas los días en que no seguirás el plan (comiste fuera, oficina, salida): no cuentan para compras ni para el apego, y no rompen la racha.
- **Compras:** suma todo lo que piden las recetas del plan, con los cambios de ingrediente de cada día, agrupado por grupo de alimento. Se puede palomear y compartir.
- **Tablas de equivalentes:** la tabla original es la de **Recomposición**. Se pueden agregar tablas de **Déficit calórico** o **Volumen** y elegir cuál está vigente desde hoy (los días anteriores conservan la suya). Las recetas ajustan solas sus porciones a la tabla vigente; si a una receta le falta un grupo que pide la tabla, se avisa y se puede ajustar a mano solo para esa tabla.
- **Progreso:** racha, apego semanal y de 30 días, y registro de peso y medidas.

## Archivos

- `index.html`: la app completa.
- `datos.js`: los 277 alimentos equivalentes y las 25 recetas originales.
- `manifest.webmanifest`, `icons/` y `sw.js`: instalación y uso sin conexión.

## Datos y respaldo

Los datos se guardan en el teléfono y, si inicias sesión con Google (pestaña Progreso), se sincronizan en Firebase. Usa el mismo proyecto de Firebase que el Diario de Lectura, en colecciones propias (`users/<uid>/rx_recipes`, `rx_days`, `rx_body`, `rx_meta`), así que no se mezcla con los datos del diario. También hay **Descargar respaldo** y **Restaurar desde archivo**.

## Publicarla con GitHub Pages

En GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, rama `main`, carpeta `/ (root)`. En un par de minutos queda en `https://florinusual.github.io/plandealimentacion/`.

## Probarla en local

```sh
python3 -m http.server 8000
```

Luego abre `http://localhost:8000`.
