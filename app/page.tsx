import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-[1440px] w-full">
      <p>Hello World!</p>
      <Link href="/auth">Go to Auth</Link>
    </div>
  );
}
