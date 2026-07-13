# Harmonía - Gestor de Banda de Semana Santa

Harmonía es una aplicación web responsiva y moderna diseñada para la gestión integral de bandas de música procesionales (bandas de Cornetas y Tambores, Agrupaciones Musicales y Bandas de Música) de Semana Santa.

Esta versión inicial incluye el módulo completo de **Control de Asistencia (Pasar Lista)** con desglose por secciones de instrumentos.

## Características de la Aplicación

1. **Pasar Lista**:
   - Clasificación clara de los músicos por instrumentos (Dirección, Cornetas, Trompetas, Fliscornos, Trombones, Tubas, Tambores, Bombos, etc.).
   - Secciones colapsables para agilizar el proceso en pantallas pequeñas.
   - Marcado de **Presente** o **Ausente** en un solo toque.
   - En caso de **Ausencia**, posibilidad de definir si está **Justificada** y redactar el **Motivo** (con sugerencias de acceso rápido como Trabajo, Salud, Estudios o Viaje).
   - Selector de fecha para consultar o editar la asistencia de cualquier día histórico o futuro.
   - Buscador en tiempo real.
   - Marcado rápido global ("Todo Presente") de los elementos visibles.

2. **Gestión de Plantilla**:
   - Registro de nuevos integrantes detallando Nombre Completo, Instrumento/Sección y Voz/Rol (ej: "Director Musical", "Voz Principal", "Fila").
   - Modificación de datos y bajas de integrantes.

3. **Panel de Estadísticas (Analytics)**:
   - Ratio de asistencia general promedio de la banda.
   - Histórico de sesiones y ensayos evaluados.
   - Identificación de la sección con mejor rendimiento de asistencia.
   - Gráfico de barras interactivo con el porcentaje de asistencia por instrumento.
   - Listado y recuento de los motivos de ausencia más frecuentes.
   - Alertas automatizadas para integrantes con 3 o más faltas en el historial.

4. **Copias de Seguridad (Ajustes)**:
   - Exportación de la base de datos completa de músicos e historial en formato JSON.
   - Importación de copias previas para restaurar el estado.
   - Carga guiada de datos de prueba para explorar la funcionalidad.
   - Limpieza completa de datos de manera local.

## Diseño Visual

- **Paleta de Colores**: Inspirada en la sobriedad y solemnidad de la Semana Santa. Nazareno (morado imperial), Oro (acentos y decorados) y fondos oscuros elegantes por defecto.
- **Modo Claro / Modo Oscuro**: Interruptor de tema integrado en el menú lateral.
- **Glassmorphism**: Efectos traslúcidos fluidos con desenfoque de fondo.
- **Diseño Responsivo**: Adaptado tanto a teléfonos móviles (para pasar lista a pie de ensayo) como a ordenadores de escritorio.

## Cómo Ejecutar la Aplicación Localmente

Dado que es una Single Page Application construida puramente con tecnologías web estándar (HTML5, CSS3, JavaScript):

1. **Directamente**: Puedes abrir el archivo `index.html` en cualquier navegador moderno.
2. **Servidor Local**: Si deseas servirlo localmente mediante Node/npm o Python:
   - Con Python: `python -m http.server 8000` y visita `http://localhost:8000`.
   - Con VS Code: Haz clic derecho en `index.html` y selecciona **Live Server** (si dispones de esa extensión).

*Nota: La aplicación utiliza `localStorage` del navegador para almacenar los músicos y la asistencia, por lo que tus cambios persistirán entre recargas del navegador.*
