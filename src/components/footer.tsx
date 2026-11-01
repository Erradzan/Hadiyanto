"use client";

import { FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from 'react-icons/md';
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full flex flex-col justify-center items-center bg-transparent backdrop-blur-md py-2">
        <div className="flex space-x-12 text-white sm:text-md md:text-lg lg:text-xl xl:text-3xl 2xl:text-5xl">

            <motion.a
            href="http://wa.me/+6281211357363"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="text-white hover:text-gray-400 cursor-pointer"
            >
                <FaWhatsapp />
            </motion.a>

            <motion.a
            href="mailto:hadi.yanto8297@gmail.com?subject=Hello&body=I wanted to reach out about..."
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="text-white hover:text-gray-400 cursor-pointer"
            >
                <MdEmail />
            </motion.a>
        </div>
        
        <p className="text-white mt-4 text-sm md:text-sm lg:text-md xl:text-md 2xl:text-lg text-center px-4">
            Currently looking for new opportunities. Feel free to reach out!
        </p>
    </footer>
  );
}
