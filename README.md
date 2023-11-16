# AWS Bedrock Showcase

## About the Project

Welcome to the AWS Bedrock Showcase - a Next.js application designed to demonstrate the seamless integration and capabilities of AWS Bedrock in the realm of AI applications. This platform serves as an interactive hub where users can explore various AI-powered features and functionalities, all built on top of AWS Bedrock.

### What is AWS Bedrock?

AWS Bedrock is a robust cloud computing platform designed to facilitate the development and deployment of scalable and secure AI applications. It provides a wide range of tools and services that enable developers to build, train, and deploy machine learning models efficiently. With its powerful infrastructure, AWS Bedrock supports the handling of large datasets and complex AI algorithms, making it an ideal choice for enterprises and developers looking to leverage the power of artificial intelligence in their applications. Its integration capabilities with various AWS services ensure a seamless workflow, enhancing the overall development process.

## Live Demo

Link: https://main.d3nerrt8c5kd5o.amplifyapp.com/

## Getting Started

### Prerequisites
- Node.js (version 18.17 or later)
- Npm, yarn, pnpm or bun (for managing packages)
- AWS Account

### Getting environment variables

First, make a copy of `.env.example` in the same directory and rename it to `.env.local`.

Fill it with the following variables:

#### AWS Cognito Variables

AWS Cognito is a cloud-based service that provides user authentication and access control for web and mobile applications, supporting features like sign-up, sign-in, and user profile management.

To obtain the Cognito-related variables `(AUTH_COGNITO_ID, AUTH_COGNITO_SECRET, AUTH_COGNITO_ISSUER)`, follow these steps:

1. Accessing AWS Cognito:
    1. Log in to your AWS Management Console.
    2. Navigate to the Amazon Cognito service.
2. Creating/Using a User Pool:
    1. If you haven't already, create a new User Pool or select an existing one.
    2. Once the User Pool is set up, complete `AUTH_COGNITO_ISSUER` with the following format: `https://cognito-idp.{region}.amazonaws.com/{PoolId}`.
3. App Client Settings:
    1. In your User Pool, go to the "App integration tab" section.
    2. Create a new App client if necessary, ensuring you generate a client secret.
    3. While generating the app client, in Hosted UI settings, you have to use the following configurations:
    ![Alt text](/readme-assets/callback-config.png)
    ![Alt text](/readme-assets/oauth-config.png)
    4. Note down the App client ID and the App client secret. These will be your `AUTH_COGNITO_ID` and `AUTH_COGNITO_SECRET`, respectively.

#### Other Auth Variables

- `AUTH_SECRET`: This is used to encrypt cookies and tokens. It should be a random string of at least 32 characters. On Linux systems, you can generate a suitable string using the command `openssl rand -base64 32`.

#### AWS Variables

To get `AMAZON_KEY_ID` and `AMAZON_KEY_SECRET`:

1. Go to your AWS Console and go to IAM service.
2. Select "Users" from "Access management" on the left sidebar.
3. Click on your username and go to the "Security credentials" tab.
4. In the "Access keys" section click on "Create access key".
5. Select "Local code" and create your key by adding a description.
6. Write down the key and secret and set the values for `AMAZON_KEY_ID` and `AMAZON_KEY_SECRET` respectively.

#### ⚠️ Warning ⚠️

**DO NOT SHARE OR MAKE PUBLIC ANY OF THE ABOVE SECRETS**

### Installation

First install the dependencies with:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server with:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.