# Visual English Platform Architecture

## Overview

The Visual English Platform is a comprehensive language learning application designed to deliver interactive English lessons through a visual approach. The platform serves both teachers and students with features for lesson consumption, assessment, and administrative management.

The application follows a modern web architecture with a React frontend, Node.js/Express backend, and PostgreSQL database. It incorporates real-time features via WebSockets and integrates with external services like AWS S3 for content storage and Stripe for payment processing.

## System Architecture

The Visual English platform follows a client-server architecture with the following key components:

1. **Frontend**: React-based single-page application (SPA) with TypeScript
2. **Backend**: Node.js with Express.js framework
3. **Database**: PostgreSQL with Drizzle ORM
4. **Storage**: AWS S3 for lesson materials, images, and resources
5. **Real-time Communication**: WebSocket server for live interactions
6. **Authentication**: Custom authentication system with session management
7. **Payment Processing**: Stripe integration for subscription and one-time payments

### Architecture Diagram

```
┌────────────────┐     ┌───────────────────────────────────────┐     ┌─────────────────┐
│                │     │                                       │     │                 │
│  React Client  │◄────┤  Express.js Server + WebSocket Server │◄────┤  PostgreSQL DB  │
│                │     │                                       │     │                 │
└────────┬───────┘     └─────────────────┬─────────────────────┘     └─────────────────┘
         │                               │                                     ▲
         │                               │                                     │
         │                               ▼                                     │
         │                    ┌────────────────────┐                           │
         │                    │                    │                           │
         └────────────────────►     AWS S3         │                           │
                              │                    │                           │
                              └────────────────────┘                           │
                                                                               │
                              ┌────────────────────┐                           │
                              │                    │                           │
                              │  Stripe Payments   │                           │
                              │                    │                           │
                              └──────────┬─────────┘                           │
                                         │                                     │
                                         └─────────────────────────────────────┘
```

## Key Components

### Frontend

The frontend is built with React and TypeScript, utilizing modern patterns and libraries:

- **Component Framework**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Query for server state, React Context for application state
- **Routing**: Not explicitly defined, but likely React Router
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: 
  - Radix UI primitives for accessible components
  - Drag-and-drop functionality via dnd-kit
  - PDF generation with @react-pdf/renderer

The frontend supports features like:
- Teacher resources and lesson plans
- Interactive Q&A displays
- Content management interfaces
- Book and unit navigation
- Payment and subscription management

### Backend

The backend is built with Node.js and Express.js, focusing on API endpoints and content delivery:

- **Server Framework**: Express.js with TypeScript
- **API Design**: RESTful endpoints
- **Real-time Communication**: WebSockets via 'ws' library
- **Content Processing**: Various utilities for processing Excel files and extracting Q&A data
- **Authentication**: Session-based authentication with Passport.js
- **Rate Limiting**: Express Rate Limit for API protection
- **Security**: Helmet for HTTP headers, compression for performance

Key server components include:
- Authentication and session management
- Content management endpoints
- Payment processing routes
- Direct S3 access for content
- WebSocket server for real-time features

### Database

The application uses PostgreSQL with Drizzle ORM for database operations:

- **ORM**: Drizzle ORM for TypeScript-first database interaction
- **Connection**: Neon Serverless Postgres (based on connection string usage)
- **Schema Management**: Drizzle Kit for migrations

Key database entities include:
- Users (teachers, students, admins)
- Books and units (curriculum structure)
- Materials (lesson content)
- Subscriptions and plans
- Schools and teacher associations

### Content Storage and Processing

The application heavily relies on AWS S3 for content storage and retrieval:

- **Storage Service**: AWS S3 bucket ('visualenglishmaterial')
- **File Types**: Images, PDFs, Excel files containing lesson data
- **Content Processing**: Python and JavaScript utilities for processing Excel files with Q&A content
- **Structure**: Content organized by books and units (e.g., book1/unit5/)

The system includes several utilities for processing Excel files to extract question-answer pairs and convert them to structured JSON data for the application.

### Authentication and Authorization

The application implements a custom authentication system:

- **Authentication Method**: Username/password with session management
- **Session Storage**: Memory store (for development, would need Redis or similar for production)
- **Password Security**: Scrypt for password hashing
- **Authorization**: Role-based access control (admin, teacher roles)

### Payment Processing

The application integrates with Stripe for payment processing:

- **Payment Provider**: Stripe
- **Payment Types**: One-time payments and subscriptions
- **Plan Types**: Various pricing tiers (single lessons, whole books, printed books)
- **Discount Handling**: Special pricing for multiple books or yearly subscriptions

## Data Flow

### Lesson Content Flow

1. Content creators upload Excel files with Q&A pairs and resources to AWS S3
2. Backend processes these files using Python or JavaScript utilities
3. The processed data is stored in the database or served directly from S3
4. Frontend requests content through API endpoints
5. Content is displayed to users through interactive components

### User Authentication Flow

1. User submits login credentials
2. Server validates credentials and creates a session
3. Session token is stored in a cookie
4. Subsequent requests include the session cookie for authentication
5. Protected routes check for valid session before processing

### Payment Flow

1. User selects a plan (single lesson, whole book, etc.)
2. Frontend creates a payment intent through the Stripe API
3. User completes payment on Stripe-hosted elements
4. Stripe webhooks confirm successful payment
5. User's subscription or access is updated in the database

## External Dependencies

The application integrates with several external services:

1. **AWS S3**: For storage and retrieval of lesson materials
   - Used for storing images, PDFs, and Excel files
   - Presigned URLs for direct client access

2. **Stripe**: For payment processing
   - Handles subscriptions and one-time payments
   - Provides secure payment elements

3. **SendGrid**: For email notifications (referenced in dependencies)
   - Likely used for user registration, password resets, and notifications

4. **Neon Database**: For PostgreSQL database hosting
   - Used with @neondatabase/serverless package

## Deployment Strategy

The application is configured for deployment on Replit, with the following strategy:

1. **Development Environment**:
   - Uses Vite's development server with HMR
   - Runs on port 5000
   - Provides direct access to static files

2. **Production Build**:
   - Uses Vite for frontend build
   - Compiles TypeScript with esbuild
   - Outputs to dist directory

3. **Production Server**:
   - Custom Express server to serve static files
   - WebSocket server for real-time features
   - API endpoints for data access

4. **Deployment Configuration**:
   - Replit configuration in .replit file
   - Auto-scaling deployment target
   - Build and run commands defined

5. **Port Configuration**:
   - Port 5000: Application server
   - Port 5001: Testing/WebSocket server
   - External ports mapped to 80 and 3000

The deployment process includes:
- Building the frontend with Vite
- Compiling TypeScript server code with esbuild
- Starting the production server with the compiled code

## Development Workflow

The development workflow includes:

1. **Local Development**:
   - `npm run dev`: Starts development server
   - TypeScript checking with `npm run check`

2. **Database Management**:
   - Drizzle ORM for schema definition
   - `npm run db:push` for schema updates

3. **Content Processing**:
   - Python scripts for processing Excel files
   - JavaScript utilities for generating JSON from Excel data

4. **Testing**:
   - Various test scripts for specific functionality
   - WebSocket testing utilities

## Future Considerations

Areas for potential architectural improvement:

1. **Caching Strategy**: Implement Redis or similar for caching and improved session management
2. **Containerization**: Consider Docker for consistent deployment environments
3. **API Documentation**: Add OpenAPI/Swagger documentation
4. **Testing Framework**: Implement comprehensive testing strategy
5. **CI/CD Pipeline**: Add automated testing and deployment
6. **Monitoring**: Implement application monitoring and logging