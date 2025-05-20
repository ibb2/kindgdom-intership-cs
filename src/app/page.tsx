import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start max-w-2xl">
        <p className="text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          Case Study: Real-Time Webhook Integration with User Concurrency
          Handling 🧪 Objective Build a Next.js application with a landing page
          and dashboard that: ✅ Accepts form inputs from multiple users 🔗
          Sends data to a webhook 🖥️ Displays data received from the webhook in
          real-time or near real-time 👥 Supports concurrent users — data must
          be user-specific and not clash across sessions
        </p>

        <div className="flex gap-4 items-center flex-col sm:flex-row p-1 bg-gray-100 rounded-md border-2 border-gray-100">
          {"| "}By Ibrahim Ibrahim
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <Link
          className="flex flex-row items-center gap-2 hover:underline hover:underline-offset-4"
          href={"/dashboard"}
        >
          Get Started
          {"->"}
        </Link>
      </footer>
    </div>
  );
}
