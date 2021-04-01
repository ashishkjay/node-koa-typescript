# Typescript-Koa-Template

This template aims to add in best practice and standards in term of code as well as team workflows.

This is built upon https://github.com/javieraviles/node-typescript-koa-rest
### How to get started locally
- Create a `.env` file from .example.env
- compose up to bring up database
Run these scripts from the root to start dev environment
```bash
yarn && yarn dev
```
### Things different from the inspiration include -> 
  - Update deprecated dependencies/images
  - Husky commit hooks 
  - Commit-linting standard convention
  - Pino logger -> [Performant](https://github.com/pinojs/pino/blob/master/docs/benchmarks.md) compared to Winston or other loggers

### Upcoming
  - Testing Suite
    - Integration testing 
    - Load Testing
      - [Vegeta](https://github.com/tsenart/vegeta) (Power level over 9000!)
  - Github Action workflows
### Known Issues
  - Swagger page has problems because of dependencies
