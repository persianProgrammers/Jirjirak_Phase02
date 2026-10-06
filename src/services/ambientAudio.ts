/**
 * Ambient Audio Service for Jirjirak
 * پخش موزیک اختصاصی جیرجیرک (jirjirak-music.mp3) برای وب‌سایت در هر دو حالت روز و شب
 */

class AmbientAudioService {
  private audioElement: HTMLAudioElement | null = null;
  private isCurrentlyPlaying = false;
  private fadeInterval: number | null = null;
  private targetVolume = 0.55;

  private readonly MUSIC_TRACK = '/assets/audio/jirjirak-music.mp3';

  private getAudio(): HTMLAudioElement {
    if (!this.audioElement) {
      this.audioElement = new Audio();
      this.audioElement.loop = true;
      this.audioElement.preload = 'auto';
      this.audioElement.src = this.MUSIC_TRACK;
    }
    return this.audioElement;
  }

  public play(_isNight?: boolean) {
    const audio = this.getAudio();

    if (!audio.src || !audio.src.includes('jirjirak-music.mp3')) {
      audio.src = this.MUSIC_TRACK;
      audio.currentTime = 0;
    }

    this.isCurrentlyPlaying = true;
    audio.volume = 0;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.fadeIn(audio, this.targetVolume);
        })
        .catch((err) => {
          console.warn('[AmbientAudio] Autoplay prevented or error:', err);
          this.isCurrentlyPlaying = false;
        });
    }
  }

  public stop() {
    this.isCurrentlyPlaying = false;
    if (!this.audioElement) return;

    this.fadeOut(this.audioElement, () => {
      if (this.audioElement) {
        this.audioElement.pause();
      }
    });
  }

  public setNightMode(_isNight: boolean) {
    // طبق خواسته کاربر: همان موزیک واحد در روز و شب بدون قطع شدن ادامه پیدا می‌کند
  }

  private fadeIn(audio: HTMLAudioElement, targetVol: number) {
    if (this.fadeInterval) clearInterval(this.fadeInterval);
    const step = 0.05;
    this.fadeInterval = window.setInterval(() => {
      if (audio.volume < targetVol - step) {
        audio.volume += step;
      } else {
        audio.volume = targetVol;
        if (this.fadeInterval) clearInterval(this.fadeInterval);
      }
    }, 50);
  }

  private fadeOut(audio: HTMLAudioElement, onComplete: () => void) {
    if (this.fadeInterval) clearInterval(this.fadeInterval);
    const step = 0.08;
    this.fadeInterval = window.setInterval(() => {
      if (audio.volume > step) {
        audio.volume -= step;
      } else {
        audio.volume = 0;
        if (this.fadeInterval) clearInterval(this.fadeInterval);
        onComplete();
      }
    }, 40);
  }
}

export const ambientAudio = new AmbientAudioService();

