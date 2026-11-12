import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

// Bênção sacerdotal (Números 6:24-26), na tradução usada no app.
const LINHAS = [
  'O Senhor te abençoe e te guarde;',
  'o Senhor faça resplandecer o seu rosto sobre ti, e tenha misericórdia de ti;',
  'o Senhor sobre ti levante o seu rosto e te dê a paz.',
];

const ESPERA_MS = 9000;

/** Transição luminosa entre o fim da oração e a conclusão. Toque para seguir sem esperar. */
export function Bencao({ onFim }: { onFim: () => void }) {
  const fimRef = useRef(onFim);
  useEffect(() => {
    fimRef.current = onFim;
  });

  useEffect(() => {
    const temporizador = window.setTimeout(() => fimRef.current(), ESPERA_MS);
    return () => window.clearTimeout(temporizador);
  }, []);

  return (
    <button type="button" className="bencao" onClick={onFim} aria-label="Bênção. Toque para continuar.">
      <div className="bencao-luz" aria-hidden="true">
        <span className="bencao-raios" />
        <span className="bencao-halo" />
        <span className="bencao-clarao" />
      </div>
      <div className="bencao-texto">
        {LINHAS.map((linha, i) => (
          <motion.p
            key={linha}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 + i * 1.9, duration: 1.8, ease: 'easeOut' }}
          >
            {linha}
          </motion.p>
        ))}
        <motion.small
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1.4 + LINHAS.length * 1.9, duration: 1.4 }}
        >
          Números 6:24-26
        </motion.small>
      </div>
    </button>
  );
}
