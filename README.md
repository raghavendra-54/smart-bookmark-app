🚀 Smart Bookmark Manager

A full-stack bookmark management application built using Next.js (App Router), Supabase, and Tailwind CSS.

This app allows users to securely log in using Google OAuth, manage their personal bookmarks, and experience real-time updates across multiple tabs.

🌍 Live Demo

🔗 Live URL:
https://smart-bookmark-app-gold-chi.vercel.app

📂 GitHub Repository:
https://github.com/raghavendra-54/smart-bookmark-app

🛠 Tech Stack

Frontend: Next.js 16 (App Router)

Backend & Auth: Supabase

Database: PostgreSQL (Supabase)

Authentication: Google OAuth (No email/password)

Realtime: Supabase Realtime Subscriptions

Styling: Tailwind CSS

Deployment: Vercel

Version Control: Git & GitHub

✨ Features

✅ Google OAuth Login
✅ Private bookmarks per user (Row Level Security enabled)
✅ Add bookmarks (Title + URL)
✅ Delete own bookmarks
✅ Real-time updates across tabs
✅ Secure database access
✅ Production deployment on Vercel

🔐 Security Implementation

Enabled Row Level Security (RLS) in Supabase

Created policies to ensure:

Users can only view their own bookmarks

Users can only insert their own records

Users can only delete their own bookmarks

All queries are authenticated using Supabase session

⚡ Realtime Implementation

Used Supabase Realtime subscriptions to listen for:

INSERT

DELETE

This allows bookmark list to update instantly across multiple open tabs without page refresh.

📦 Database Schema

Table: bookmarks

Column	Type	Description
id	uuid	Primary Key
user_id	uuid	Authenticated User ID
title	text	Bookmark title
url	text	Bookmark URL
created_at	timestamp	Created time
🚧 Challenges Faced
1️⃣ OAuth Redirect Issue in Production

Problem: Google login was redirecting to localhost after deployment.
Solution:

Added Vercel production URL to Supabase Authentication → Redirect URLs

Updated Site URL in Supabase settings

2️⃣ Row Level Security Blocking Queries

Problem: Data was not inserting or selecting.
Solution:

Enabled RLS

Created proper SELECT, INSERT, DELETE policies based on auth.uid()

3️⃣ Realtime Not Updating Across Tabs

Problem: Bookmarks were only visible after refresh.
Solution:

Implemented Supabase channel subscription

Refetched data on change events

4️⃣ Git & Deployment Errors

Problem: Merge conflicts and push rejection.
Solution:

Resolved conflict markers manually

Used git pull origin main --rebase

Rebuilt and redeployed on Vercel

📥 Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/raghavendra-54/smart-bookmark-app.git
cd smart-bookmark-app

2️⃣ Install Dependencies
npm install

3️⃣ Create .env.local file
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

4️⃣ Run Locally
npm run dev


App runs on:

http://localhost:3000

🎯 Future Improvements

Dark mode toggle

Bookmark categories

Edit bookmark feature

Search functionality

Bookmark favicon preview

AI-based bookmark tagging

👨‍💻 Author

Raghavendra
Full Stack Developer (Aspiring)

🏆 Project Purpose

This project was built as part of a Fullstack/GenAI internship screening task to demonstrate:

Authentication implementation

Secure database design

Real-time systems

Production deployment

Problem-solving ability

🔥 Built with dedication, debugging patience, and continuous learning.