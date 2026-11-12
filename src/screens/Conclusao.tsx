import { motion } from 'framer-motion';
import { useState } from 'react';
import { ProximoTerco } from '../components/ProximoTerco';
import { compartilharConvite, type Rede } from '../lib/compartilhar';
import type { Alerta } from '../lib/prefs';

// Brilhos suaves, sem exagero: aparecem uma vez e se apagam.
const BRILHOS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  esquerda: (i * 37) % 100,
  topo: (i * 53) % 100,
  atraso: (i % 5) * 0.12,
}));

const REDES: { rede: Rede; nome: string }[] = [
  { rede: 'whatsapp', nome: 'WhatsApp' },
  { rede: 'instagram', nome: 'Instagram' },
  { rede: 'facebook', nome: 'Facebook' },
];

interface Props {
  kids: boolean;
  nome: string;
  alerta: Alerta;
  horaLembrete: number;
  minutoLembrete: number;
  onInicio: () => void;
}

export function Conclusao({ kids, nome, alerta, horaLembrete, minutoLembrete, onInicio }: Props) {
  // Uma coisa por vez, para a tela caber sem rolagem.
  const [vista, setVista] = useState<'resumo' | 'proximo' | 'compartilhar'>('resumo');

  if (vista === 'proximo') {
    return (
      <div className="conclusao">
        <ProximoTerco alerta={alerta} horaSugerida={horaLembrete} minutoSugerido={minutoLembrete} />
        <button type="button" className="btn btn-secundario" onClick={() => setVista('resumo')}>
          Voltar
        </button>
      </div>
    );
  }

  if (vista === 'compartilhar') {
    return (
      <div className="conclusao">
        <section className="vidro proximo" aria-label="Compartilhar com um amigo">
          <h2 className="titulo-cartao">Compartilhar com um amigo</h2>
          <p className="texto-pequeno">Envie um convite para conhecer o Rosário Guiado.</p>
          <div className="redes">
            {REDES.map((r) => (
              <button
                key={r.rede}
                type="button"
                className="btn btn-secundario"
                onClick={() => void compartilharConvite(r.rede, nome)}
              >
                {r.nome}
              </button>
            ))}
          </div>
        </section>
        <button type="button" className="btn btn-secundario" onClick={() => setVista('resumo')}>
          Voltar
        </button>
      </div>
    );
  }

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
      <h1 className="titulo">Terço concluído!</h1>
      <p className="texto-lead">Que a paz de Deus esteja com você.</p>
      <p className="texto-pequeno">
        {kids ? 'Você ganhou uma estrela no calendário!' : 'A oração foi registrada no seu calendário.'}
      </p>
      <button type="button" className="btn btn-primario" onClick={() => setVista('proximo')}>
        Próximo terço
      </button>
      <button type="button" className="btn btn-secundario" onClick={() => setVista('compartilhar')}>
        Compartilhar com um amigo
      </button>
      <button type="button" className="btn btn-secundario" onClick={onInicio}>
        Voltar ao início
      </button>
    </div>
  );
}
