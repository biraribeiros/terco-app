import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import './styles/app.css';
import { Nav, type Aba } from './components/Nav';
import { hojeISO, horaTexto, carregarPrefs, salvarPrefs, type Prefs, type Tipo } from './lib/prefs';
import { musica } from './lib/musica';
import { tituloDaOracao } from './lib/passos';
import { MISTERIOS, type Misterio } from './data/roteiro';
import { Abertura } from './screens/Abertura';
import { Intencao } from './screens/Intencao';
import { Tipo as TelaTipo } from './screens/Tipo';
import { Misterios } from './screens/Misterios';
import { BoasVindas } from './screens/BoasVindas';
import { Oracao } from './screens/Oracao';
import { Conclusao } from './screens/Conclusao';
import { Calendario } from './screens/Calendario';
import { Lembrete } from './screens/Lembrete';
import { Palavra } from './screens/Palavra';
import { Ajustes } from './screens/Ajustes';

type Tela =
  | 'abertura'
  | 'intencao'
  | 'tipo'
  | 'misterios'
  | 'boasvindas'
  | 'oracao'
  | 'conclusao'
  | 'calendario'
  | 'lembrete'
  | 'palavra'
  | 'ajustes';

const ABAS: Tela[] = ['intencao', 'calendario', 'palavra', 'ajustes'];
/** Telas em que a trilha de abertura toca baixinho. */
const TELAS_COM_MUSICA: Tela[] = ['abertura', 'intencao', 'tipo', 'misterios'];

interface Sessao {
  misterios: Misterio[];
  tipo: Tipo;
  intencao: string;
  passoInicial: number;
}

export function App() {
  const [prefs, setPrefs] = useState<Prefs | null>(null);
  const [tela, setTela] = useState<Tela>('abertura');
  const [intencao, setIntencao] = useState('');
  const [tipo, setTipo] = useState<Tipo>('terco');
  const [sessao, setSessao] = useState<Sessao | null>(null);

  useEffect(() => {
    void carregarPrefs().then(setPrefs);
  }, []);

  // Salva sempre que as preferências mudam.
  useEffect(() => {
    if (prefs) void salvarPrefs(prefs);
  }, [prefs]);

  // Tema Kids, tamanho do texto, movimento e modo leve refletidos no documento.
  useEffect(() => {
    if (!prefs) return;
    const raiz = document.documentElement;
    raiz.dataset.theme = prefs.voz === 'kids' ? 'kids' : '';
    raiz.dataset.leve = prefs.modoLeve ? 'true' : 'false';
    raiz.style.setProperty('--text-scale', String(prefs.tamanhoTexto));
    raiz.style.setProperty('--duration-screen', prefs.reduzirMovimento ? '200ms' : '350ms');
    raiz.style.setProperty('--duration-slow', prefs.reduzirMovimento ? '200ms' : '450ms');
  }, [prefs]);

  // Trilha: baixinha na abertura e na escolha da oração; some quando a reza começa.
  // Na tela de boas-vindas, a própria tela ajusta o volume sob a voz.
  const musicaAtiva = prefs?.musica ?? false;
  useEffect(() => {
    if (prefs === null) return;
    if (tela === 'boasvindas') return;
    if (musicaAtiva && TELAS_COM_MUSICA.includes(tela)) musica.iniciar();
    else musica.parar();
  }, [tela, musicaAtiva, prefs === null]);

  const atualizar = useCallback((parcial: Partial<Prefs>) => {
    setPrefs((atual) => (atual ? { ...atual, ...parcial } : atual));
  }, []);

  const iniciarSessao = (misterios: Misterio[]) => {
    setSessao({ misterios, tipo, intencao, passoInicial: 0 });
    setTela('boasvindas');
  };

  const continuarOracao = () => {
    if (!prefs?.progresso) return;
    const { chaves, tipo: tipoSalvo, intencao: intencaoSalva, passo } = prefs.progresso;
    const misterios = chaves
      .map((chave) => MISTERIOS.find((m) => m.chave === chave))
      .filter((m): m is Misterio => m !== undefined);
    if (misterios.length === 0) return;
    setSessao({ misterios, tipo: tipoSalvo, intencao: intencaoSalva, passoInicial: passo });
    setTela('oracao');
  };

  const registrarProgresso = useCallback(
    (passo: number) => {
      if (!sessao || sessao.misterios.length === 0) return;
      atualizar({
        progresso: {
          chaves: sessao.misterios.map((m) => m.chave),
          tipo: sessao.tipo,
          intencao: sessao.intencao,
          passo,
        },
      });
    },
    [sessao, atualizar],
  );

  const concluirOracao = () => {
    if (!prefs || !sessao) return;
    const hoje = hojeISO();
    atualizar({
      diasRezados: prefs.diasRezados.includes(hoje) ? prefs.diasRezados : [...prefs.diasRezados, hoje],
      historico: [
        ...prefs.historico,
        {
          id: String(Date.now()),
          data: hoje,
          hora: horaTexto(),
          titulo: tituloDaOracao(sessao.tipo, sessao.misterios),
          intencao: sessao.intencao,
        },
      ],
      progresso: null,
    });
    setTela('conclusao');
  };

  const voltarAoInicio = () => {
    setIntencao('');
    setTela('intencao');
  };

  if (!prefs) return null;

  const aba: Aba | null = ABAS.includes(tela) ? (tela as Aba) : null;

  const conteudo = (() => {
    switch (tela) {
      case 'abertura':
        return (
          <Abertura
            nomeSalvo={prefs.nome}
            vozSalva={prefs.voz}
            modoLeve={prefs.modoLeve}
            estilo={prefs.estiloTerco}
            primeiroAcesso={!prefs.onboardingFeito}
            onEntrar={(nome, voz) => {
              if (!prefs.onboardingFeito) atualizar({ nome, voz, onboardingFeito: true });
              setTela('intencao');
            }}
          />
        );
      case 'intencao':
        return (
          <Intencao
            nome={prefs.nome}
            temProgresso={prefs.progresso !== null}
            onContinuar={(texto) => {
              setIntencao(texto);
              setTela('tipo');
            }}
            onRetomar={continuarOracao}
          />
        );
      case 'tipo':
        return (
          <TelaTipo
            onEscolher={(escolhido) => {
              setTipo(escolhido);
              setTela('misterios');
            }}
            onVoltar={() => setTela('intencao')}
          />
        );
      case 'misterios':
        return <Misterios tipo={tipo} onIniciar={iniciarSessao} onVoltar={() => setTela('tipo')} />;
      case 'boasvindas':
        return <BoasVindas voz={prefs.voz} onComecar={() => setTela('oracao')} />;
      case 'oracao':
        return sessao ? (
          <Oracao
            voz={prefs.voz}
            misterios={sessao.misterios}
            intencao={sessao.intencao}
            passoInicial={sessao.passoInicial}
            modoLeve={prefs.modoLeve}
            estilo={prefs.estiloTerco}
            onProgresso={registrarProgresso}
            onConcluir={concluirOracao}
            onSair={() => setTela('intencao')}
          />
        ) : null;
      case 'conclusao':
        return (
          <Conclusao
            kids={prefs.voz === 'kids'}
            nome={prefs.nome}
            alerta={prefs.alerta}
            horaLembrete={prefs.lembrete.hora}
            minutoLembrete={prefs.lembrete.minuto}
            onInicio={voltarAoInicio}
          />
        );
      case 'calendario':
        return <Calendario diasRezados={prefs.diasRezados} historico={prefs.historico} kids={prefs.voz === 'kids'} />;
      case 'lembrete':
        return (
          <Lembrete
            lembrete={prefs.lembrete}
            alerta={prefs.alerta}
            onSalvar={(lembrete) => atualizar({ lembrete })}
            onVoltar={() => setTela('ajustes')}
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
          className="tela"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] }}
        >
          {conteudo}
        </motion.section>
      </AnimatePresence>
      {aba && <Nav atual={aba} onIr={(destino) => setTela(destino)} />}
    </div>
  );
}
