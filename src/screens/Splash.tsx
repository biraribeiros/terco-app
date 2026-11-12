import { useEffect } from 'react';
import { BOAS_VINDAS } from '../data/roteiro';
import { narrador, urlAudio } from '../lib/narrador';
import type { Voz } from '../lib/prefs';
import { Terco } from '../components/Terco';

export function Splash({ voz, modoLeve, onEntrar }: { voz: Voz; modoLeve: boolean; onEntrar: () => void }) {
  useEffect(() => {
    narrador.tocar(urlAudio(`${voz}/boas-vindas.mp3`), () => {});
    return () => narrador.parar();
  }, [voz]);

  return (
    <button type="button" className="splash" onClick={onEntrar}>
      <div className="splash-cena">
        <Terco acesas={[]} atual={-1} foco={null} girando modoLeve={modoLeve} />
      </div>
      <h1 className="titulo-display">Terço</h1>
      <p className="texto-lead">{BOAS_VINDAS[voz]}</p>
      <span className="dica">Toque para entrar</span>
    </button>
  );
}
