import Icon from "@/components/ui/icon";
import { T, FREE_STYLES, NFT_IMG_1, NFT_IMG_2, NFT_IMG_3 } from "./constants";
import type { Screen, Lang } from "./constants";

/* ─────────── HOME ─────────── */
export function HomeScreen({ t, setScreen }: { t: typeof T.ru; setScreen: (s: Screen) => void }) {
  const stats = [
    { label: t.totalNfts, value: "24" },
    { label: t.totalCollections, value: "3" },
    { label: t.totalSales, value: "8" },
  ];

  const trending = [
    { name: "Genesis #001", price: "0.12 ETH", img: NFT_IMG_1, change: "+12%" },
    { name: "Mind Flow", price: "0.08 ETH", img: NFT_IMG_2, change: "+5%" },
    { name: "Arcana", price: "0.21 ETH", img: NFT_IMG_3, change: "+28%" },
  ];

  return (
    <div className="h-full overflow-y-auto no-scrollbar px-5 pt-2 pb-3 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-xs text-muted-foreground">{t.greeting} 👋</p>
          <h1 className="text-[26px] font-black tracking-tight leading-none">
            <span className="text-mint" style={{ textShadow: "0 0 24px hsl(174 72% 42% / 0.5)" }}>
              {t.appName}
            </span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">{t.homeSubtitle}</p>
        </div>
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-mint/20 to-teal-800/20 border border-mint/20 flex items-center justify-center text-xl">
          🧑‍🎨
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-5">
        {stats.map((s, i) => (
          <div key={i} className="bg-surface-2 rounded-2xl p-3 border border-border/50 text-center">
            <p className="text-xl font-black text-mint leading-none">{s.value}</p>
            <p className="text-[10px] text-muted-foreground mt-1 leading-tight">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <button
          onClick={() => setScreen("create")}
          className="bg-mint text-background rounded-2xl p-4 text-left transition-all active:scale-95 hover:brightness-105"
          style={{ boxShadow: "0 4px 24px hsl(174 72% 42% / 0.3)" }}
        >
          <Icon name="Sparkles" size={22} className="mb-2" />
          <p className="font-bold text-sm leading-tight">{t.createCollection}</p>
        </button>
        <button
          onClick={() => setScreen("wallet")}
          className="bg-surface-2 border border-border/50 rounded-2xl p-4 text-left transition-all active:scale-95 hover:border-mint/30"
        >
          <Icon name="Image" size={22} className="mb-2 text-mint" />
          <p className="font-bold text-sm leading-tight">{t.myNfts}</p>
        </button>
        <button
          onClick={() => setScreen("subscription")}
          className="bg-surface-2 border border-border/50 rounded-2xl p-4 text-left transition-all active:scale-95 hover:border-gold/30"
        >
          <Icon name="Crown" size={22} className="mb-2 text-gold" />
          <p className="font-bold text-sm leading-tight">{t.sub}</p>
        </button>
        <button className="bg-surface-2 border border-border/50 rounded-2xl p-4 text-left transition-all active:scale-95 hover:border-mint/30">
          <Icon name="ShoppingBag" size={22} className="mb-2 text-mint" />
          <p className="font-bold text-sm leading-tight">{t.marketplace}</p>
        </button>
      </div>

      {/* Trending */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-sm">{t.featuredTitle}</h2>
          <button className="text-xs text-mint font-semibold">{t.seeAll}</button>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {trending.map((item, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[140px] bg-surface-2 rounded-2xl overflow-hidden border border-border/50 hover:border-mint/30 transition-colors cursor-pointer"
            >
              <img src={item.img} alt={item.name} className="w-full h-28 object-cover" />
              <div className="p-2.5">
                <p className="text-xs font-semibold truncate">{item.name}</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-[11px] text-mint font-bold">{item.price}</p>
                  <span className="text-[10px] text-emerald-400 font-semibold">{item.change}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────── CREATE ─────────── */
export function CreateScreen({
  t, selectedStyle, setSelectedStyle, nftCount, setNftCount, onGenerate, generating, generated, lang,
}: {
  t: typeof T.ru;
  selectedStyle: number | null;
  setSelectedStyle: (id: number | null) => void;
  nftCount: number;
  setNftCount: (n: number) => void;
  onGenerate: () => void;
  generating: boolean;
  generated: boolean;
  lang: Lang;
}) {
  const counts = [5, 10, 25, 50, 100];

  return (
    <div className="h-full overflow-y-auto no-scrollbar px-5 pt-2 pb-3 animate-fade-in">
      <div className="mb-5">
        <h1 className="text-2xl font-black">{t.createTitle}</h1>
        <p className="text-sm text-muted-foreground">{t.createSubtitle}</p>
      </div>

      {/* Choose style */}
      <div className="mb-5">
        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">{t.chooseStyle}</p>
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
          {FREE_STYLES.map(style => (
            <button
              key={style.id}
              onClick={() => setSelectedStyle(style.id)}
              className={`flex-shrink-0 flex flex-col items-center gap-1.5 p-3 rounded-2xl border transition-all duration-200 min-w-[72px] ${
                selectedStyle === style.id
                  ? "border-mint bg-mint/10"
                  : "border-border/50 bg-surface-2 hover:border-mint/30"
              }`}
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${style.color} flex items-center justify-center text-base font-bold text-white`}>
                {style.emoji}
              </div>
              <span className="text-[10px] font-semibold leading-tight text-center">
                {lang === "ru" ? style.nameRu : style.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* NFT Count */}
      <div className="mb-5">
        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">{t.nftCount}</p>
        <div className="flex gap-2">
          {counts.map(c => (
            <button
              key={c}
              onClick={() => setNftCount(c)}
              className={`flex-1 py-2.5 rounded-xl border text-sm font-bold transition-all duration-200 ${
                nftCount === c
                  ? "border-mint bg-mint/10 text-mint"
                  : "border-border/50 bg-surface-2 text-muted-foreground hover:border-mint/30"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      {selectedStyle && (
        <div className="mb-5 animate-scale-in">
          <div className="bg-surface-2 rounded-2xl border border-border/50 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${FREE_STYLES.find(s => s.id === selectedStyle)?.color} flex items-center justify-center font-bold text-white`}>
                {FREE_STYLES.find(s => s.id === selectedStyle)?.emoji}
              </div>
              <div>
                <p className="font-semibold text-sm">
                  {lang === "ru"
                    ? FREE_STYLES.find(s => s.id === selectedStyle)?.nameRu
                    : FREE_STYLES.find(s => s.id === selectedStyle)?.name}
                </p>
                <p className="text-xs text-muted-foreground">{nftCount} NFT</p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-xl bg-gradient-to-br ${FREE_STYLES.find(s => s.id === selectedStyle)?.color} shimmer-line`}
                  style={{ opacity: 0.25 + i * 0.07 }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Generate */}
      <button
        onClick={onGenerate}
        disabled={!selectedStyle || generating}
        className={`w-full py-4 rounded-2xl font-bold text-base transition-all duration-300 active:scale-95 ${
          !selectedStyle
            ? "bg-surface-2 text-muted-foreground border border-border/50 cursor-not-allowed"
            : generating
            ? "bg-mint/50 text-background cursor-wait"
            : generated
            ? "bg-emerald-500 text-white"
            : "bg-mint text-background hover:brightness-110"
        }`}
        style={selectedStyle && !generating ? { boxShadow: "0 4px 24px hsl(174 72% 42% / 0.3)" } : {}}
      >
        {generating ? (
          <span className="flex items-center justify-center gap-2">
            <Icon name="Loader" size={18} className="animate-spin" />
            {lang === "ru" ? "Генерирую..." : "Generating..."}
          </span>
        ) : generated ? (
          <span className="flex items-center justify-center gap-2">
            <Icon name="CheckCircle" size={18} />
            {lang === "ru" ? "Готово!" : "Done!"}
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <Icon name="Sparkles" size={18} />
            {t.generate}
          </span>
        )}
      </button>
    </div>
  );
}
