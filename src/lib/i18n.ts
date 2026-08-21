export type Locale = "en" | "ja" | "th" | "zh";

export const LOCALES: { value: Locale; label: string }[] = [
  { value: "en", label: "English" },
  { value: "ja", label: "日本語" },
  { value: "th", label: "ไทย" },
  { value: "zh", label: "中文" },
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
  contactLine: "Orders, drops, photo — Instagram or Beach Patrol.",
  supportHandle: "Beach Patrol",
  supportLine: "Support tickets",
  supportReveal: "Tap to email",
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
  mixTitle: "Open the mix — then shop the drop",
  mixCopy:
    "The mix is how people find White Beauty — NFC taps, late-night plays, the cut that starts the story. It pulls you into the brand: digital beach streetwear, limited drops, pins, patches, stickers, and the pieces that keep the signal hot after the track ends.",
  mixCopySecondary: "Hit play, then shop the merch.",
  quantity: "Quantity",
};

const ja: UiMessages = {
  brandPitch: "デジタルビーチ・ストリートウェア。",
  shopLede1: "デジタルビーチから届くリミテッドドロップ —",
  shopLede2: "シグナルを熱く保つストリートウェア。",
  merch: "マーチャント",
  contact: "コンタクト",
  contactLine: "注文・ドロップ・写真 — Instagram またはビーチパトロール。",
  supportHandle: "ビーチパトロール",
  supportLine: "サポートチケット",
  supportReveal: "タップでメール",
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
  mixTitle: "ミックスを開けて — ドロップへ",
  mixCopy:
    "ミックスは White Beauty への入り口。NFC、夜のプレイ、物語の始まり。目的はブランドへ誘うこと — デジタルビーチのストリートウェア、リミテッドドロップ、ピン、パッチ、ステッカー。曲が終わったあともシグナルを熱く保つピース。",
  mixCopySecondary: "再生してから、マーチャントへ。",
  quantity: "数量",
};

const th: UiMessages = {
  brandPitch: "สตรีทแวร์ดิจิทัลบีช",
  shopLede1: "ดรอปลิมิเต็ดจากดิจิทัลบีช —",
  shopLede2: "สตรีทแวร์ที่ทำให้สัญญาณยังร้อน",
  merch: "สินค้า",
  contact: "ติดต่อ",
  contactLine: "ออเดอร์ ดรอป รูป — Instagram หรือ Beach Patrol",
  supportHandle: "Beach Patrol",
  supportLine: "ตั๋วซัพพอร์ต",
  supportReveal: "แตะเพื่ออีเมล",
  supportAria: "อีเมลหา Beach Patrol",
  supportMailSubject: "White Beauty สนับสนุน",
  cart: "ตะกร้า",
  cartEmpty: "ว่าง — เพิ่มสินค้าจากร้าน",
  total: "รวม",
  checkout: "ชำระเงิน",
  redirecting: "กำลังพาไป…",
  clearCart: "ล้างตะกร้า",
  close: "ปิด",
  remove: "ลบ",
  preOrder: "พรีออเดอร์",
  soldOut: "ขายหมด",
  addToCart: "ใส่ตะกร้า",
  addPreOrder: "เพิ่มพรีออเดอร์",
  added: "เพิ่มแล้ว",
  openCart: "เปิดตะกร้า",
  mixKicker: "มิกซ์",
  mixTitle: "เปิดมิกซ์ — แล้วไปช้อปดรอป",
  mixCopy:
    "มิกซ์คือทางเข้า White Beauty — แตะ NFC ฟังตอนดึก จุดเริ่มเรื่อง ดึงคุณเข้าสู่แบรนด์: สตรีทแวร์ดิจิทัลบีช ดรอปลิมิเต็ด เข็มกลัด แพทช์ สติกเกอร์ และชิ้นที่ทำให้สัญญาณยังร้อนหลังเพลงจบ",
  mixCopySecondary: "กดเล่น แล้วไปช้อปเมิร์ช",
  quantity: "จำนวน",
};

const zh: UiMessages = {
  brandPitch: "数字海滩街头服饰。",
  shopLede1: "来自数字海滩的限量发售 —",
  shopLede2: "让信号持续升温的街头服饰。",
  merch: "周边",
  contact: "联系",
  contactLine: "订单、发售、照片 — Instagram 或 Beach Patrol。",
  supportHandle: "Beach Patrol",
  supportLine: "支持工单",
  supportReveal: "点击发邮件",
  supportAria: "给 Beach Patrol 发邮件",
  supportMailSubject: "White Beauty 支持",
  cart: "购物车",
  cartEmpty: "空的 — 从商店添加周边。",
  total: "合计",
  checkout: "结账",
  redirecting: "跳转中…",
  clearCart: "清空购物车",
  close: "关闭",
  remove: "移除",
  preOrder: "预购",
  soldOut: "售罄",
  addToCart: "加入购物车",
  addPreOrder: "加入预购",
  added: "已添加",
  openCart: "打开购物车",
  mixKicker: "混音",
  mixTitle: "打开混音 — 然后选购发售",
  mixCopy:
    "混音是认识 White Beauty 的入口 — NFC 轻触、深夜播放、故事的起点。它把你拉进品牌：数字海滩街头服饰、限量发售、徽章、贴章、贴纸，以及在曲终后仍让信号保持热度的单品。",
  mixCopySecondary: "先播放，再选购周边。",
  quantity: "数量",
};

export const uiMessages: Record<Locale, UiMessages> = { en, ja, th, zh };

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
    th: {
      name: "Character Tee",
      description: "โพลี dry-fit สีดำ กราฟิกตัวละครเลนส์ร้าว",
    },
    zh: {
      name: "角色 T 恤",
      description: "黑色速干聚酯。裂镜角色图案。",
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
    th: {
      name: "Digital Beach Tee",
      description:
        "โพลี dry-fit สีดำ หน้าอกโลโก้ WB แนวนอน หลัง Let’s Retreat ที่สะบัก",
    },
    zh: {
      name: "数字海滩 T 恤",
      description:
        "黑色速干聚酯。正面横版 WB。背面肩胛处 Let’s Retreat。",
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
    th: {
      name: "Feminine Protection",
      description:
        "แขนยาวโพลี dry-fit สีดำ พรีออเดอร์ — ส่งเมื่อดรอปถึง",
    },
    zh: {
      name: "Feminine Protection",
      description: "黑色速干聚酯长袖。预购 — 发售到货后发货。",
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
    th: {
      name: "WB Tapestry",
      description:
        "150×150 ซม. มีช่องใส่ไม้ งานผนังดิจิทัลบีช — ทำแล้วหนึ่งผืน สั่งเพิ่มได้",
    },
    zh: {
      name: "WB 挂毯",
      description:
        "150×150cm。挂杆袋。数字海滩墙面单品 — 已做一件，可加做。",
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
    th: {
      name: "Portrait Sticker",
      description:
        "พอร์ตเทรตสนาม + สคริปต์ชมพู พรีออเดอร์ — ส่งเมื่อดรอปถึง",
    },
    zh: {
      name: "肖像贴纸",
      description: "现场肖像 + 粉色手写字。预购 — 发售到货后发货。",
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
    th: {
      name: "Color Bars Pin",
      description: "ฮาร์ดอีนาเมล ชมพูบนเขียว Soft flex",
    },
    zh: {
      name: "彩条徽章",
      description: "硬珐琅。粉压绿。Soft flex。",
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
    th: {
      name: "Script Patch",
      description: "PVC + หลังเวลโคร ถอดได้ หรือเย็บติด",
    },
    zh: {
      name: "手写贴章",
      description: "PVC + 魔术贴背面。可拆卸，也可直接缝上。",
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
    th: {
      name: "Die-Cut Script Sticker",
      description: "สคริปต์ White Beauty สีชมพู ลอกแล้วติด",
    },
    zh: {
      name: "异形手写贴纸",
      description: "粉色 White Beauty 手写字。撕开贴上。",
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
    th: {
      name: "Logo Sticker",
      description: "แผ่นดำ สคริปต์นีออน ซ้อนติดได้",
    },
    zh: {
      name: "Logo 贴纸",
      description: "黑底板。霓虹手写。可叠贴。",
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
    th: {
      name: "Cut Rite Sticker",
      description: "โฮโลน้ำแข็งแตก + ด้าน WB/QR สแกนสัญญาณ",
    },
    zh: {
      name: "Cut Rite 贴纸",
      description: "裂冰全息 + WB/QR 面。扫描信号。",
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
    th: {
      name: "Make Halloween Scary Again",
      description: "ดรอปสองด้าน เอากลางคืนกลับมา",
    },
    zh: {
      name: "Make Halloween Scary Again",
      description: "双面发售。把夜晚带回来。",
    },
  },
};

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "ja" || value === "th" || value === "zh";
}

/** Map browser language tags (e.g. th-TH, ja-JP, zh-CN) to a supported locale. */
export function detectBrowserLocale(
  languages: readonly string[] | string | undefined,
): Locale {
  const list = Array.isArray(languages)
    ? languages
    : typeof languages === "string" && languages
      ? [languages]
      : [];

  for (const tag of list) {
    const base = tag.toLowerCase().split("-")[0];
    if (base === "th") return "th";
    if (base === "ja") return "ja";
    if (base === "zh") return "zh";
    if (base === "en") return "en";
  }
  return "en";
}

export function htmlLang(locale: Locale) {
  return locale;
}

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
