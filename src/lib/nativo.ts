// Pontes para recursos nativos do Capacitor. Na web, cada chamada falha em silêncio.
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { KeepAwake } from '@capacitor-community/keep-awake';
import { LocalNotifications } from '@capacitor/local-notifications';
import type { Alerta } from './prefs';

const IDS_LEMBRETE = [0, 1, 2, 3, 4, 5, 6].map((d) => 100 + d);
const ID_PROXIMO = 200;
const TITULO = 'Rosário Guiado';

// No Android, som e vibração pertencem ao canal e não mudam depois de criado: um canal por estilo.
const CANAIS: Record<Alerta, { id: string; name: string; importance: 1 | 2 | 3 | 4 | 5; vibration: boolean }> = {
  som: { id: 'terco-som', name: 'Lembrete com som', importance: 4, vibration: true },
  vibrar: { id: 'terco-vibrar', name: 'Lembrete só com vibração', importance: 2, vibration: true },
  silencioso: { id: 'terco-silencioso', name: 'Lembrete silencioso', importance: 2, vibration: false },
};

export function vibrarLeve(): void {
  Haptics.impact({ style: ImpactStyle.Light }).catch(() => {});
}

export async function manterTela(ativo: boolean): Promise<void> {
  try {
    if (ativo) await KeepAwake.keepAwake();
    else await KeepAwake.allowSleep();
  } catch {
    // Plataforma sem suporte: o celular pode apagar a tela normalmente.
  }
}

export async function pedirPermissaoNotificacao(): Promise<boolean> {
  try {
    const resultado = await LocalNotifications.requestPermissions();
    return resultado.display === 'granted';
  } catch {
    return false;
  }
}

async function canalDoAlerta(alerta: Alerta): Promise<string | undefined> {
  try {
    const canal = CANAIS[alerta];
    await LocalNotifications.createChannel({ ...canal, description: 'Lembretes para rezar' });
    return canal.id;
  } catch {
    // Fora do Android não há canais.
    return undefined;
  }
}

/** Reagenda o lembrete semanal. Passe `dias` vazio para cancelar. */
export async function agendarLembrete(hora: number, minuto: number, dias: number[], alerta: Alerta): Promise<void> {
  try {
    await LocalNotifications.cancel({ notifications: IDS_LEMBRETE.map((id) => ({ id })) });
    if (dias.length === 0) return;
    const channelId = await canalDoAlerta(alerta);
    await LocalNotifications.schedule({
      notifications: dias.map((dia) => ({
        id: 100 + dia,
        title: TITULO,
        body: 'Vamos rezar o terço?',
        channelId,
        schedule: {
          // Capacitor usa 1 = domingo ... 7 = sábado.
          on: { weekday: dia + 1, hour: hora, minute: minuto },
          repeats: true,
          allowWhileIdle: true,
        },
      })),
    });
  } catch {
    // Sem permissão ou sem suporte: a tela informa o usuário.
  }
}

/** Lembrete único para o próximo terço. Devolve false se não foi possível agendar. */
export async function agendarProximo(quando: Date, alerta: Alerta): Promise<boolean> {
  try {
    if (quando.getTime() <= Date.now()) return false;
    const channelId = await canalDoAlerta(alerta);
    await LocalNotifications.cancel({ notifications: [{ id: ID_PROXIMO }] });
    await LocalNotifications.schedule({
      notifications: [
        {
          id: ID_PROXIMO,
          title: TITULO,
          body: 'Está na hora do seu momento de oração.',
          channelId,
          schedule: { at: quando, allowWhileIdle: true },
        },
      ],
    });
    return true;
  } catch {
    return false;
  }
}
