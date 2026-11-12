import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import './styles/app.css';
import { Nav, type Aba } from './components/Nav';
import { hojeISO, carregarPrefs, salvarPrefs, type Prefs } from './lib/prefs';
import { misteriosDoConjunto } from './lib/passos';
import { MISTERIOS, type Misterio } from './data/roteiro';
import { Splash } from './screens/Splash';
import { TelaVoz } from './screens/Voz';
import { Inicio } from './screens/Inicio';
import { Misterios } from './screens/Misterios';
import { Oracao } from './screens/Oracao';
import { Conclusao } from './screens/Conclusao';
import { Calendario } from './screens/Calendario';
import { Lembrete } from './screens/Lembrete';
import { Palavra } from './screens/Palavra';
import { Ajustes } from './screens/Ajustes';

type Tela = 'splash' | 'voz' | 'inicio' | 'misterios' | 'oracao' | 'conclusao' | 'calendario' | 'lembrete' | 'palavra' | 'ajustes';

const ABAS: Tela[] = ['inicio', 'calendario', 'palavra', 'ajustes'];

interface Sessao {
  misterios: Misterio[];
  passoInicial: number;
}

export function App() {
  const [prefs, setPrefs] = useState<Prefs | null>(null);
  const [tela, setTela] = useState<Tela>('splash');
  const [sessao, setSessao] = useState<Sessao | null>(null);

  useEffect(() => {
    void carregarPrefs().then(setPrefs);
  }, []);

  // Salva sempre que as preferências mudam.
  useEffect(() => {
    if (prefs) void salvarPrefs(prefs);
  }, [prefs]);

  // Tema Kids, tamanho do texto e movimento refletidos no documento.
  useEffect(() => {
    if (!prefs) return;
    const raiz = document.documentElement;
    raiz.dataset.theme = prefs.voz === 'kids' ? 'kids' : '';
    raiz.style.setProperty('--text-scale', String(prefs.tamanhoTexto));
    raiz.style.setProperty('--duration-screen', prefs.reduzirMovimento ? '200ms' : '350ms');
    raiz.style.setProperty('--duration-slow', prefs.reduzirMovimento ? '200ms' : '450ms');
  }, [prefs]);

  const atualizar = useCallback((parcial: Partial<Prefs>) => {
    setPrefs((atual) => (atual ? { ...atual, ...parcial } : atual));
  }, []);

  const iniciarRosario = (misterios: Misterio[], passoInicial = 0) => {
    setSessao({ misterios, passoInicial });
    setTela('oracao');
  };

  const continuarRosario = () => {
    if (!prefs?.progresso) return;
    const { conjunto, ordens, passo } = prefs.progresso;
    const misterios = ordens
      .map((ordem) => MISTERIOS.find((m) => m.conjunto === conjunto && m.ordem === ordem))
      .filter((m): m is Misterio => m !== undefined);
    iniciarRosario(misterios.length > 0 ? misterios : misteriosDoConjunto(conjunto), passo);
  };

  const registrarProgresso = useCallback(
    (passo: number) => {
      if (!sessao || sessao.misterios.length === 0) return;
      const conjunto = sessao.misterios[0].conjunto;
      atualizar({
        progresso: { conjunto, ordens: sessao.misterios.map((m) => m.ordem), passo },
      });
    },
    [sessao, atualizar],
  );

  const concluirDia = () => {
    if (!prefs) return;
    const hoje = hojeISO();
    atualizar({
      diasRezados: prefs.diasRezados.includes(hoje) ? prefs.diasRezados : [...prefs.diasRezados, hoje],
      progresso: null,
    });
    setTela('conclusao');
  };

  if (!prefs) return null;

  const aba: Aba | null = ABAS.includes(tela) ? (tela as Aba) : null;

  const conteudo = (() => {
    switch (tela) {
      case 'splash':
        return (
          <Splash
            voz={prefs.voz}
            modoLeve={prefs.modoLeve}
            onEntrar={() => setTela(prefs.onboardingFeito ? 'inicio' : 'voz')}
          />
        );
      case 'voz':
        return (
          <TelaVoz
            atual={prefs.voz}
            onConfirmar={(voz) => {
              atualizar({ voz, onboardingFeito: true });
              setTela('inicio');
            }}
          />
        );
      case 'inicio':
        return (
          <Inicio
            prefs={prefs}
            onRezar={() => setTela('misterios')}
            onContinuar={continuarRosario}
            onCalendario={() => setTela('calendario')}
            onLembrete={() => setTela('lembrete')}
          />
        );
      case 'misterios':
        return <Misterios onIniciar={(misterios) => iniciarRosario(misterios)} onVoltar={() => setTela('inicio')} />;
      case 'oracao':
        return sessao ? (
          <Oracao
            voz={prefs.voz}
            misterios={sessao.misterios}
            passoInicial={sessao.passoInicial}
            modoLeve={prefs.modoLeve}
            onProgresso={registrarProgresso}
            onConcluir={concluirDia}
            onSair={() => setTela('inicio')}
          />
        ) : null;
      case 'conclusao':
        return <Conclusao kids={prefs.voz === 'kids'} onInicio={() => setTela('inicio')} />;
      case 'calendario':
        return <Calendario diasRezados={prefs.diasRezados} kids={prefs.voz === 'kids'} />;
      case 'lembrete':
        return (
          <Lembrete
            lembrete={prefs.lembrete}
            onSalvar={(lembrete) => atualizar({ lembrete })}
            onVoltar={() => setTela('inicio')}
          />
        );
      case 'palavra':
        return <Palavra ultimoTrecho={prefs.ultimoTrecho} onEscolher={(ultimoTrecho) => atualizar({ ultimoTrecho })} />;
      case 'ajustes':
        return <Ajustes prefs={prefs} onAlterar={atualizar} onLembrete={() => setTela('lembrete')} />;
    }
  })();

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        <motion.section
          key={tela}
          className={`tela${tela === 'splash' ? ' tela-cheia' : ''}`}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] }}
        >
          {conteudo}
        </motion.section>
      </AnimatePresence>
      {aba && <Nav atual={aba} onIr={(destino) => setTela(destino)} />}
    </div>
  );
}
