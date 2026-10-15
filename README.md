comando para instalar OMR prisma

npm install prisma@7 --save-dev
 
 instalart cliente de prisma
npm install @prisma/client@7 --save-dev

instalar el adaptador para postgres
npm install -D @prisma/adapter-pg@7

Libreria para tsx y poder seguir escribiendo archivos js con
la forma de importacion commojs
npm install -d prisma@7 tsx

Tenemos todas las heramientas 
inicializar prima con un proveedor
npx prisma init --datasource-provider postgresql

crear las tablas y generar el cliente
npx prisma migrate dev --name inicio
