export type Locale = "en" | "ja";

export const LOCALES: { value: Locale; label: string }[] = [
  { value: "en", label: "English" },
  { value: "ja", label: "日本語" },
];

export const LOCALE_STORAGE_KEY = "wb-locale";

export type UiMessages = {
  brandPitch: string;
  shopLede1: string;
  shopLede2: string;
  merch: string;
  contact: string;
  contactLine: string;
  supportHandle: string;
  supportLine: string;
  supportReveal: string;
  supportAria: string;
  supportMailSubject: string;
  cart: string;
  cartEmpty: string;
  total: string;
  checkout: string;
  redirecting: string;
  clearCart: string;
  close: string;
  remove: string;
  preOrder: string;
  soldOut: string;
  addToCart: string;
  addPreOrder: string;
  added: string;
  openCart: string;
  mixKicker: string;
  mixTitle: string;
  mixCopy: string;
  mixCopySecondary: string;
  quantity: string;
};

const en: UiMessages = {
  brandPitch: "Digital beach streetwear.",
  shopLede1: "Limited drops from the digital beach —",
  shopLede2: "streetwear that keeps the signal hot.",
  merch: "Merch",
  contact: "Contact",
  contactLine: "We’re here — orders, drops, video, photo",
  supportHandle: "Beach Patrol",
  supportLine: "Support, orders, tickets — beachpatrol",
  supportReveal: "Tap to email (spam-protected)",
  supportAria: "Email Beach Patrol support",
  supportMailSubject: "White Beauty support",
  cart: "Cart",
  cartEmpty: "Empty — add merch from the shop.",
  total: "Total",
  checkout: "Checkout",
  redirecting: "Redirecting…",
  clearCart: "Clear cart",
  close: "Close",
  remove: "Remove",
  preOrder: "Pre-Order",
  soldOut: "Sold Out",
  addToCart: "Add to cart",
  addPreOrder: "Add pre-order",
  added: "Added",
  openCart: "Open cart",
  mixKicker: "The mix",
  mixTitle: "Power and the Glory — open the signal",
  mixCopy:
    "The mix is how people find White Beauty — NFC taps, late-night plays, the cut that starts the story. It exists to pull you into the brand: digital beach streetwear, limited drops, pins, patches, stickers, and the pieces that keep the signal hot after the track ends.",
  mixCopySecondary: "Hit play, then shop the merch.",
  quantity: "Quantity",
};

const ja: UiMessages = {
  brandPitch: "デジタルビーチ・ストリートウェア。",
  shopLede1: "デジタルビーチから届くリミテッドドロップ —",
  shopLede2: "シグナルを熱く保つストリートウェア。",
  merch: "マーチャント",
  contact: "コンタクト",
  contactLine: "注文・ドロップ・映像・写真はこちら",
  supportHandle: "ビーチパトロール",
  supportLine: "サポート・注文・チケット — beachpatrol",
  supportReveal: "タップでメール（スパム対策）",
  supportAria: "ビーチパトロールへメール",
  supportMailSubject: "White Beauty サポート",
  cart: "カート",
  cartEmpty: "カートは空です — ショップから追加してください。",
  total: "合計",
  checkout: "チェックアウト",
  redirecting: "移動中…",
  clearCart: "カートを空にする",
  close: "閉じる",
  remove: "削除",
  preOrder: "予約注文",
  soldOut: "売り切れ",
  addToCart: "カートに入れる",
  addPreOrder: "予約を追加",
  added: "追加しました",
  openCart: "カートを開く",
  mixKicker: "ミックス",
  mixTitle: "Power and the Glory — シグナルを開け",
  mixCopy:
    "ミックスは White Beauty への入り口。NFC、夜のプレイ、物語の始まり。目的はブランドへ誘うこと — デジタルビーチのストリートウェア、リミテッドドロップ、ピン、パッチ、ステッカー。曲が終わったあともシグナルを熱く保つピース。",
  mixCopySecondary: "再生してから、マーチャントへ。",
  quantity: "数量",
};

export const uiMessages: Record<Locale, UiMessages> = { en, ja };

export type ProductCopy = {
  name: string;
  description: string;
};

export const productCopy: Record<string, Record<Locale, ProductCopy>> = {
  "character-tee": {
    en: {
      name: "Character Tee",
      description: "Black dry-fit poly. Cracked-lens character hit.",
    },
    ja: {
      name: "キャラクターTシャツ",
      description: "黒のドライフィットポリ。ヒビ入りレンズのキャラクターヒット。",
    },
  },
  "power-glory-tee": {
    en: {
      name: "Digital Beach Tee",
      description:
        "Black dry-fit poly. Horizontal WB front. Let’s Retreat back at the shoulder blades.",
    },
    ja: {
      name: "デジタルビーチTシャツ",
      description:
        "黒のドライフィットポリ。フロントは横型WBロゴ。バックは肩甲骨あたりの Let’s Retreat ヒット。",
    },
  },
  "tough-cookies-ls": {
    en: {
      name: "Feminine Protection",
      description:
        "Black dry-fit poly long sleeve. Pre-order — ships when the drop lands.",
    },
    ja: {
      name: "フェミニン・プロテクション",
      description:
        "黒のドライフィットポリ ロングスリーブ。予約注文 — ドロップ到着後に発送。",
    },
  },
  "tapestry-wb": {
    en: {
      name: "WB Tapestry",
      description:
        "150×150cm. Pole pocket. Digital beach wall hit — made one, can make more.",
    },
    ja: {
      name: "WBタペストリー",
      description:
        "150×150cm。ポールポケット付き。デジタルビーチのウォールヒット — 1点制作済み、追加制作可。",
    },
  },
  "sticker-portrait": {
    en: {
      name: "Portrait Sticker",
      description:
        "Field portrait + pink script. Pre-order — ships when the drop lands.",
    },
    ja: {
      name: "ポートレートステッカー",
      description:
        "フィールドポートレート＋ピンクスクリプト。予約注文 — ドロップ到着後に発送。",
    },
  },
  "pin-colorbars": {
    en: {
      name: "Color Bars Pin",
      description: "Hard enamel. Pink over green. Soft flex.",
    },
    ja: {
      name: "カラーバーピン",
      description: "ハードエナメル。ピンク×グリーン。ソフトフレックス。",
    },
  },
  "patch-script": {
    en: {
      name: "Script Patch",
      description: "PVC + velcro backing. Removable, or stitch it direct.",
    },
    ja: {
      name: "スクリプトパッチ",
      description: "PVC＋ベルクロ裏地。取り外し可、または直接縫い付け。",
    },
  },
  "sticker-script": {
    en: {
      name: "Die-Cut Script Sticker",
      description: "Pink White Beauty script. Peel and claim.",
    },
    ja: {
      name: "ダイカット・スクリプトステッカー",
      description: "ピンクの White Beauty スクリプト。剥がして貼れ。",
    },
  },
  "sticker-logo": {
    en: {
      name: "Logo Sticker",
      description: "Black plate. Neon script. Stack ready.",
    },
    ja: {
      name: "ロゴステッカー",
      description: "ブラックプレート。ネオンスクリプト。重ね貼りOK。",
    },
  },
  "sticker-cut-rite": {
    en: {
      name: "Cut Rite Sticker",
      description: "Cracked-ice holo + WB/QR side. Scan the signal.",
    },
    ja: {
      name: "カットライトステッカー",
      description: "クラックアイスホロ＋WB/QR面。シグナルをスキャン。",
    },
  },
  "sticker-halloween": {
    en: {
      name: "Make Halloween Scary Again",
      description: "Double-sided drop. Bring the night back.",
    },
    ja: {
      name: "Make Halloween Scary Again",
      description: "両面ドロップ。夜を取り戻せ。",
    },
  },
};

export function getProductCopy(
  productId: string,
  locale: Locale,
  fallbackName: string,
  fallbackDescription: string,
): ProductCopy {
  return (
    productCopy[productId]?.[locale] ?? {
      name: fallbackName,
      description: fallbackDescription,
    }
  );
}
