# technical-test-2024-2

# **Documentación de la Aplicación de Gestión de Actividades**

## **Descripción General**

Esta aplicación de gestión de actividades permite a los usuarios crear y gestionar actividades realizadas por auxiliares. La aplicación está desarrollada con **React** para la interfaz de usuario y **Tailwind CSS** para el diseño y estilo. La aplicación ofrece funcionalidades clave, como la creación de actividades, la obtención de actividades mediante varios filtros y la actualización del estado de una actividad.

## **Funcionalidades Principales**

### **1. Crear una Actividad**

Los usuarios pueden crear una nueva actividad proporcionando la siguiente información:

- **Identificador único**: Un campo que genera automáticamente un ID único para cada actividad.
- **Nombre del auxiliar**: El nombre del auxiliar que realizó la actividad.
- **Número de documento del auxiliar**: El número de documento (por ejemplo, cédula) del auxiliar.
- **Fecha y hora de inicio**: La fecha y hora en la que comenzó la actividad.
- **Fecha y hora de finalización**: La fecha y hora en la que terminó la actividad.
- **Descripción**: Una breve descripción de la actividad realizada.
- **Estado**: El estado actual de la actividad, que puede ser "Aprobado", "Rechazado" o "En espera".


### **2. Obtener Actividades por Filtros**

La aplicación permite a los usuarios filtrar y obtener actividades basadas en diferentes criterios:

- **Todas las actividades**: Muestra todas las actividades registradas en el sistema.
- **Actividades de una fecha específica**: Filtra las actividades que comenzaron en una fecha específica.
- **Actividad por identificación**: Permite buscar una actividad específica utilizando su identificador único.
- **Actividades por número de documento del auxiliar**: Filtra las actividades según el número de documento del auxiliar que las realizó.

#### **Interfaz de Búsqueda**

La interfaz de usuario proporciona un cuadro de búsqueda y filtros desplegables para facilitar la selección de los criterios de filtrado. Tailwind CSS se utiliza para mantener la interfaz clara y fácil de usar, asegurando que los resultados sean presentados de manera organizada y accesible.

### **3. Marcar una Actividad como Aprobada o Rechazada**

Los usuarios pueden actualizar el estado de una actividad para marcarla como "Aprobada" o "Rechazada". Esta funcionalidad es clave para la gestión y seguimiento de las actividades realizadas.

#### **Actualización de Estado**

- El estado de la actividad se puede actualizar directamente desde la lista de actividades filtradas o desde la vista detallada de una actividad específica.
- Al seleccionar un nuevo estado, la aplicación realiza la actualización en tiempo real, reflejando inmediatamente los cambios en la interfaz de usuario.

### **4. Detalles Técnicos**

- **Framework**: React
- **Estilos**: Tailwind CSS
- **Estado de la Aplicación**: Se gestiona el estado de la aplicación utilizando `useState` y `useEffect` para manejar las interacciones y actualizaciones dinámicas de la UI.
- **Integración con Backend**: La aplicación interactúa con una API RESTful para realizar operaciones Create, Read, Update sobre las actividades.

### **5. Instalación y Configuración**

Para instalar y ejecutar la aplicación en tu entorno local:

1. **Clonar el repositorio:**
2. **Instalar dewpendencias**: npm install
3. **Ejecutar**: npm run dev o npm start