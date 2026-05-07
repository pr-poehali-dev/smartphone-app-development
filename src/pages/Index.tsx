import { useState } from "react";
import Icon from "@/components/ui/icon";
import { T } from "@/mintify/constants";
import type { Screen, Lang } from "@/mintify/constants";
import { HomeScreen, CreateScreen } from "@/mintify/HomeCreateScreens";
import { GalleryScreen } from "@/mintify/GalleryScreen";
import { WalletScreen, SubscriptionScreen } from "@/mintify/WalletSubscriptionScreens";

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
