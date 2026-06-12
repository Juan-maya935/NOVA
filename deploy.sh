#!/usr/bin/env bash

# Abortar el script si ocurre algún error en la compilación
set -e

echo "🤖 [SISTEMA] Iniciando compilación de producción para NOVA..."
npm run build

# Navegar al directorio de salida generado por Vite
cd dist

# Inicializar repositorio local temporal para el despliegue
git init
git add -A
git commit -m 'deploy: producción NOVA - centro de control'

# Envío forzado de la carpeta compilada a la rama de hosting de GitHub
echo "📡 [TRANSMISIÓN] Subiendo assets a la rama gh-pages..."
git push -f https://github.com/Juan-maya935/NOVA.git master:gh-pages

cd -

echo "🔒 [LOG] ¡Señal establecida! Despliegue finalizado en https://Juan-maya935.github.io/NOVA/"