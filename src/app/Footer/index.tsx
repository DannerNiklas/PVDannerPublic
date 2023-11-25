import Image from "next/image";
import Link from "next/link";
import lewakasicon from "@/images/Lewakas_Icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faGithub } from "@fortawesome/free-brands-svg-icons";

export default async function Footer() {

  return (
    <footer className="flex w-full shrink-0 h-[5.25rem] self-center max-w-screen-xl items-center justify-between border-t-2 border-stone-400 border-opacity-20 bg-primary-50 md:h-[6.25rem]">
      <div className="flex items-center text-stone-600">
        <div>
          <span>Website by Niklas Danner</span>
        </div>
      </div>
      <div className="flex items-center space-x-7">
        <a href="https://www.instagram.com/niklas.danner/" className="inline-flex select-none items-center whitespace-nowrap font-medium outline-none transition duration-200 text-stone-800 hover:text-stone-600 dark:text-stone-500 dark:hover:text-stone-300">
          <FontAwesomeIcon className="h-5 w-5 fill-current" icon={faInstagram} />
        </a>
        <a href="https://github.com/DannerNiklas" className="inline-flex select-none items-center whitespace-nowrap font-medium outline-none transition duration-200 text-stone-800 hover:text-stone-600 dark:text-stone-500 dark:hover:text-stone-300">
          <FontAwesomeIcon className="h-5 w-5 fill-current" icon={faGithub} />
        </a>
      </div>
    </footer>
  );
}
