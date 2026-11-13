import { motion } from 'framer-motion';
import { useEffect } from 'react';
import viaBranco from '../assets/via-ai_branco.svg';
import viaPreto from '../assets/via-ai_preto.svg';

/** Abertura de 3 s: logo Via.ai e o nome do desenvolvedor. A trilha já está tocando por baixo. */
const DURACAO_MS = 3000;

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
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <motion.div
        className="splash-marca"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.2, 0, 0, 1] }}
      >
        <img className="splash-logo logo-branco" src={viaBranco} alt="Via.ai" />
        <img className="splash-logo logo-preto" src={viaPreto} alt="Via.ai" />
        <p>Desenvolvido por Bira Ribeiro</p>
      </motion.div>
    </motion.div>
  );
}
