import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import './styles/app.css';
import logoBranco from './assets/rosario-guiado_branco.svg';
import logoPreto from './assets/rosario-guiado_preto.svg';
import { Nav, type Aba } from './components/Nav';
import { DIAS_NOVENA, hojeISO, horaTexto, carregarPrefs, salvarPrefs, type Prefs, type Tipo } from './lib/prefs';
import { musica } from './lib/musica';
import { agendarLembrete } from './lib/nativo';
import { tituloDaOracao } from './lib/passos';
import { MISTERIOS, type Misterio } from './data/roteiro';
import { Abertura } from './screens/Abertura';
import { Intencao } from './screens/Intencao';
import { Novena } from './screens/Novena';
import { Tipo as TelaTipo } from './screens/Tipo';
import { Misterios } from './screens/Misterios';
import { BoasVindas } from './screens/BoasVindas';
import { Oracao } from './screens/Oracao';
import { Bencao } from './screens/Bencao';
import { Conclusao } from './screens/Conclusao';
import { Calendario } from './screens/Calendario';
import { Lembrete } from './screens/Lembrete';
import { Palavra } from './screens/Palavra';
import { Ajustes } from './screens/Ajustes';

type Tela =
  | 'abertura'
  | 'novena'
  | 'intencao'
  | 'tipo'
  | 'misterios'
  | 'boasvindas'
  | 'oracao'
  | 'bencao'
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
  /** A sessão conta como um dia da novena. */
  novena: boolean;
}

export function App() {
  const [prefs, setPrefs] = useState<Prefs | null>(null);
  const [tela, setTela] = useState<Tela>('abertura');
  const [intencao, setIntencao] = useState('');
  const [tipo, setTipo] = useState<Tipo>('terco');
  const [sessao, setSessao] = useState<Sessao | null>(null);
  const [emNovena, setEmNovena] = useState(false);
  const [resultadoNovena, setResultadoNovena] = useState<{ dia: number; concluida: boolean } | null>(null);

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
    setSessao({ misterios, tipo, intencao, passoInicial: 0, novena: emNovena });
    setTela('boasvindas');
  };

  const continuarOracao = () => {
    if (!prefs?.progresso) return;
    const { chaves, tipo: tipoSalvo, intencao: intencaoSalva, passo, novena } = prefs.progresso;
    const misterios = chaves
      .map((chave) => MISTERIOS.find((m) => m.chave === chave))
      .filter((m): m is Misterio => m !== undefined);
    if (misterios.length === 0) return;
    setSessao({ misterios, tipo: tipoSalvo, intencao: intencaoSalva, passoInicial: passo, novena });
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
          novena: sessao.novena,
          passo,
        },
      });
    },
    [sessao, atualizar],
  );

  const concluirOracao = () => {
    if (!prefs || !sessao) return;
    const hoje = hojeISO();
    let titulo = tituloDaOracao(sessao.tipo, sessao.misterios);
    let novena = prefs.novena;
    let resultado: { dia: number; concluida: boolean } | null = null;
    if (sessao.novena) {
      const dias = novena?.dias ?? [];
      const novosDias = dias.includes(hoje) ? dias : [...dias, hoje];
      const concluida = novosDias.length >= DIAS_NOVENA;
      resultado = { dia: Math.min(novosDias.length, DIAS_NOVENA), concluida };
      titulo = `${titulo} · novena, dia ${resultado.dia}`;
      novena = concluida ? null : { intencao: novena?.intencao ?? sessao.intencao, dias: novosDias };
    }
    setResultadoNovena(resultado);
    atualizar({
      novena,
      diasRezados: prefs.diasRezados.includes(hoje) ? prefs.diasRezados : [...prefs.diasRezados, hoje],
      historico: [
        ...prefs.historico,
        {
          id: String(Date.now()),
          data: hoje,
          hora: horaTexto(),
          titulo,
          intencao: sessao.intencao,
        },
      ],
      progresso: null,
    });
    setTela('bencao');
  };

  // O estilo do alerta vale também para o lembrete semanal, que é reagendado com ele.
  const trocarAlerta = (alerta: Prefs['alerta']) => {
    if (!prefs) return;
    atualizar({ alerta });
    const { ativo, hora, minuto, dias } = prefs.lembrete;
    if (ativo) void agendarLembrete(hora, minuto, dias, alerta);
  };

  const voltarAoInicio = () => {
    setIntencao('');
    setEmNovena(false);
    setResultadoNovena(null);
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
              setEmNovena(false);
              setTela(prefs.novena ? 'novena' : 'intencao');
            }}
          />
        );
      case 'novena': {
        const dias = prefs.novena?.dias ?? [];
        return (
          <Novena
            intencao={prefs.novena?.intencao ?? ''}
            dias={dias}
            dia={Math.min(dias.includes(hojeISO()) ? dias.length : dias.length + 1, DIAS_NOVENA)}
            onContinuar={() => {
              setIntencao(prefs.novena?.intencao ?? '');
              setEmNovena(true);
              setTela('tipo');
            }}
            onRecomecar={() => {
              atualizar({ novena: { intencao: prefs.novena?.intencao ?? '', dias: [] } });
              setIntencao(prefs.novena?.intencao ?? '');
              setEmNovena(true);
              setTela('tipo');
            }}
          />
        );
      }
      case 'intencao':
        return (
          <Intencao
            nome={prefs.nome}
            temProgresso={prefs.progresso !== null}
            podeNovena={prefs.novena === null}
            onContinuar={(texto, comoNovena) => {
              setIntencao(texto);
              setEmNovena(comoNovena);
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
        return <BoasVindas
            voz={prefs.voz}
            velocidade={prefs.velocidade}
            onVelocidade={(velocidade) => atualizar({ velocidade })}
            onComecar={() => setTela('oracao')}
          />;
      case 'oracao':
        return sessao ? (
          <Oracao
            voz={prefs.voz}
            misterios={sessao.misterios}
            intencao={sessao.intencao}
            passoInicial={sessao.passoInicial}
            modoLeve={prefs.modoLeve}
            estilo={prefs.estiloTerco}
            velocidade={prefs.velocidade}
            onVelocidade={(velocidade) => atualizar({ velocidade })}
            onProgresso={registrarProgresso}
            onConcluir={concluirOracao}
            onSair={() => setTela('intencao')}
          />
        ) : null;
      case 'bencao':
        return <Bencao onFim={() => setTela('conclusao')} />;
      case 'conclusao':
        return (
          <Conclusao
            kids={prefs.voz === 'kids'}
            nome={prefs.nome}
            alerta={prefs.alerta}
            onAlerta={trocarAlerta}
            novena={resultadoNovena}
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
            onAlerta={trocarAlerta}
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
      {tela !== 'abertura' && tela !== 'bencao' && (
        <header className={`topo-logo${tela === 'tipo' || tela === 'misterios' || tela === 'boasvindas' || tela === 'conclusao' ? ' topo-logo-grande' : ''}`} aria-hidden="true">
          <img className="logo-branco" src={logoBranco} alt="" />
          <img className="logo-preto" src={logoPreto} alt="" />
        </header>
      )}
      <AnimatePresence mode="wait">
        <motion.section
          key={tela}
          className={`tela${tela === 'tipo' || tela === 'misterios' ? ' tela-centro' : ''}`}
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
