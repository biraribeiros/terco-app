// Reprodução da voz guia. Um único áudio por vez.

export function urlAudio(rel: string): string {
  return `${import.meta.env.BASE_URL}audio/${rel}`;
}

export class Narrador {
  private audio: HTMLAudioElement | null = null;
  private ultimo: { src: string; onFim: () => void } | null = null;

  tocar(src: string, onFim: () => void): void {
    this.parar();
    const audio = new Audio(src);
    audio.onended = () => onFim();
    // Se o arquivo faltar, o passo fica parado e o usuário avança tocando no botão.
    audio.onerror = () => console.warn('Áudio não encontrado:', src);
    this.audio = audio;
    this.ultimo = { src, onFim };
    audio.play().catch(() => {
      // Reprodução bloqueada pelo sistema: o usuário pode avançar manualmente.
    });
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
