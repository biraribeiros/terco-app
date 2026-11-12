interface Item<T extends string> {
  id: T;
  rotulo: string;
}

/** Abas em forma de pílulas: uma seção por vez, para a tela caber sem rolagem. */
export function Abas<T extends string>({
  itens,
  atual,
  onTrocar,
}: {
  itens: Item<T>[];
  atual: T;
  onTrocar: (id: T) => void;
}) {
  return (
    <div className="abas" role="group" aria-label="Seções">
      {itens.map((item) => (
        <button
          key={item.id}
          type="button"
          className="chip chip-compacto"
          aria-pressed={item.id === atual}
          onClick={() => onTrocar(item.id)}
        >
          {item.rotulo}
        </button>
      ))}
    </div>
  );
}
