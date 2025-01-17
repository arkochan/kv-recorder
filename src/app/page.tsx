import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <a
        className="flex items-center gap-2  hover:underline hover:underline-offset-4"
        href="/recorder"
        target="_blank"
        rel="noopener noreferrer"
      >
        Recorder
      </a>
    </div>
  );
}
