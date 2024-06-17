"use client";

import { Quotes } from "@/lib/data";
import { FC, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface QouteSliderProps {}

const QouteSlider: FC<QouteSliderProps> = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prevSlide) => {
        const nextSlide = (prevSlide + 1) % Quotes.length;
        return nextSlide;
      });
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`py-6 px-14 flex justify-center items-center w-full transition-colors h-full rounded-r-lg bg-[#E0FFFF] dark:bg-violet-800`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={Quotes[activeSlide].id}
          className="flex flex-col"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <p className="text-[1.65rem] dark:text-gray-100">
            {Quotes[activeSlide].quote}
          </p>
          <div className="flex space-x-6 items-center mt-8">
            <motion.div
              className="flex justify-between items-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <Avatar>
                <AvatarImage src={Quotes[activeSlide].imageURL} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </motion.div>
            <motion.div
              className="flex flex-col text-left"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <span className="font-bold dark:text-gray-100">
                {Quotes[activeSlide].author}
              </span>
              <span className="text-gray-600 dark:text-gray-300/70">
                {Quotes[activeSlide].position} {Quotes[activeSlide].company}
              </span>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QouteSlider;
