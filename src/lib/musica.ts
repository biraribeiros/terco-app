// Trilha de abertura: toca baixinho, em laço, e baixa ou some com suavidade.

const ARQUIVO = `${import.meta.env.BASE_URL}audio/musica/manha-de-graca.mp3`;

export const VOLUME_TRILHA = 0.16;
export const VOLUME_SOB_VOZ = 0.08;

class Musica {
  private audio: HTMLAudioElement | null = null;
  private fade: number | null = null;
  private aguardandoToque = false;

  private garantir(): HTMLAudioElement {
    if (!this.audio) {
      const audio = new Audio(ARQUIVO);
      audio.loop = true;
      audio.volume = 0;
      this.audio = audio;
    }
    return this.audio;
  }

  /** Começa (ou retoma) a trilha e leva o volume ao alvo. */
  iniciar(volume = VOLUME_TRILHA): void {
    const audio = this.garantir();
    this.ir(volume, 1500);
    if (!audio.paused) return;
    audio.play().catch(() => {
      // O sistema pode exigir um toque antes de tocar: tenta de novo no primeiro toque.
      if (this.aguardandoToque) return;
      this.aguardandoToque = true;
      const retomar = () => {
        this.aguardandoToque = false;
        window.removeEventListener('pointerdown', retomar);
        void audio.play().catch(() => {});
      };
      window.addEventListener('pointerdown', retomar, { once: true });
    });
  }

  /** Muda o volume aos poucos. */
  ir(volume: number, ms = 1200): void {
    const audio = this.audio;
    if (!audio) return;
    if (this.fade !== null) window.clearInterval(this.fade);
    const inicio = audio.volume;
    const passos = Math.max(1, Math.round(ms / 50));
    let i = 0;
    this.fade = window.setInterval(() => {
      i++;
      audio.volume = Math.min(1, Math.max(0, inicio + ((volume - inicio) * i) / passos));
      if (i >= passos && this.fade !== null) {
        window.clearInterval(this.fade);
        this.fade = null;
      }
    }, 50);
  }

  /** Apaga a trilha aos poucos e pausa. */
  parar(ms = 1500): void {
    const audio = this.audio;
    if (!audio || audio.paused) return;
    this.ir(0, ms);
    window.setTimeout(() => {
      if (audio.volume < 0.01) audio.pause();
    }, ms + 100);
  }
}

export const musica = new Musica();
