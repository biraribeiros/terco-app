// Reprodução da voz guia. Um único áudio por vez.

export function urlAudio(rel: string): string {
  return `${import.meta.env.BASE_URL}audio/${rel}`;
}

export class Narrador {
  private audio: HTMLAudioElement | null = null;
  private ultimo: { src: string; onFim: () => void } | null = null;
  private velocidade = 1;

  /** Velocidade da voz, valendo para o áudio atual e os próximos. A voz mantém o tom. */
  definirVelocidade(velocidade: number): void {
    this.velocidade = velocidade;
    if (this.audio) this.audio.playbackRate = velocidade;
  }

  tocar(src: string, onFim: () => void): void {
    this.parar();
    const audio = new Audio(src);
    audio.preservesPitch = true;
    audio.playbackRate = this.velocidade;
    audio.onended = () => onFim();
    // Se o arquivo faltar, o passo fica parado e o usuário avança tocando no botão.
    audio.onerror = () => console.warn('Áudio não encontrado:', src);
    this.audio = audio;
    this.ultimo = { src, onFim };
    audio.play().catch(() => {
      // Reprodução bloqueada pelo sistema: o usuário pode avançar manualmente.
    });
  }

  /** Quanto do áudio atual já foi falado (0 a 1), ou null se não há áudio carregado. */
  fracao(): number | null {
    const audio = this.audio;
    if (!audio || !Number.isFinite(audio.duration) || audio.duration <= 0) return null;
    return Math.min(1, audio.currentTime / audio.duration);
  }

  pausar(): void {
    this.audio?.pause();
  }

  retomar(): void {
    if (this.audio && !this.audio.ended) {
      this.audio.play().catch(() => {});
      return;
    }
    if (this.ultimo) this.tocar(this.ultimo.src, this.ultimo.onFim);
  }

  parar(): void {
    if (this.audio) {
      this.audio.onended = null;
      this.audio.onerror = null;
      this.audio.pause();
    }
    this.audio = null;
  }
}

export const narrador = new Narrador();
