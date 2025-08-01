# Content Moderation as a Service (CMaaS)

A customizable API-based platform for moderating user-generated content using AI and custom rules.

## Vision

CMaaS is an intelligent, highly adaptable SaaS platform that empowers developers and businesses to enforce their unique community standards. The service provides a powerful API that uses a Retrieval-Augmented Generation (RAG) system, allowing users to define their content policies in natural language.

## Key Features

- Dynamic Moderation API - Moderate content based on your custom rules
- Developer Self-Service Portal - Manage accounts, API keys, and usage
- Custom Policy Engine - Define moderation policies in plain English
- Multi-Tenant Architecture - Secure isolation of each user's rules and data

## Architecture

CMaaS uses a microservices architecture combining .NET and Python components:

- **.NET API Gateway:** Central entry point that handles all incoming requests, validates API keys, enforces usage quotas, and routes traffic
- **Python RAG Microservice:** The AI engine that processes moderation requests by retrieving user-specific rules and consulting external LLMs
- **Vector Database:** Stores embeddings of user-defined rules for fast and relevant retrieval
- **Relational Database:** Stores user accounts, API keys, subscription plans, and usage logs
- **Frontend User Portal:** Web interface for account management and rule configuration

## Workflows

### Rule Management

1. Users define their content moderation policies in natural language through the web portal
2. The system converts these rules into vector embeddings
3. Embeddings are stored in the vector database linked to the user's ID

### Moderation Request

1. Client sends content to be moderated via the API
2. System identifies the user from their API key
3. Relevant rules are retrieved from the vector database
4. Content and rules are sent to an LLM (via OpenAI API) for judgment
5. API returns a structured response indicating if content violates any rules

## Technology Stack

### Backend

- API Gateway: [ASP.NET](http://ASP.NET) Core
- AI & Orchestration: Python, Flask, OpenAI API Client
- Databases: PostgreSQL (AWS RDS), Pinecone/Chroma (Vector DB)

### Frontend

- React Library

### DevOps

- Containerization: Docker
- Cloud: AWS (EC2/ECS)
- CI/CD: GitHub Actions
- Version Control: Git
- API Documentation: Swashbuckle.AspNetCore