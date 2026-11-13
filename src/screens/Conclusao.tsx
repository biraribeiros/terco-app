import { motion } from 'framer-motion';
import { useState } from 'react';
import { CreditoVia } from '../components/CreditoVia';
import logoVerticalBranco from '../assets/rosario-guiado-vertical_branco.svg';
import logoVerticalPreto from '../assets/rosario-guiado-vertical_preto.svg';
import { ProximoTerco } from '../components/ProximoTerco';
import { compartilharConvite, type Rede } from '../lib/compartilhar';
import { DIAS_NOVENA, type Alerta } from '../lib/prefs';

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

function IconeRede({ rede }: { rede: Rede }) {
  const base = {
    width: 30,
    height: 30,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    focusable: false,
  };
  if (rede === 'whatsapp') {
    return (
      <svg {...base}>
        <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3Z" />
        <path d="M9.2 8.4c-.4 2.9 2.9 6.2 6 6.2l1.1-1.5-2-1-.9.7a4.6 4.6 0 0 1-2-2l.7-.9-1-2-1.9.5Z" />
      </svg>
    );
  }
  if (rede === 'instagram') {
    return (
      <svg {...base}>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg {...base}>
      <path d="M14 8h2.5V4.5H14A4 4 0 0 0 10 8.5V11H7.5v3.5H10V21h3.5v-6.5H16l.6-3.5h-3.1V9a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

interface Props {
  kids: boolean;
  nome: string;
  alerta: Alerta;
  onAlerta: (alerta: Alerta) => void;
  /** Resultado da novena nesta oração, se ela faz parte de uma. */
  novena: { dia: number; concluida: boolean } | null;
  horaLembrete: number;
  minutoLembrete: number;
  onInicio: () => void;
}

export function Conclusao({ kids, nome, alerta, onAlerta, novena, horaLembrete, minutoLembrete, onInicio }: Props) {
  // Uma coisa por vez, para a tela caber sem rolagem.
  const [vista, setVista] = useState<'resumo' | 'proximo' | 'compartilhar'>('resumo');

  if (vista === 'proximo') {
    return (
      <div className="conclusao conclusao-centro">
        <ProximoTerco alerta={alerta} onAlerta={onAlerta} horaSugerida={horaLembrete} minutoSugerido={minutoLembrete} />
        <button type="button" className="btn btn-secundario" onClick={() => setVista('resumo')}>
          Voltar
        </button>
      </div>
    );
  }

  if (vista === 'compartilhar') {
    return (
      <div className="conclusao conclusao-centro">
        <p className="texto-lead texto-centro">Envie um convite para conhecer o Rosário Guiado.</p>
        <div className="redes">
          {REDES.map((r) => (
            <button
              key={r.rede}
              type="button"
              className="rede-icone"
              aria-label={`Compartilhar no ${r.nome}`}
              onClick={() => void compartilharConvite(r.rede, nome)}
            >
              <span className="rede-circulo">
                <IconeRede rede={r.rede} />
              </span>
              <span className="rede-nome">{r.nome}</span>
            </button>
          ))}
        </div>
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
      {novena && (
        <p className="texto-lead">
          {novena.concluida ? 'Novena concluída!' : `Novena · dia ${novena.dia} de ${DIAS_NOVENA}`}
        </p>
      )}
      <p className="texto-lead">Deseja agendar o próximo terço?</p>
      <button type="button" className="btn btn-primario" onClick={() => setVista('proximo')}>
        Agendar
      </button>
      <button type="button" className="btn btn-secundario" onClick={() => setVista('compartilhar')}>
        Compartilhar com um amigo
      </button>
      <button type="button" className="btn btn-secundario" onClick={onInicio}>
        Voltar ao início
      </button>
      <footer className="creditos">
        <img className="logo-vertical logo-branco" src={logoVerticalBranco} alt="" aria-hidden="true" />
        <img className="logo-vertical logo-preto" src={logoVerticalPreto} alt="" aria-hidden="true" />
        <CreditoVia />
      </footer>
    </div>
  );
}
