# Setting Up

**Step 1: Pull the PostgreSQL Docker Image**

First, ensure Docker is installed on your machine. Then, pull the latest PostgreSQL image by running the following command:

```
docker pull postgres
```

**Step 2: Start a PostgreSQL Instance**

Once the image is pulled, start a new PostgreSQL instance using Docker:

```
docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres
```

This command will run a PostgreSQL container named my-postgres, setting the database password to mysecretpassword and exposing it on port 5432.

**Step 3: Set Up Prisma and Migrate the Database**

With the PostgreSQL instance running, you can create the necessary tables by running:

```
npx prisma migrate dev --name init
```

This will initialize the database schema and apply your migrations.

**Step 4: Configure the Environment Variables**

Create a .env file in the root directory of your project like this:

```
# For Database:
DATABASE_URL= "postgresql://postgres:mysecretpassword@localhost:5432/postgres"

# For JWT:
JWT_KEY= your_jwt_key_here

# To store images using Cloudflare R2:
CLOUDFLARE_ACCOUNT_ID= your_cloudflare_account_id_here
AWS_ACCESS_KEY_ID= your_aws_access_key_id_here
AWS_SECRET_ACCESS_KEY= your_aws_secret_access_key_here
AWS_BUCKET_NAME= your_aws_bucket_name_here
```

Ensure you replace your_jwt_key_here with your actual JWT key.

**Step 5: Run the Project**
Finally, to start your project, execute:

```
npm run dev
```

Your development server will run at http://localhost:3000.
