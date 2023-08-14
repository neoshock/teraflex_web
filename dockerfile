# Etapa de compilación
FROM node:18 as builder

WORKDIR /app

# Copiar el archivo package.json y package-lock.json (o yarn.lock si usas Yarn)
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Compilar la aplicación de Angular en modo de producción
RUN npm run build --prod

# Etapa de producción
FROM nginx:alpine

# Copiar los archivos compilados de la etapa anterior a la carpeta de despliegue de Nginx
COPY --from=builder /app/dist/* /usr/share/nginx/html/

# Configuración opcional para cambiar el puerto de Nginx (por defecto es 80)
EXPOSE 4200

# Comando para iniciar Nginx y servir la aplicación
CMD ["nginx", "-g", "daemon off;"]
