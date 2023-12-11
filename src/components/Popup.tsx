"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

enum PopupPage {
  Home = 'home',
}

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const Popup = ({ isOpen, onClose }: Props) => {
  const [currentPopupPage, setCurrentPopupPage] = useState<PopupPage>(PopupPage.Home);

  const navigateToPopupPage = (page: PopupPage) => {
    setCurrentPopupPage(page);
  };

  const popupOpacity = isOpen ? 1 : 0;

  return (
    <>
      {isOpen && (
        <motion.div
          className="popup-overlay" // Add your styling here
          initial={{ opacity: popupOpacity }}
          animate={{ opacity: popupOpacity }}
          layout
          transition={{ duration: 0.5, type: 'tween' }}
          
        >
          <div className="popup-content"> {/* Add your styling here */}
            <button onClick={onClose} aria-label="Close popup">
              <motion.div
                className="purpleContainer"
                whileHover={{ scale: 1.2, rotate: 90 }}
                whileTap={{
                  scale: 0.8,
                  rotate: -90,
                  borderRadius: '100%',
                }}
              >
                <h1>✖️</h1>
              </motion.div>
            </button>
            {currentPopupPage === PopupPage.Home && (
              <Image src="/galgol.jpg" alt="../galgol.jpg" width={500} height={500} />
            )}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Popup;