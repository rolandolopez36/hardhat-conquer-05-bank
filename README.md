# Conquer 05 Bank

## Descripción

Este proyecto es una implementación de contrato inteligente de un sistema bancario simple utilizando Solidity y Hardhat. El proyecto incluye scripts de despliegue, pruebas y configuraciones para interactuar con la blockchain de Ethereum.

## Requisitos

- Node.js
- Yarn
- Hardhat
- Chai

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/rolandolopez36/hardhat-conquer-05-bank.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd hardhat-conquer-05-bank
   ```

3. Instala las dependencias:

   ```bash
   yarn install
   ```

## Uso

### Compilar el Contrato

Para compilar el contrato inteligente, ejecuta:

```bash
yarn hardhat compile
```

### Desplegar el Contrato

Para desplegar el contrato en una red local, ejecuta:

```bash
yarn hardhat deploy
```

Para desplegar el contrato en la red Sepolia, asegúrate de que tu configuración de red en `hardhat.config.js` y `.env` esté correctamente configurada, luego ejecuta:

```bash
yarn hardhat deploy --network sepolia
```

### Ejecutar Pruebas

Para ejecutar las pruebas, ejecuta:

```bash
yarn test
```

## Configuración

El archivo `hardhat.config.js` contiene la configuración de Hardhat para el proyecto. Especifica redes, plugins y otros ajustes necesarios para la implementación y pruebas.

### Variables de Entorno

Crea un archivo `.env` en el directorio raíz basado en `.env.example` y llena las variables necesarias.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, sigue estos pasos para contribuir:

1. Haz un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza los cambios necesarios y haz commit (`git commit -am 'Agregar nueva funcionalidad'`).
4. Empuja los cambios a tu fork (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

### Consejos Adicionales

- **Mantén tu fork actualizado**: Asegúrate de que tu fork esté actualizado con el repositorio original para evitar conflictos.
- **Documenta tus cambios**: Actualiza la documentación y comentarios en el código si realizas cambios significativos.
- **Sigue los estándares de codificación**: Adhiérete a las convenciones y estilo de codificación del proyecto.

¡Gracias por contribuir!

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
