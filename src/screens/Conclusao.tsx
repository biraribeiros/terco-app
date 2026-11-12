import { motion } from 'framer-motion';

// Brilhos suaves, sem exagero: aparecem uma vez e se apagam.
const BRILHOS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  esquerda: (i * 37) % 100,
  topo: (i * 53) % 100,
  atraso: (i % 5) * 0.12,
}));

export function Conclusao({ kids, onInicio }: { kids: boolean; onInicio: () => void }) {
  return (
    <div className="conclusao">
      <div className="celebracao" aria-hidden="true">
        {BRILHOS.map((b) => (
          <motion.span
            key={b.id}
            className="brilho"
            style={{ left: `${b.esquerda}%`, top: `${b.topo}%` }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: [0, 1, 0.5], scale: [0.4, 1, 0.8] }}
            transition={{ duration: 1.6, delay: b.atraso, ease: 'easeOut' }}
          />
        ))}
      </div>
      <h1 className="titulo">Terço concluído</h1>
      <p className="texto-lead">Que a paz de Deus esteja com você.</p>
      <p className="texto-corpo">
        {kids ? 'Você ganhou uma estrela no calendário!' : 'O dia foi marcado no seu calendário.'}
      </p>
      <button type="button" className="btn btn-primario" onClick={onInicio}>
        Voltar ao início
      </button>
    </div>
  );
}
