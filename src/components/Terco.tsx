import { useMemo } from 'react';
import { Rosario2D } from './Rosario2D';
import { Rosario3D, type RosarioProps } from './Rosario3D';

let suporteWebGL: boolean | null = null;

function temWebGL(): boolean {
  if (suporteWebGL === null) {
    try {
      const canvas = document.createElement('canvas');
      suporteWebGL = !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
    } catch {
      suporteWebGL = false;
    }
  }
  return suporteWebGL;
}

interface TercoProps extends RosarioProps {
  modoLeve?: boolean;
}

/** Escolhe a versão 3D ou a 2D (modo leve ou aparelho sem WebGL). */
export function Terco({ modoLeve = false, acesas, atual, foco, girando, estilo }: TercoProps) {
  const usar3D = useMemo(() => !modoLeve && temWebGL(), [modoLeve]);
  return (
    <div
      className="cena"
      role="img"
      aria-label={`Terço: ${acesas.length} de 59 contas rezadas`}
    >
      {usar3D ? (
        <Rosario3D acesas={acesas} atual={atual} foco={foco} girando={girando} estilo={estilo} />
      ) : (
        <Rosario2D acesas={acesas} atual={atual} foco={foco} estilo={estilo} />
      )}
    </div>
  );
}
