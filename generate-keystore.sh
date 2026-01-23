#!/bin/bash

# Configuration
KEYSTORE_NAME="my-release-key.jks"
ALIAS_NAME="uv40-alias"
VALIDITY_DAYS=10000

echo "Generando keystore para despliegue en Android..."
echo "Te preguntará por una contraseña y datos de la organización."
echo "IMPORTANTE: Guarda la contraseña y el archivo $KEYSTORE_NAME en un lugar seguro."

keytool -genkey -v -keystore $KEYSTORE_NAME -alias $ALIAS_NAME -keyalg RSA -keysize 2048 -validity $VALIDITY_DAYS

echo ""
echo "Keystore generado exitosamente:"
echo " - Archivo: $KEYSTORE_NAME"
echo " - Alias: $ALIAS_NAME"
echo ""
echo "Ahora actualiza el archivo 'android/keystore.properties' con los datos:"
echo ""
echo "storeFile=../$KEYSTORE_NAME"
echo "keyAlias=$ALIAS_NAME"
echo "storePassword=TU_CONTRASEÑA"
echo "keyPassword=TU_CONTRASEÑA"
