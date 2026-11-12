// Pontes para recursos nativos do Capacitor. Na web, cada chamada falha em silêncio.
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { KeepAwake } from '@capacitor-community/keep-awake';
import { LocalNotifications } from '@capacitor/local-notifications';

const IDS_LEMBRETE = [0, 1, 2, 3, 4, 5, 6].map((d) => 100 + d);

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

/** Reagenda o lembrete semanal. Passe `dias` vazio para cancelar. */
export async function agendarLembrete(hora: number, minuto: number, dias: number[]): Promise<void> {
  try {
    await LocalNotifications.cancel({ notifications: IDS_LEMBRETE.map((id) => ({ id })) });
    if (dias.length === 0) return;
    await LocalNotifications.schedule({
      notifications: dias.map((dia) => ({
        id: 100 + dia,
        title: 'Terço',
        body: 'Vamos rezar o terço?',
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
