# Eco City Guide

## Development

Run app in watch mode:

```
docker compose build && docker compose watch
<!-- npx tailwindcss -i ./src/styles/input.css -o ./src/styles/output.css --watch -->
```

In parallel, follow log output with:

```
docker compose logs -f
```

### Setting web-app types after GraphQL

Generate query-specific types for web-app development:

```
cd web-app
npm run graphql-codegen
```

These types can then be used in Apollo queries and mutations.
