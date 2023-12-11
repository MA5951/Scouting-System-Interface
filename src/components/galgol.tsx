"use client";

import { motion, AnimatePresence } from "framer-motion"
import Image from 'next/image';

const Galgol = ({stateToSet, handleClose} : {stateToSet: boolean, handleClose:()=> void}) => {

    let popupOpacity;
    let isOpen: boolean = false;
    let isComplete: boolean = false;

    if (stateToSet) {
        popupOpacity = 1;
        isOpen = true;
    } else {
        popupOpacity = 0;
    }

    return (
        <>
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="popup-overlay" // Add your styling here
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    layout
                    transition={{ duration: 0.7, type: 'tween' }}
                    exit={{ opacity: 0 }}
                    onAnimationComplete={() => {isOpen = false}}
                >
                <div className="popup-content" style={{ position: 'relative' }}>
                    <button
                    onClick={handleClose}
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
                    <Image
                        style={{ borderRadius: '10px' }}
                        src="https://raw.githubusercontent.com/AsafMeizner/multi-app-website-new/master/public/galgol.JPG"
                        alt="galgol"
                        width={800}
                        height={800}
                    />
                </div>
                </motion.div>
            )}
        </AnimatePresence>
        </>
    );
};

export default Galgol;