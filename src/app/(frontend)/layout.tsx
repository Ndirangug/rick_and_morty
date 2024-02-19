"use client";

// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Rick and Morty",
//   description: "Rick & Morty API Challenge",
// };

export default function RootLayout({
  children,
  locations,
  resident,
}: Readonly<{
  children: React.ReactNode;
  locations: React.ReactNode;
  resident: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex min-h-screen h-screen flex-col items-center justify-start p-24">
          <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex">
            <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 font-extrabold text-2xl">
              Rick and Morty API
            </p>
          </div>

          <div className=" bg-gray-500 bg-opacity-20 px-10 py-10 mt-10 mb-20  h-[90%] rounded-2xl w-full">
            {children}
          </div>

          <div className="fixed flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 translate-y-96 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]"></div>
        </main>
      </body>
    </html>
  );
}
