"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [bookmarks, setBookmarks] = useState<any[]>([])
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")

  // Get Logged User
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }
    getUser()
  }, [])

  // Fetch Bookmarks when user exists
  useEffect(() => {
  if (!user) return

  fetchBookmarks()

  const channel = supabase
    .channel("bookmarks-changes")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "bookmarks",
        filter: `user_id=eq.${user.id}`,
      },
      () => {
        fetchBookmarks()
      }
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}, [user])



  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false })

    if (data) setBookmarks(data)
  }

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    })
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setBookmarks([])
  }

  const addBookmark = async () => {
    if (!title || !url) return

    await supabase.from("bookmarks").insert([
      {
        title,
        url,
        user_id: user.id,
      },
    ])

    setTitle("")
    setUrl("")
    fetchBookmarks()
  }

  const deleteBookmark = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id)
    fetchBookmarks()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center px-4">

      <div className="bg-white text-gray-800 w-full max-w-2xl rounded-2xl shadow-2xl p-8">

        {!user ? (
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-6">
              🔖 Smart Bookmark Manager
            </h1>

            <button
              onClick={handleLogin}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition duration-200"
            >
              Login with Google
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-semibold text-lg">
                Welcome {user.email}
              </h2>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </div>

            {/* Add Bookmark */}
            <div className="flex gap-3 mb-6">
              <input
                type="text"
                placeholder="Bookmark Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />

              <input
                type="text"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              />

              <button
                onClick={addBookmark}
                className="bg-green-500 hover:bg-green-600 text-white px-6 rounded-lg transition"
              >
                Add
              </button>
            </div>

            {/* Bookmark List */}
            <div className="space-y-4">
              {bookmarks.map((bookmark) => (
                <div
                  key={bookmark.id}
                  className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow hover:shadow-md transition"
                >
                  <div>
                    <h3 className="font-semibold text-lg">
                      {bookmark.title}
                    </h3>
                    <a
                      href={bookmark.url}
                      target="_blank"
                      className="text-indigo-600 text-sm underline"
                    >
                      {bookmark.url}
                    </a>
                  </div>

                  <button
                    onClick={() => deleteBookmark(bookmark.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                  >
                    Delete
                  </button>
                </div>
              ))}

              {bookmarks.length === 0 && (
                <p className="text-center text-gray-500">
                  No bookmarks added yet.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
