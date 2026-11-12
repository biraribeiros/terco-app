import { useEffect, useMemo, useState } from 'react';
import { Terco } from '../components/Terco';
import type { EstiloTerco } from '../lib/estilos';
import { fraseDoDia } from '../lib/frases';
import { narrador } from '../lib/narrador';
import type { Voz } from '../lib/prefs';
import { EscolhaVoz } from './Voz';

interface Props {
  nomeSalvo: string;
  vozSalva: Voz;
  modoLeve: boolean;
  estilo: EstiloTerco;
  /** Primeiro acesso: pede nome e voz. */
  primeiroAcesso: boolean;
  onEntrar: (nome: string, voz: Voz) => void;
}

export function Abertura({ nomeSalvo, vozSalva, modoLeve, estilo, primeiroAcesso, onEntrar }: Props) {
  const frase = useMemo(() => fraseDoDia(), []);
  const [etapa, setEtapa] = useState<'frase' | 'perfil'>('frase');
  const [nome, setNome] = useState(nomeSalvo);
  const [voz, setVoz] = useState<Voz>(vozSalva);
  const [erro, setErro] = useState(false);

  // Amostras de voz não devem continuar tocando depois desta tela.
  useEffect(() => () => narrador.parar(), []);

  if (etapa === 'perfil') {
    const entrar = () => {
      if (nome.trim() === '') {
        setErro(true);
        return;
      }
      onEntrar(nome.trim(), voz);
    };
    return (
      <div className="abertura">
        <label className="campo">
          <span className="titulo-cartao">Como podemos chamar você?</span>
          <input
            type="text"
            className="entrada"
            value={nome}
            maxLength={40}
            autoComplete="given-name"
            placeholder="Seu nome"
            onChange={(e) => {
              setNome(e.target.value);
              setErro(false);
            }}
          />
          {erro && (
            <span role="alert" className="erro">
              Escreva um nome para continuar.
            </span>
          )}
        </label>
        <div className="campo">
          <span className="titulo-cartao">Qual voz vai guiar a sua reza?</span>
          <EscolhaVoz atual={voz} onEscolher={setVoz} />
        </div>
        <button type="button" className="btn btn-primario" onClick={entrar}>
          Entrar
        </button>
      </div>
    );
  }

  return (
    <div className="abertura abertura-capa">
      <div className="abertura-topo">
        <div className="abertura-cena">
          <Terco acesas={[]} atual={-1} foco={null} girando modoLeve={modoLeve} estilo={estilo} />
        </div>
        <h1 className="titulo-display">Rosário Guiado</h1>
        <p className="assinatura">Reze • Medite • Contemple</p>
      </div>

      <figure className="vidro frase-dia">
        <figcaption className="texto-pequeno">Frase do dia</figcaption>
        <blockquote>{frase}</blockquote>
      </figure>

      <button
        type="button"
        className="btn btn-primario"
        onClick={() => (primeiroAcesso ? setEtapa('perfil') : onEntrar(nomeSalvo, vozSalva))}
      >
        {primeiroAcesso ? 'Continuar' : 'Entrar'}
      </button>
    </div>
  );
}
