import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/dashboard/account" className="p-2 bg-blue-500 text-white rounded-lg">开始</Link>
    </main>
  );
}
