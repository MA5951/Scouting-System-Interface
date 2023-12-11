"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

let setState = false;
let currentPopupState = false;

export function openGalgolPopup() {
    setState = true;
    currentPopupState = true;
}

export function closeGalgolPopup() {
    setState = false;
}

function getIsGalgolOpen() {
    return setState;
}

const GalgolPopup = () => {

  const popupOpacity = setState ? 1 : 0;

  return (
    <>
      {currentPopupState && (
        <motion.div
          className="popup-overlay" // Add your styling here
          initial={{ opacity: popupOpacity }}
          animate={{ opacity: popupOpacity }}
          layout
          transition={{ duration: 0.5, type: 'tween' }}
          onAnimationEnd={() => {currentPopupState = setState;}}
        >
          <div className="popup-content"> {/* Add your styling here */}
            <button onClick={closeGalgolPopup} aria-label="Close popup">
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
            <Image src="/galgol.jpg" alt="galgol" width={500} height={500} />
          </div>
        </motion.div>
      )}
    </>
  );
};

export default GalgolPopup;