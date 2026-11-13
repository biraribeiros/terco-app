import { motion } from 'framer-motion';
import { useEffect } from 'react';
import logoVertical from '../assets/rosario-guiado-vertical_branco.svg';

/** Tela de abertura rápida: logo em fade, some sozinha em ~2 s (ou ao tocar). */
const DURACAO_MS = 1800;

export function Splash({ onFim }: { onFim: () => void }) {
  useEffect(() => {
    const id = window.setTimeout(onFim, DURACAO_MS);
    return () => window.clearTimeout(id);
  }, [onFim]);

  return (
    <motion.div
      className="splash"
      role="presentation"
      onClick={onFim}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <motion.img
        className="splash-logo"
        src={logoVertical}
        alt="Rosário Guiado"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}
      />
    </motion.div>
  );
}
