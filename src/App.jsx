import { useState } from "react";
import { useAuth } from "./context/Authcontext";

function App() {
  const { createUser, loading, user, logOut } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    try {
      const userCredential = await createUser(email, password);
      setMessage(`Registered successfully: ${userCredential.user.email}`);
      setEmail("");
      setPassword("");
    } catch (firebaseError) {
      setError(firebaseError.message);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-slate-500">
          Firebase Auth
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900">
          Create an account
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          This form uses the auth context to register a user with email and
          password.
        </p>

        <form className="mt-8 space-y-4" onSubmit={handleRegister}>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
              type="password"
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={6}
              required
            />
          </div>

          <button
            className="w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            type="submit"
            disabled={loading}
          >
            {loading ? "Checking auth..." : "Register"}
          </button>
        </form>

        {message ? (
          <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {message}
          </p>
        ) : null}

        {error ? (
          <p className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </p>
        ) : null}

        <div className="mt-6 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
          <p className="font-semibold text-slate-900">Current user</p>
          <p className="mt-1 break-all">
            {user?.email ? user.email : "No user signed in"}
          </p>
          {user ? (
            <button
              className="mt-3 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-100"
              type="button"
              onClick={logOut}
            >
              Log out
            </button>
          ) : null}
        </div>
      </section>
    </main>
  );
}

export default App;
