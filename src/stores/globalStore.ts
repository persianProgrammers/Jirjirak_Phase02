import { create } from 'zustand';
import { ambientAudio } from '../services/ambientAudio';
import { Logo3DStyleId } from '../components/ui/logo-3d/types';

export type LandingLayoutMode = 'classic' | 'zigzag' | 'editorial';

interface GlobalState {
  isWorldLoaded: boolean;
  setWorldLoaded: (loaded: boolean) => void;
  
  // 3D Logo Configuration (Preserved for future Admin Studio Panel)
  logo3dStyle: Logo3DStyleId;
  setLogo3dStyle: (style: Logo3DStyleId) => void;

  // Landing Page Architectural Layout Mode ('classic' | 'zigzag' | 'editorial')
  landingLayoutMode: LandingLayoutMode;
  setLandingLayoutMode: (mode: LandingLayoutMode) => void;

  // Filter Design Model (20 Creative Variations)
  filterModelId: string;
  setFilterModelId: (modelId: string) => void;

  // Theme State
  isNight: boolean;
  setIsNight: (night: boolean) => void;
  toggleNight: () => void;
  
  // Icon animation preview state (allows button animations to complete visually BEFORE page theme changes)
  iconNightPreview: boolean;

  // Language State
  currentLang: 'EN' | 'FA';
  setLang: (lang: 'EN' | 'FA') => void;
  toggleLang: () => void;
  
  // Language animation preview state (allows keycap flip animation to finish visually BEFORE layout changes)
  iconLangPreview: 'EN' | 'FA';

  // Audio State (Original Gramophone)
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  togglePlay: () => void;

  // Story / Library Architectural Icon Model ('ancient-codex' | 'library-rotunda' | 'mechanical-quill' | 'archival-lantern' | 'cinema-projector')
  storyIconModel: string;
  setStoryIconModel: (id: string) => void;

  // Screen Transition State
  transitionPhase: 'idle' | 'covering' | 'paused' | 'uncovering';
  transitionLang?: 'EN' | 'FA';
  triggerTransition: (action: () => void, targetLang?: 'EN' | 'FA') => void;
}

export const useGlobalStore = create<GlobalState>((set, get) => ({
  isWorldLoaded: false,
  setWorldLoaded: (loaded) => set({ isWorldLoaded: loaded }),

  // =========================================================================
  // ⚠️ اخطار بسیار مهم سیستمی (CRITICAL PRESERVATION NOTICE)
  // به هیچ‌عنوان هیچ دستیار هوش مصنوعی (AI) یا برنامه‌نویسی حق ندارد استایل‌های
  // سه‌بعدی و شیشه‌ای لوگوی جیرجیرک را پاک کند، تا زمانی که تایید صریح و مستقیم
  // از کارفرما گرفته نشده باشد. این استایل‌ها برای فعال‌سازی مجدد و سوییچ در
  // پنل ادمین که در آینده ساخته خواهد شد کاملاً رزرو و ذخیره شده‌اند.
  // =========================================================================
  logo3dStyle: (() => {
    if (typeof window === 'undefined') return 'glass-crystal-prism';
    const stored = localStorage.getItem('jirjirak_logo_3d_style') as Logo3DStyleId;
    const validStyles: Logo3DStyleId[] = [
      'classic-flat',
      'glass-frosted-neon',
      'glass-crystal-prism',
      'glass-tinted-smoked',
      'glass-liquid-gloss',
      'glass-architectural-fluted'
    ];
    return validStyles.includes(stored) ? stored : 'glass-crystal-prism';
  })(),
  setLogo3dStyle: (style: Logo3DStyleId) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('jirjirak_logo_3d_style', style);
    }
    set({ logo3dStyle: style });
  },

  // Story / Library Icon Model (Default to rolling-ladder)
  storyIconModel: typeof window !== 'undefined' ? localStorage.getItem('jirjirak_story_icon') || 'rolling-ladder' : 'rolling-ladder',
  setStoryIconModel: (id: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('jirjirak_story_icon', id);
    }
    set({ storyIconModel: id });
  },

  // Landing Page Architectural Layout Mode
  landingLayoutMode: ((typeof window !== 'undefined' && localStorage.getItem('jirjirak_layout_mode')) as LandingLayoutMode) || 'classic',
  setLandingLayoutMode: (mode) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('jirjirak_layout_mode', mode);
    }
    set({ landingLayoutMode: mode });
  },

  // Curated Filter Models State (Model 05 - Floating Island)
  filterModelId: (() => {
    if (typeof window === 'undefined') return 'model-05';
    const stored = localStorage.getItem('jirjirak_filter_model');
    if (stored === 'model-05' || stored === 'model-01' || stored === 'model-17') {
      return 'model-05';
    }
    return 'model-05';
  })(),
  setFilterModelId: (modelId: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('jirjirak_filter_model', modelId);
    }
    set({ filterModelId: modelId });
  },

  // Theme
  isNight: true,
  iconNightPreview: true,
  setIsNight: (night) => {
    set({ isNight: night, iconNightPreview: night });
    ambientAudio.setNightMode(night);
  },
  toggleNight: () => {
    if (get().transitionPhase !== 'idle') return;
    const nextNight = !get().isNight;
    
    // 1. Immediately toggle the button icon preview state!
    // The button flips, celestial gears rotate, and the animation finishes smoothly in front of the user
    set({ iconNightPreview: nextNight });

    // 2. Wait 550ms for the button's spring flip & gear rotation animation to fully complete
    setTimeout(() => {
      // 3. Now start the full-screen curtain transition.
      // The theme colors and layout changes will ONLY apply once the curtain is fully closed!
      get().triggerTransition(() => {
        set({ isNight: nextNight });
        ambientAudio.setNightMode(nextNight);
      }, get().currentLang);
    }, 550);
  },

  // Language (Default English)
  currentLang: 'EN',
  iconLangPreview: 'EN',
  setLang: (lang) => set({ currentLang: lang, iconLangPreview: lang }),
  toggleLang: () => {
    if (get().transitionPhase !== 'idle') return;
    const nextLang = get().currentLang === 'FA' ? 'EN' : 'FA';

    // 1. Immediately toggle the button icon preview state!
    // The typewriter keycap flips 180 degrees with spring physics and the outer gear rotates
    set({ iconLangPreview: nextLang });

    // 2. Wait 550ms for the keycap flip animation to finish cleanly
    setTimeout(() => {
      // 3. Now trigger the transition curtain.
      // Layout, direction (RTL/LTR) and texts will ONLY apply when curtain is fully covering the screen!
      get().triggerTransition(() => {
        set({ currentLang: nextLang });
      }, nextLang);
    }, 550);
  },

  // Audio Playback
  isPlaying: false,
  setIsPlaying: (playing: boolean) => {
    if (playing) {
      ambientAudio.play(get().isNight);
    } else {
      ambientAudio.stop();
    }
    set({ isPlaying: playing });
  },
  togglePlay: () => {
    const nextPlaying = !get().isPlaying;
    if (nextPlaying) {
      ambientAudio.play(get().isNight);
    } else {
      ambientAudio.stop();
    }
    set({ isPlaying: nextPlaying });
  },

  // Transition State Lifecycle:
  // Step 1: Curtain covers the screen (800ms)
  // Step 2: Screen is 100% covered -> apply the actual state changes (theme colors / RTL-LTR / text)!
  // Step 3: Exact 4-SECOND PAUSE/HOLD: 4000ms with official logo, slogan and progress bar
  // Step 4: Uncovering (800ms) revealing the newly transformed page
  transitionPhase: 'idle',
  transitionLang: undefined,
  triggerTransition: (action: () => void, targetLang?: 'EN' | 'FA') => {
    if (get().transitionPhase !== 'idle') return;

    // 1. Start Covering the screen with the target language recognized on the curtain
    set({ 
      transitionPhase: 'covering',
      transitionLang: targetLang || get().currentLang 
    });

    // 2. Screen is completely covered (at 800ms).
    // Now execute state changes (theme colors, RTL layout, texts) safely and silently behind the curtain!
    setTimeout(() => {
      action();
      set({ transitionPhase: 'paused' });
    }, 800);

    // 3. Exactly after 4 FULL SECONDS of coverage (800ms + 4000ms = 4800ms), begin Uncovering!
    setTimeout(() => {
      set({ transitionPhase: 'uncovering' });
    }, 4800);

    // 4. Return to idle after uncovering finishes (4800ms + 800ms = 5600ms)
    setTimeout(() => {
      set({ 
        transitionPhase: 'idle',
        transitionLang: undefined 
      });
    }, 5600);
  },
}));
