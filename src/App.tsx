import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

// Tela provisória da Etapa 1: confirma que o stack compila e roda.
// As telas reais entram na Etapa 3.
export function App() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;
    const tween = gsap.fromTo(
      titleRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out' },
    );
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <main
      style={{
        minHeight: '100dvh',
        display: 'grid',
        placeItems: 'center',
        padding: 'var(--space-4)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={{ textAlign: 'center' }}
      >
        <h1 ref={titleRef} style={{ fontSize: 'var(--text-display)', margin: 0 }}>
          Terço
        </h1>
        <p style={{ fontSize: 'var(--text-lead)', margin: 'var(--space-3) 0 0' }}>
          Base técnica pronta.
        </p>
      </motion.div>
    </main>
  );
}
