import Icon from "@/components/ui/icon";
import { T, MY_COLLECTIONS, NFT_IMG_1, NFT_IMG_2, NFT_IMG_3 } from "./constants";

/* ─────────── WALLET ─────────── */
export function WalletScreen({ t }: { t: typeof T.ru }) {
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
export function SubscriptionScreen({
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
