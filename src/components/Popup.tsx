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

const Popup = ({ isOpen: stateToSet, onClose }: Props) => {
  const [currentPopupPage, setCurrentPopupPage] = useState<PopupPage>(PopupPage.Home);

  const navigateToPopupPage = (page: PopupPage) => {
    setCurrentPopupPage(page);
  };

  const popupOpacity = stateToSet ? 1 : 0;
  let isOpen = false;
  if (stateToSet) {isOpen = true};

  return (
    <>
      {isOpen && (
        <motion.div
          className="popup-overlay" // Add your styling here
          initial={{ opacity: 0 }}
          animate={{ opacity: popupOpacity }}
          layout
          transition={{ duration: 2, type: 'tween' }}
          onAnimationEnd={() => {isOpen = stateToSet}}
        >
          <div className="popup-content" style={{ position: 'relative' }}>
            <button
              // onClick={onClose}
              onClick={() => stateToSet=false}
              aria-label="Close popup"
              style={{ position: 'absolute', top: 0, left: 0, marginTop: '15px', marginLeft: '15px'}}
            >
              <motion.div
                className="purpleContainer"
                whileHover={{ scale: 1.2, rotate: 90 }}
                whileTap={{
                  scale: 0.8,
                  rotate: -90,
                  borderRadius: '100%',
                }}
              > 
                <h1
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    width: '100%',
                  }}
                >
                  ✖️
                </h1>
              </motion.div>
            </button>
            {currentPopupPage === PopupPage.Home && (
              <Image
                style={{ borderRadius: '10px' }}
                src="https://raw.githubusercontent.com/AsafMeizner/multi-app-website-new/master/public/galgol.JPG"
                alt="galgol"
                width={800}
                height={800}
              />
            )}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Popup;