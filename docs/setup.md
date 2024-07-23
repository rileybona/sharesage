# 📑 ShareSage Installation and Setup

### [⇦ Back to Project Overview](../README.md)

## Getting Started

1. **Clone this repository (only this branch):**

   ```bash
   git clone -b main https://github.com/rileybona/sharesage.git
   ```

2. **Install dependencies:**

   ```bash
   pipenv install -r requirements.txt
   ```

3. **Create a `.env` file** based on the example with proper settings for your development environment.

4. **Ensure the SQLite3 database connection URL is in the `.env` file.**

5. **Set the `SCHEMA` environment variable** with a unique name using the snake_case convention.

6. **Initialize your pipenv, migrate your database, seed your database, and run your Flask app:**

   ```bash
   pipenv shell
   flask db upgrade
   flask seed all
   flask run
   ```

7. **Run the React frontend in development:**

   ```bash
   cd react-vite
   npm install
   npm run dev
   ```

   The starter has modified the `npm run build` command to include the `--watch` flag. This flag will rebuild the **dist** folder whenever you change your code, keeping the production version up to date.

## Deployment through Render.com

1. **Prepare for deployment:**

   - Run `npm run build` in your **react-vite** folder.
   - Ensure the **dist** folder is located in the root of your **react-vite** folder before pushing to GitHub.

2. **Deploy on Render.com:**

   - Refer to Render.com's deployment articles for more detailed instructions about getting started, creating a production database, and deployment debugging tips.
