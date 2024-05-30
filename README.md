# Eco City Guide

This application gonna save all dolphins

## Development

Run app in watch mode:

```bash
make run
```

In parallel, follow log output with:

```bash
make logs
```

Also, launch tailwind watch :

```bash
make tailwind
```

### Run tests

Run Backend tests in watch mode:

```bash
make backend test-watch
```

### Setting web-app types after GraphQL

Generate query-specific types for web-app development:

```bash
make graphql-codegen
```

These types can then be used in Apollo queries and mutations.

### Insert Dynamical data into Database

```bash
make insert-mocks
```
