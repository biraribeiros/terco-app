import { motion } from 'framer-motion';
import { useEffect } from 'react';
import rosarioBranco from '../assets/rosario-guiado-vertical_branco.svg';
import rosarioPreto from '../assets/rosario-guiado-vertical_preto.svg';
import viaBranco from '../assets/via-ai_branco.svg';
import viaPreto from '../assets/via-ai_preto.svg';

/** Abertura de 3 s: logo do Rosário Guiado no centro; Via.ai, autor e aviso na base. A trilha já toca por baixo. */
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
        className="splash-centro"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.2, 0, 0, 1] }}
      >
        <img className="splash-rosario logo-branco" src={rosarioBranco} alt="Rosário Guiado" />
        <img className="splash-rosario logo-preto" src={rosarioPreto} alt="Rosário Guiado" />
      </motion.div>
      <motion.div
        className="splash-base"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.3 }}
      >
        <img className="splash-via logo-branco" src={viaBranco} alt="Via.ai" />
        <img className="splash-via logo-preto" src={viaPreto} alt="Via.ai" />
        <p>Desenvolvido por Bira Ribeiro</p>
        <p className="splash-aviso">Versão não comercial, sem fins lucrativos</p>
      </motion.div>
    </motion.div>
  );
}
