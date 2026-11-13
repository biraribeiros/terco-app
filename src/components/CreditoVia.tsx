import viaBranco from '../assets/via-ai_branco.svg';
import viaPreto from '../assets/via-ai_preto.svg';

/** Crédito discreto: logo Via.ai (link para via.dev.br) e "Desenvolvido por Bira Ribeiro". */
export function CreditoVia() {
  return (
    <a className="credito-via" href="https://via.dev.br" target="_blank" rel="noopener noreferrer" aria-label="Desenvolvido por Bira Ribeiro, Via.ai (abre via.dev.br)">
      <img className="logo-branco" src={viaBranco} alt="" aria-hidden="true" />
      <img className="logo-preto" src={viaPreto} alt="" aria-hidden="true" />
      <span>Desenvolvido por Bira Ribeiro</span>
    </a>
  );
}
