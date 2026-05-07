import Icon from "@/components/ui/icon";
import { T, FREE_STYLES, PRO_STYLES } from "./constants";
import type { Screen, Lang } from "./constants";

export function GalleryScreen({
  t, selectedStyle, setSelectedStyle, setScreen, lang,
}: {
  t: typeof T.ru;
  selectedStyle: number | null;
  setSelectedStyle: (id: number | null) => void;
  setScreen: (s: Screen) => void;
  lang: Lang;
}) {
  return (
    <div className="h-full overflow-y-auto no-scrollbar px-5 pt-2 pb-3 animate-fade-in">
      <div className="mb-5">
        <h1 className="text-2xl font-black">{t.galleryTitle}</h1>
        <p className="text-sm text-muted-foreground">{t.gallerySubtitle}</p>
      </div>

      {/* Free */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-3">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">{t.freeStyles}</p>
          <span className="bg-emerald-500/15 text-emerald-400 text-[10px] font-black px-2 py-0.5 rounded-full">FREE</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {FREE_STYLES.map(style => (
            <button
              key={style.id}
              onClick={() => { setSelectedStyle(style.id); setScreen("create"); }}
              className={`overflow-hidden rounded-2xl border transition-all duration-200 active:scale-95 text-left ${
                selectedStyle === style.id
                  ? "border-mint"
                  : "border-border/50 hover:border-mint/30"
              }`}
            >
              <div className={`w-full h-24 bg-gradient-to-br ${style.color} flex items-center justify-center text-4xl opacity-80`}>
                {style.emoji}
              </div>
              <div className="p-2.5 bg-surface-2">
                <p className="font-bold text-sm">{lang === "ru" ? style.nameRu : style.name}</p>
                <p className="text-[10px] text-mint font-semibold">Free</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Pro */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">{t.proStyles}</p>
          <span className="bg-gold/15 text-gold text-[10px] font-black px-2 py-0.5 rounded-full">PRO</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {PRO_STYLES.map(style => (
            <button
              key={style.id}
              onClick={() => setScreen("subscription")}
              className="relative overflow-hidden rounded-2xl border border-border/50 active:scale-95 text-left"
            >
              <div className={`w-full h-24 bg-gradient-to-br ${style.color} flex items-center justify-center text-4xl`}>
                <span className="opacity-25">{style.emoji}</span>
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/55 backdrop-blur-[3px]">
                  <Icon name="Lock" size={20} className="text-gold" />
                  <span className="text-[10px] font-black text-gold mt-1">PRO</span>
                </div>
              </div>
              <div className="p-2.5 bg-surface-2">
                <p className="font-bold text-sm text-muted-foreground">{lang === "ru" ? style.nameRu : style.name}</p>
                <p className="text-[10px] text-gold font-semibold">{t.locked}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => setScreen("subscription")}
        className="w-full py-3.5 rounded-2xl border border-gold/30 bg-gold/5 text-gold font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all hover:bg-gold/10 mb-3"
      >
        <Icon name="Crown" size={16} />
        {t.unlockPro}
      </button>
    </div>
  );
}
