# 💰 Finanzas Personales

Aplicación web construida con **Node.js + TypeScript + Express + Prisma + MySQL + EJS** para gestionar tus **ingresos y gastos**.  
Incluye un formulario para registrar transacciones, listarlas y visualizar **gráficos interactivos** con **Chart.js**.

---

## 📌 Características

- Registrar **ingresos** y **egresos** con:
  - Tipo (ingreso/gasto)
  - Categoría (ej. comida, transporte, salario)
  - Monto
  - Descripción (opcional)
- Ver el listado de transacciones guardadas.
- Mostrar gráficos dinámicos:
  - **Gráfico de barras**: comparación de ingresos vs egresos.
  - **Gráfico circular (pie)**: distribución de categorías.
- Interfaz con **EJS + TailwindCSS + FontAwesome**.

---

## ⚙️ Dependencias

### Producción
- [express](https://www.npmjs.com/package/express) → Framework web.  
- [@prisma/client](https://www.npmjs.com/package/@prisma/client) → Cliente de Prisma para MySQL.  
- [ejs](https://www.npmjs.com/package/ejs) → Motor de plantillas para las vistas.  

### Desarrollo
- [typescript](https://www.npmjs.com/package/typescript) → Tipado estático.  
- [ts-node](https://www.npmjs.com/package/ts-node) → Ejecutar `.ts` sin compilar manualmente.  
- [nodemon](https://www.npmjs.com/package/nodemon) → Reinicia el servidor en cambios.  
- [prisma](https://www.npmjs.com/package/prisma) → CLI de Prisma (migraciones y generación).  
- [@types/node](https://www.npmjs.com/package/@types/node) → Tipos para Node.  
- [@types/express](https://www.npmjs.com/package/@types/express) → Tipos para Express.  

### Librerías vía CDN
- [TailwindCSS](https://tailwindcss.com) → Estilos modernos.  
- [Chart.js](https://www.chartjs.org/) → Gráficos dinámicos.  
- [FontAwesome](https://fontawesome.com) → Íconos.  

---
