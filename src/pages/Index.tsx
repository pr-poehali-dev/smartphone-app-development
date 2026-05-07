import { useState } from "react";
import Icon from "@/components/ui/icon";

type Screen = "home" | "create" | "gallery" | "wallet" | "subscription";
type Lang = "ru" | "en";

const T = {
  ru: {
    appName: "Mintify",
    tagline: "Создавай. Коллекционируй. Продавай.",
    home: "Главная",
    create: "Создать",
    gallery: "Стили",
    wallet: "Кошелёк",
    subscription: "Pro",
    greeting: "Добро пожаловать",
    homeSubtitle: "Твоя NFT-студия в кармане",
    createCollection: "Создать коллекцию",
    myNfts: "Мои NFT",
    sub: "Подписка",
    marketplace: "Маркетплейс",
    totalNfts: "NFT создано",
    totalCollections: "Коллекций",
    totalSales: "Продаж",
    featuredTitle: "Трендовые коллекции",
    seeAll: "Все",
    createTitle: "Новая коллекция",
    createSubtitle: "Настрой и сгенерируй свои NFT",
    chooseStyle: "Выбери стиль",
    nftCount: "Количество NFT",
    generate: "Генерировать",
    galleryTitle: "Галерея стилей",
    gallerySubtitle: "Выбери базу для коллекции",
    freeStyles: "Бесплатные стили",
    proStyles: "Pro стили",
    locked: "Заблокировано",
    unlockPro: "Открыть Pro →",
    walletTitle: "Кошелёк",
    walletSubtitle: "Твои коллекции и активы",
    myCollections: "Мои коллекции",
    balance: "Баланс",
    forSale: "На продаже",
    sold: "Продано",
    items: "шт.",
    subTitle: "Mintify Pro",
    subSubtitle: "Раскрой полный потенциал",
    monthly: "Месяц",
    yearly: "Год",
    save: "−40%",
    proFeatures: ["Все Pro стили", "Неограниченные NFT", "Приоритет генерации", "0% комиссии в маркетплейсе", "Аналитика коллекций", "Поддержка 24/7"],
    freeFeatures: ["5 бесплатных стилей", "До 10 NFT в месяц", "Базовый маркетплейс"],
    buyPro: "Купить Pro",
    currentPlan: "Текущий план",
    freePlan: "Бесплатный",
    perMonth: "/ мес",
    perYear: "/ год",
    price1: "390 ₽",
    price2: "2 790 ₽",
  },
  en: {
    appName: "Mintify",
    tagline: "Create. Collect. Sell.",
    home: "Home",
    create: "Create",
    gallery: "Styles",
    wallet: "Wallet",
    subscription: "Pro",
    greeting: "Welcome back",
    homeSubtitle: "Your NFT studio in your pocket",
    createCollection: "Create Collection",
    myNfts: "My NFTs",
    sub: "Subscription",
    marketplace: "Marketplace",
    totalNfts: "NFTs minted",
    totalCollections: "Collections",
    totalSales: "Sales",
    featuredTitle: "Trending Collections",
    seeAll: "See all",
    createTitle: "New Collection",
    createSubtitle: "Configure and generate your NFTs",
    chooseStyle: "Choose Style",
    nftCount: "NFT Count",
    generate: "Generate",
    galleryTitle: "Style Gallery",
    gallerySubtitle: "Choose a base for your collection",
    freeStyles: "Free Styles",
    proStyles: "Pro Styles",
    locked: "Locked",
    unlockPro: "Unlock Pro →",
    walletTitle: "Wallet",
    walletSubtitle: "Your collections and assets",
    myCollections: "My Collections",
    balance: "Balance",
    forSale: "For Sale",
    sold: "Sold",
    items: "items",
    subTitle: "Mintify Pro",
    subSubtitle: "Unlock full potential",
    monthly: "Monthly",
    yearly: "Yearly",
    save: "−40%",
    proFeatures: ["All Pro Styles", "Unlimited NFTs", "Priority Generation", "Zero Marketplace Fee", "Collection Analytics", "24/7 Support"],
    freeFeatures: ["5 Free Styles", "Up to 10 NFTs / month", "Basic Marketplace"],
    buyPro: "Buy Pro",
    currentPlan: "Current Plan",
    freePlan: "Free",
    perMonth: "/ mo",
    perYear: "/ yr",
    price1: "$4.99",
    price2: "$34.99",
  },
};

const NFT_IMG_1 = "https://cdn.poehali.dev/projects/007c67e7-c769-42c7-94cb-a7248dcc5c6f/files/1a6b371b-f4a4-4027-87f7-a90f1a3e9e73.jpg";
const NFT_IMG_2 = "https://cdn.poehali.dev/projects/007c67e7-c769-42c7-94cb-a7248dcc5c6f/files/838d3d98-c2da-4c55-9122-3e5cdc04e62d.jpg";
const NFT_IMG_3 = "https://cdn.poehali.dev/projects/007c67e7-c769-42c7-94cb-a7248dcc5c6f/files/fc4ed088-8d2e-45e9-8011-5844e114ed69.jpg";

const FREE_STYLES = [
  { id: 1, name: "Geometric", nameRu: "Геометрия", emoji: "◆", color: "from-teal-500 to-cyan-600" },
  { id: 2, name: "Abstract", nameRu: "Абстракция", emoji: "◉", color: "from-blue-500 to-indigo-600" },
  { id: 3, name: "Pixel Art", nameRu: "Пиксель", emoji: "⬛", color: "from-emerald-500 to-teal-600" },
  { id: 4, name: "Nature", nameRu: "Природа", emoji: "◈", color: "from-green-500 to-emerald-600" },
  { id: 5, name: "Minimal", nameRu: "Минимал", emoji: "○", color: "from-slate-500 to-zinc-600" },
];

const PRO_STYLES = [
  { id: 6, name: "Cyberpunk", nameRu: "Киберпанк", emoji: "◈", color: "from-purple-500 to-pink-600" },
  { id: 7, name: "Portraits", nameRu: "Портреты", emoji: "◎", color: "from-orange-500 to-red-600" },
  { id: 8, name: "Surreal", nameRu: "Сюрреализм", emoji: "◇", color: "from-fuchsia-500 to-purple-600" },
  { id: 9, name: "3D Art", nameRu: "3D арт", emoji: "⬡", color: "from-yellow-500 to-orange-600" },
  { id: 10, name: "Anime", nameRu: "Аниме", emoji: "◉", color: "from-pink-500 to-rose-600" },
];

const MY_COLLECTIONS = [
  { id: 1, name: "Genesis Series", count: 10, img: NFT_IMG_1, price: "0.12 ETH", forSale: 3 },
  { id: 2, name: "Abstract Minds", count: 5, img: NFT_IMG_2, price: "0.08 ETH", forSale: 1 },
];

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [lang, setLang] = useState<Lang>("ru");
  const [selectedStyle, setSelectedStyle] = useState<number | null>(null);
  const [nftCount, setNftCount] = useState(10);
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const t = T[lang];

  const handleGenerate = () => {
    if (!selectedStyle) return;
    setGenerating(true);
    setGenerated(false);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div
        className="relative w-[390px] h-[844px] bg-background rounded-[44px] overflow-hidden flex flex-col border border-white/8"
        style={{ boxShadow: "0 0 0 1px hsl(174 72% 42% / 0.08), 0 0 80px hsl(174 72% 42% / 0.06), 0 40px 80px rgba(0,0,0,0.7)" }}
      >
        {/* Status bar */}
        <div className="flex items-center justify-between px-7 pt-4 pb-1 flex-shrink-0">
          <span className="text-xs font-semibold text-muted-foreground">9:41</span>
          <div className="absolute left-1/2 -translate-x-1/2 top-3 w-28 h-7 bg-black rounded-full border border-white/10" />
          <div className="flex items-center gap-1.5">
            <Icon name="Signal" size={12} className="text-muted-foreground" />
            <Icon name="Wifi" size={12} className="text-muted-foreground" />
            <Icon name="Battery" size={14} className="text-muted-foreground" />
            <button
              onClick={() => setLang(l => l === "ru" ? "en" : "ru")}
              className="ml-1 text-[10px] font-black text-mint border border-mint/40 rounded-md px-1.5 py-0.5 leading-none hover:bg-mint/10 transition-colors"
            >
              {lang.toUpperCase()}
            </button>
          </div>
        </div>

        {/* Screen */}
        <div className="flex-1 overflow-hidden">
          {screen === "home" && <HomeScreen t={t} setScreen={setScreen} />}
          {screen === "create" && (
            <CreateScreen
              t={t}
              selectedStyle={selectedStyle}
              setSelectedStyle={setSelectedStyle}
              nftCount={nftCount}
              setNftCount={setNftCount}
              onGenerate={handleGenerate}
              generating={generating}
              generated={generated}
              lang={lang}
            />
          )}
          {screen === "gallery" && (
            <GalleryScreen
              t={t}
              selectedStyle={selectedStyle}
              setSelectedStyle={setSelectedStyle}
              setScreen={setScreen}
              lang={lang}
            />
          )}
          {screen === "wallet" && <WalletScreen t={t} />}
          {screen === "subscription" && (
            <SubscriptionScreen
              t={t}
              billingPeriod={billingPeriod}
              setBillingPeriod={setBillingPeriod}
            />
          )}
        </div>

        {/* Bottom nav */}
        <div className="flex-shrink-0 bg-surface/90 backdrop-blur-xl border-t border-border/40 px-2 pb-5 pt-2">
          <div className="flex items-center justify-around">
            {(
              [
                { key: "home", icon: "Home", labelRu: "Главная", labelEn: "Home" },
                { key: "create", icon: "PlusCircle", labelRu: "Создать", labelEn: "Create" },
                { key: "gallery", icon: "Layers", labelRu: "Стили", labelEn: "Styles" },
                { key: "wallet", icon: "Wallet", labelRu: "Кошелёк", labelEn: "Wallet" },
                { key: "subscription", icon: "Crown", labelRu: "Pro", labelEn: "Pro" },
              ] as const
            ).map(item => (
              <button
                key={item.key}
                onClick={() => setScreen(item.key)}
                className={`relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-2xl transition-all duration-200 ${
                  screen === item.key ? "text-mint" : "text-muted-foreground hover:text-foreground/70"
                }`}
              >
                {screen === item.key && (
                  <span className="absolute inset-0 rounded-2xl bg-mint/10" />
                )}
                <Icon name={item.icon} size={20} />
                <span className="text-[10px] font-semibold relative">
                  {lang === "ru" ? item.labelRu : item.labelEn}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────── HOME ─────────── */
function HomeScreen({ t, setScreen }: { t: typeof T.ru; setScreen: (s: Screen) => void }) {
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
function CreateScreen({
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

/* ─────────── GALLERY ─────────── */
function GalleryScreen({
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

/* ─────────── WALLET ─────────── */
function WalletScreen({ t }: { t: typeof T.ru }) {
  return (
    <div className="h-full overflow-y-auto no-scrollbar px-5 pt-2 pb-3 animate-fade-in">
      <div className="mb-5">
        <h1 className="text-2xl font-black">{t.walletTitle}</h1>
        <p className="text-sm text-muted-foreground">{t.walletSubtitle}</p>
      </div>

      {/* Balance */}
      <div
        className="mb-5 rounded-2xl overflow-hidden relative p-5"
        style={{ background: "linear-gradient(135deg, hsl(174 50% 18%) 0%, hsl(200 55% 13%) 100%)" }}
      >
        <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-mint/8" />
        <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-mint/5" />
        <div className="relative">
          <p className="text-xs text-mint/70 font-semibold mb-1">{t.balance}</p>
          <p className="text-3xl font-black text-white">
            0.32 <span className="text-lg font-bold text-mint">ETH</span>
          </p>
          <p className="text-sm text-white/40 mt-0.5">≈ $842.00</p>
          <div className="flex gap-5 mt-3 pt-3 border-t border-white/10">
            <div>
              <p className="text-[10px] text-white/40 uppercase tracking-wide">{t.forSale}</p>
              <p className="text-base font-black text-white">4</p>
            </div>
            <div>
              <p className="text-[10px] text-white/40 uppercase tracking-wide">{t.sold}</p>
              <p className="text-base font-black text-white">8</p>
            </div>
          </div>
        </div>
      </div>

      {/* Collections */}
      <div className="mb-5">
        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">{t.myCollections}</p>
        <div className="flex flex-col gap-2.5">
          {MY_COLLECTIONS.map(col => (
            <div
              key={col.id}
              className="flex bg-surface-2 rounded-2xl border border-border/50 overflow-hidden hover:border-mint/30 transition-colors cursor-pointer"
            >
              <img src={col.img} alt={col.name} className="w-20 h-20 object-cover flex-shrink-0" />
              <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
                <div>
                  <p className="font-bold text-sm truncate">{col.name}</p>
                  <p className="text-xs text-muted-foreground">{col.count} {t.items}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-mint">{col.price}</span>
                  <span className="text-[10px] bg-surface rounded-full px-2 py-0.5 border border-border/60 text-muted-foreground">
                    {col.forSale} {t.forSale.toLowerCase()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marketplace grid */}
      <div>
        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">{t.marketplace}</p>
        <div className="grid grid-cols-3 gap-2">
          {[NFT_IMG_1, NFT_IMG_2, NFT_IMG_3, NFT_IMG_2, NFT_IMG_3, NFT_IMG_1].map((img, i) => (
            <div key={i} className="relative rounded-xl overflow-hidden aspect-square cursor-pointer group">
              <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-1.5">
                <p className="text-[10px] font-bold text-white">#{(i + 1).toString().padStart(3, "0")}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────── SUBSCRIPTION ─────────── */
function SubscriptionScreen({
  t, billingPeriod, setBillingPeriod,
}: {
  t: typeof T.ru;
  billingPeriod: "monthly" | "yearly";
  setBillingPeriod: (p: "monthly" | "yearly") => void;
}) {
  return (
    <div className="h-full overflow-y-auto no-scrollbar px-5 pt-2 pb-3 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-5">
        <div
          className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/25 flex items-center justify-center mx-auto mb-3"
          style={{ boxShadow: "0 0 24px hsl(43 96% 56% / 0.2)" }}
        >
          <Icon name="Crown" size={30} className="text-gold" />
        </div>
        <h1 className="text-2xl font-black">{t.subTitle}</h1>
        <p className="text-sm text-muted-foreground">{t.subSubtitle}</p>
      </div>

      {/* Toggle */}
      <div className="flex bg-surface-2 rounded-2xl p-1 mb-5 border border-border/50">
        {(["monthly", "yearly"] as const).map(p => (
          <button
            key={p}
            onClick={() => setBillingPeriod(p)}
            className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all duration-200 flex items-center justify-center gap-1.5 ${
              billingPeriod === p ? "bg-foreground text-background shadow-sm" : "text-muted-foreground hover:text-foreground/70"
            }`}
          >
            {p === "monthly" ? t.monthly : t.yearly}
            {p === "yearly" && (
              <span className="text-[10px] bg-mint text-background font-black px-1.5 py-0.5 rounded-full">{t.save}</span>
            )}
          </button>
        ))}
      </div>

      {/* Pro card */}
      <div
        className="mb-3 rounded-2xl border border-gold/30 overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(43 40% 11%) 0%, hsl(30 30% 9%) 100%)" }}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] font-black text-gold uppercase tracking-widest">Pro Plan</span>
              <p className="text-3xl font-black text-white mt-0.5">
                {billingPeriod === "monthly" ? t.price1 : t.price2}
                <span className="text-sm font-medium text-white/40 ml-1">
                  {billingPeriod === "monthly" ? t.perMonth : t.perYear}
                </span>
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gold/15 flex items-center justify-center">
              <Icon name="Zap" size={24} className="text-gold" />
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-4">
            {t.proFeatures.map((f, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <Icon name="Check" size={10} className="text-gold" />
                </div>
                <span className="text-xs text-white/75">{f}</span>
              </div>
            ))}
          </div>
          <button
            className="w-full py-3.5 rounded-xl bg-gold font-black text-sm text-background transition-all active:scale-95 hover:brightness-110"
            style={{ boxShadow: "0 4px 20px hsl(43 96% 56% / 0.3)" }}
          >
            {t.buyPro}
          </button>
        </div>
      </div>

      {/* Free plan */}
      <div className="rounded-2xl border border-border/50 bg-surface-2 p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t.freePlan}</span>
            <p className="text-2xl font-black">$0</p>
          </div>
          <span className="text-xs border border-mint/35 text-mint px-2.5 py-1 rounded-full font-bold">
            {t.currentPlan}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          {t.freeFeatures.map((f, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <div className="w-4 h-4 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <Icon name="Check" size={10} className="text-muted-foreground" />
              </div>
              <span className="text-xs text-muted-foreground">{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}