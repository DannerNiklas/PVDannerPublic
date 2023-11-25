import Image from "next/image";
import Link from "next/link";

export default async function NavBar() {
  return (
    <div className="sticky w-full max-w-screen-xl self-center top-0 z-20 flex overflow-hidden flex-col items-center justify-center">
      <header className="flex w-full shrink-0 relative h-[4.5rem] max-w-screen-xl animate-fade-in items-center justify-between border-b-2 border-stone-400 border-opacity-20 bg-primary bg-opacity-90 backdrop-blur-md transition-shadow duration-300 before:absolute before:right-full before:top-0 before:h-full before:w-4 before:bg-primary before:content-[''] after:absolute after:left-full after:top-0 after:h-full after:w-4 after:bg-primary after:content-[''] md:h-[5.5rem]">
        <Link href="/">
          <div className="flex w-full h-full p-4 animate-fade-rotate-scale-in items-center outline-none transition-colors duration-200 text-stone-600 hover:text-stone-400">
            <p className="flex h-full w-full items-center outline-none cursor-default text-xl font-black">
              PVDanner
            </p>
          </div>
        </Link>
        <div className=" h-full items-center ">
          <div className="inline-flex self-center justify-center text-center w-full"></div>
          <div className="inline-flex select-none items-center md:hidden">
            <svg></svg>
          </div>
          <ul className="w-full space-x-3 hidden md:flex">
            <li className="flex select-none items-center whitespace-nowrap text-base font-medium transition-colors duration-300 h-10 rounded-xl cursor-default bg-stone-400 bg-opacity-20 text-stone-800 group">
              <a className="flex h-full w-full items-center outline-none cursor-default px-3.5">
                Dashboard
              </a>
            </li>
            <li className="flex select-none items-center whitespace-nowrap text-base font-medium transition-colors duration-300 h-10 rounded-xl cursor-default bg-stone-400 bg-opacity-20 text-stone-800 group">
              <a className="flex h-full w-full items-center outline-none cursor-default px-3.5">
                Inverters
              </a>
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
