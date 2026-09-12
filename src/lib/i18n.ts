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
  navShop: string;
  navLookbook: string;
  navManifesto: string;
  navMix: string;
  manifestoTitle: string;
  manifestoLine1: string;
  manifestoLine2: string;
  manifestoLine3: string;
  manifestoLine4: string;
  manifestoLine5: string;
  lookbook: string;
  lookbookKicker: string;
  lookbookTitle: string;
  lookbookLede: string;
  lookbookBody: string;
  lookbookNote: string;
  lookbookFrame1: string;
  lookbookFrame2: string;
  lookbookFrame3: string;
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
  free: string;
  freeThroughOct10: string;
  openCart: string;
  mixKicker: string;
  mixTitle: string;
  mixCopy: string;
  mixCopySecondary: string;
  quantity: string;
};

const en: UiMessages = {
  brandPitch: "Streetwear for the Digital Beach.",
  shopLede1: "Limited drops from the digital beach —",
  shopLede2: "streetwear that keeps the signal hot.",
  merch: "Merch",
  navShop: "Shop",
  navLookbook: "Lookbook",
  navManifesto: "Manifesto",
  navMix: "Mix",
  manifestoTitle: "White Beauty Streetwear",
  manifestoLine1: "Streetwear for everywhere.",
  manifestoLine2: "White is all colors. All people.",
  manifestoLine3: "Streetwear for humans.",
  manifestoLine4: "The Digital Beach isn't for everyone.",
  manifestoLine5: "The Digital Beach is for you.",
  lookbook: "Lookbook",
  lookbookKicker: "Lookbook 02",
  lookbookTitle: "After Hours",
  lookbookLede: "Konbini light. After midnight. No studio.",
  lookbookBody:
    "The next pictures are people who already look like this — fluorescent, a drink in the lot, not booked for a campaign. The shop should read like the store they walk into. The piece in the bag should feel heavier than the page.",
  lookbookNote: "Casting and photo — Instagram.",
  lookbookFrame1: "Exterior",
  lookbookFrame2: "Counter",
  lookbookFrame3: "Lot",
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
  free: "Free",
  freeThroughOct10: "Free through Oct 10",
  openCart: "Open cart",
  mixKicker: "The mix",
  mixTitle: "Open the mix — then shop the drop",
  mixCopy:
    "The mix is how people find White Beauty — NFC taps, late-night plays, the cut that starts the story. It pulls you into the brand: streetwear for the Digital Beach, limited drops, pins, patches, stickers, and the pieces that keep the signal hot after the track ends.",
  mixCopySecondary: "Hit play, then shop the merch.",
  quantity: "Quantity",
};

const ja: UiMessages = {
  brandPitch: "デジタルビーチのためのストリートウェア。",
  shopLede1: "デジタルビーチから届くリミテッドドロップ —",
  shopLede2: "シグナルを熱く保つストリートウェア。",
  merch: "マーチャント",
  navShop: "ショップ",
  navLookbook: "ルックブック",
  navManifesto: "マニフェスト",
  navMix: "ミックス",
  manifestoTitle: "White Beauty Streetwear",
  manifestoLine1: "どこにでもあるストリートウェア。",
  manifestoLine2: "白はすべての色。すべての人。",
  manifestoLine3: "人間のためのストリートウェア。",
  manifestoLine4: "デジタルビーチは、みんなのものじゃない。",
  manifestoLine5: "デジタルビーチは、あなたのもの。",
  lookbook: "ルックブック",
  lookbookKicker: "ルックブック 02",
  lookbookTitle: "After Hours",
  lookbookLede: "コンビニの光。深夜。スタジオなし。",
  lookbookBody:
    "次の写真は、もうその顔をしている人たち。蛍光灯、駐車場のドリンク、キャスティングされた感じはなし。ショップは彼らが歩く店のように。袋の中のピースは、ページより重く。",
  lookbookNote: "キャスト・写真 — Instagram。",
  lookbookFrame1: "外観",
  lookbookFrame2: "レジ",
  lookbookFrame3: "駐車場",
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
  free: "無料",
  freeThroughOct10: "10月10日まで無料",
  openCart: "カートを開く",
  mixKicker: "ミックス",
  mixTitle: "ミックスを開けて — ドロップへ",
  mixCopy:
    "ミックスは White Beauty への入り口。NFC、夜のプレイ、物語の始まり。目的はブランドへ誘うこと — デジタルビーチのストリートウェア、リミテッドドロップ、ピン、パッチ、ステッカー。曲が終わったあともシグナルを熱く保つピース。",
  mixCopySecondary: "再生してから、マーチャントへ。",
  quantity: "数量",
};

const th: UiMessages = {
  brandPitch: "สตรีทแวร์สำหรับดิจิทัลบีช",
  shopLede1: "ดรอปลิมิเต็ดจากดิจิทัลบีช —",
  shopLede2: "สตรีทแวร์ที่ทำให้สัญญาณยังร้อน",
  merch: "สินค้า",
  navShop: "ร้าน",
  navLookbook: "ลุคบุ๊ค",
  navManifesto: "แถลงการณ์",
  navMix: "มิกซ์",
  manifestoTitle: "White Beauty Streetwear",
  manifestoLine1: "สตรีทแวร์สำหรับทุกที่",
  manifestoLine2: "ขาวคือทุกสี ทุกคน",
  manifestoLine3: "สตรีทแวร์สำหรับมนุษย์",
  manifestoLine4: "ดิจิทัลบีชไม่ได้มีไว้สำหรับทุกคน",
  manifestoLine5: "ดิจิทัลบีชมีไว้สำหรับคุณ",
  lookbook: "ลุคบุ๊ค",
  lookbookKicker: "ลุคบุ๊ค 02",
  lookbookTitle: "After Hours",
  lookbookLede: "แสงคอนบินิ หลังเที่ยงคืน ไม่มีสตูดิโอ",
  lookbookBody:
    "ภาพถัดไปคือคนที่ดูแบบนี้อยู่แล้ว — ไฟนีออน เครื่องดื่มที่ลานจอด ไม่ได้แคสต์มาถ่ายแคมเปญ ร้านควรอ่านเหมือนร้านที่พวกเขาเดินเข้า ชิ้นในถุงควรหนักกว่าหน้าเว็บ",
  lookbookNote: "แคสต์และภาพ — Instagram",
  lookbookFrame1: "หน้าร้าน",
  lookbookFrame2: "เคาน์เตอร์",
  lookbookFrame3: "ลานจอด",
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
  free: "ฟรี",
  freeThroughOct10: "ฟรีถึง 10 ต.ค.",
  openCart: "เปิดตะกร้า",
  mixKicker: "มิกซ์",
  mixTitle: "เปิดมิกซ์ — แล้วไปช้อปดรอป",
  mixCopy:
    "มิกซ์คือทางเข้า White Beauty — แตะ NFC ฟังตอนดึก จุดเริ่มเรื่อง ดึงคุณเข้าสู่แบรนด์: สตรีทแวร์ดิจิทัลบีช ดรอปลิมิเต็ด เข็มกลัด แพทช์ สติกเกอร์ และชิ้นที่ทำให้สัญญาณยังร้อนหลังเพลงจบ",
  mixCopySecondary: "กดเล่น แล้วไปช้อปเมิร์ช",
  quantity: "จำนวน",
};

const zh: UiMessages = {
  brandPitch: "数字海滩的街头服饰。",
  shopLede1: "来自数字海滩的限量发售 —",
  shopLede2: "让信号持续升温的街头服饰。",
  merch: "周边",
  navShop: "商店",
  navLookbook: "型录",
  navManifesto: "宣言",
  navMix: "混音",
  manifestoTitle: "White Beauty Streetwear",
  manifestoLine1: "街头服饰，无处不在。",
  manifestoLine2: "白是所有颜色。所有人。",
  manifestoLine3: "给人类的街头服饰。",
  manifestoLine4: "数字海滩不是给所有人的。",
  manifestoLine5: "数字海滩是给你的。",
  lookbook: "型录",
  lookbookKicker: "型录 02",
  lookbookTitle: "After Hours",
  lookbookLede: "便利店的灯。午夜后。没有影棚。",
  lookbookBody:
    "下一组照片是本来就长这样的人——荧光灯、停车场里的饮料，不像被请来拍大片。店铺读起来应该像他们会走进的店。袋子里的单品，应该比页面更沉。",
  lookbookNote: "模特与拍摄 — Instagram。",
  lookbookFrame1: "店外",
  lookbookFrame2: "柜台",
  lookbookFrame3: "停车场",
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
  free: "免费",
  freeThroughOct10: "免费至 10 月 10 日",
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
  spec: string;
};

export const productCopy: Record<string, Record<Locale, ProductCopy>> = {
  "character-tee": {
    en: {
      name: "Character Tee",
      description: "Black dry-fit poly. Cracked-lens character hit.",
      spec: "Dry-fit polyester. Front print.",
    },
    ja: {
      name: "キャラクターTシャツ",
      description: "黒のドライフィットポリ。ヒビ入りレンズのキャラクターヒット。",
      spec: "ドライフィットポリエステル。フロントプリント。",
    },
    th: {
      name: "Character Tee",
      description: "โพลี dry-fit สีดำ กราฟิกตัวละครเลนส์ร้าว",
      spec: "โพลี dry-fit. พิมพ์หน้า.",
    },
    zh: {
      name: "角色 T 恤",
      description: "黑色速干聚酯。裂镜角色图案。",
      spec: "速干聚酯。正面印花。",
    },
  },
  "power-glory-tee": {
    en: {
      name: "Digital Beach Tee",
      description:
        "Black dry-fit poly. Horizontal WB front. Let’s Retreat back at the shoulder blades.",
      spec: "Dry-fit polyester. Front and back print.",
    },
    ja: {
      name: "デジタルビーチTシャツ",
      description:
        "黒のドライフィットポリ。フロントは横型WBロゴ。バックは肩甲骨あたりの Let’s Retreat ヒット。",
      spec: "ドライフィットポリエステル。前後プリント。",
    },
    th: {
      name: "Digital Beach Tee",
      description:
        "โพลี dry-fit สีดำ หน้าอกโลโก้ WB แนวนอน หลัง Let’s Retreat ที่สะบัก",
      spec: "โพลี dry-fit. พิมพ์หน้าและหลัง.",
    },
    zh: {
      name: "数字海滩 T 恤",
      description:
        "黑色速干聚酯。正面横版 WB。背面肩胛处 Let’s Retreat。",
      spec: "速干聚酯。正背印花。",
    },
  },
  "polo-wb": {
    en: {
      name: "WB Polo",
      description:
        "Black dry-fit polo. PVC White Beauty script. Full tac — hot weather, Digital Beach, no problem.",
      spec: "Dry-fit polyester. PVC chest logo.",
    },
    ja: {
      name: "WBポロ",
      description:
        "黒のドライフィットポロ。PVCの White Beauty スクリプト。フルタク — 暑い日もデジタルビーチ、問題なし。",
      spec: "ドライフィットポリエステル。PVCチェストロゴ。",
    },
    th: {
      name: "WB Polo",
      description:
        "โปโล dry-fit สีดำ สคริปต์ White Beauty แบบ PVC ฟูลแทค — อากาศร้อน ดิจิทัลบีช ไม่มีปัญหา",
      spec: "โพลี dry-fit. โลโก้ PVC ที่อก.",
    },
    zh: {
      name: "WB Polo",
      description:
        "黑色速干 Polo。PVC White Beauty 手写标。全战术 — 热天、数字海滩，没问题。",
      spec: "速干聚酯。胸前 PVC 标。",
    },
  },
  "tough-cookies-ls": {
    en: {
      name: "Feminine Protection",
      description:
        "Black dry-fit poly long sleeve. Pre-order — ships when the drop lands.",
      spec: "Dry-fit polyester. Long sleeve.",
    },
    ja: {
      name: "フェミニン・プロテクション",
      description:
        "黒のドライフィットポリ ロングスリーブ。予約注文 — ドロップ到着後に発送。",
      spec: "ドライフィットポリエステル。長袖。",
    },
    th: {
      name: "Feminine Protection",
      description:
        "แขนยาวโพลี dry-fit สีดำ พรีออเดอร์ — ส่งเมื่อดรอปถึง",
      spec: "โพลี dry-fit. แขนยาว.",
    },
    zh: {
      name: "Feminine Protection",
      description: "黑色速干聚酯长袖。预购 — 发售到货后发货。",
      spec: "速干聚酯。长袖。",
    },
  },
  "tapestry-wb": {
    en: {
      name: "WB Tapestry",
      description:
        "150×150cm. Pole pocket. Digital beach wall hit — made one, can make more.",
      spec: "150 × 150 cm. Pole pocket.",
    },
    ja: {
      name: "WBタペストリー",
      description:
        "150×150cm。ポールポケット付き。デジタルビーチのウォールヒット — 1点制作済み、追加制作可。",
      spec: "150 × 150 cm。ポールポケット。",
    },
    th: {
      name: "WB Tapestry",
      description:
        "150×150 ซม. มีช่องใส่ไม้ งานผนังดิจิทัลบีช — ทำแล้วหนึ่งผืน สั่งเพิ่มได้",
      spec: "150 × 150 ซม. ช่องใส่ไม้.",
    },
    zh: {
      name: "WB 挂毯",
      description:
        "150×150cm。挂杆袋。数字海滩墙面单品 — 已做一件，可加做。",
      spec: "150 × 150 cm。挂杆袋。",
    },
  },
  "sticker-portrait": {
    en: {
      name: "Portrait Sticker",
      description:
        "Field portrait + pink script. Pre-order — ships when the drop lands.",
      spec: "Vinyl sticker.",
    },
    ja: {
      name: "ポートレートステッカー",
      description:
        "フィールドポートレート＋ピンクスクリプト。予約注文 — ドロップ到着後に発送。",
      spec: "ビニールステッカー。",
    },
    th: {
      name: "Portrait Sticker",
      description:
        "พอร์ตเทรตสนาม + สคริปต์ชมพู พรีออเดอร์ — ส่งเมื่อดรอปถึง",
      spec: "สติกเกอร์ไวนิล",
    },
    zh: {
      name: "肖像贴纸",
      description: "现场肖像 + 粉色手写字。预购 — 发售到货后发货。",
      spec: "乙烯贴纸。",
    },
  },
  "pin-colorbars": {
    en: {
      name: "Color Bars Pin",
      description: "Hard enamel. Pink over green. Soft flex.",
      spec: "Hard enamel. Soft-flex pin.",
    },
    ja: {
      name: "カラーバーピン",
      description: "ハードエナメル。ピンク×グリーン。ソフトフレックス。",
      spec: "ハードエナメル。ソフトフレックスピン。",
    },
    th: {
      name: "Color Bars Pin",
      description: "ฮาร์ดอีนาเมล ชมพูบนเขียว Soft flex",
      spec: "ฮาร์ดอีนาเมล. เข็ม soft-flex.",
    },
    zh: {
      name: "彩条徽章",
      description: "硬珐琅。粉压绿。Soft flex。",
      spec: "硬珐琅。软针。",
    },
  },
  "patch-script": {
    en: {
      name: "Script Patch",
      description: "PVC + velcro backing. Removable, or stitch it direct.",
      spec: "PVC. Velcro back.",
    },
    ja: {
      name: "スクリプトパッチ",
      description: "PVC＋ベルクロ裏地。取り外し可、または直接縫い付け。",
      spec: "PVC。ベルクロ裏地。",
    },
    th: {
      name: "Script Patch",
      description: "PVC + หลังเวลโคร ถอดได้ หรือเย็บติด",
      spec: "PVC. หลังเวลโคร.",
    },
    zh: {
      name: "手写贴章",
      description: "PVC + 魔术贴背面。可拆卸，也可直接缝上。",
      spec: "PVC。魔术贴背面。",
    },
  },
  "sticker-script": {
    en: {
      name: "Die-Cut Script Sticker",
      description: "Pink White Beauty script. Peel and claim.",
      spec: "Die-cut vinyl.",
    },
    ja: {
      name: "ダイカット・スクリプトステッカー",
      description: "ピンクの White Beauty スクリプト。剥がして貼れ。",
      spec: "ダイカットビニール。",
    },
    th: {
      name: "Die-Cut Script Sticker",
      description: "สคริปต์ White Beauty สีชมพู ลอกแล้วติด",
      spec: "ไวนิลไดคัท",
    },
    zh: {
      name: "异形手写贴纸",
      description: "粉色 White Beauty 手写字。撕开贴上。",
      spec: "异形乙烯。",
    },
  },
  "sticker-logo": {
    en: {
      name: "Logo Sticker",
      description: "Black plate. Neon script. Stack ready.",
      spec: "Vinyl. Black plate.",
    },
    ja: {
      name: "ロゴステッカー",
      description: "ブラックプレート。ネオンスクリプト。重ね貼りOK。",
      spec: "ビニール。ブラックプレート。",
    },
    th: {
      name: "Logo Sticker",
      description: "แผ่นดำ สคริปต์นีออน ซ้อนติดได้",
      spec: "ไวนิล. แผ่นดำ.",
    },
    zh: {
      name: "Logo 贴纸",
      description: "黑底板。霓虹手写。可叠贴。",
      spec: "乙烯。黑底板。",
    },
  },
  "sticker-cut-rite": {
    en: {
      name: "Cut Rite Sticker",
      description: "Cracked-ice holo + WB/QR side. Scan the signal.",
      spec: "Holo vinyl. Double-sided.",
    },
    ja: {
      name: "カットライトステッカー",
      description: "クラックアイスホロ＋WB/QR面。シグナルをスキャン。",
      spec: "ホロビニール。両面。",
    },
    th: {
      name: "Cut Rite Sticker",
      description: "โฮโลน้ำแข็งแตก + ด้าน WB/QR สแกนสัญญาณ",
      spec: "ไวนิลโฮโล. สองด้าน.",
    },
    zh: {
      name: "Cut Rite 贴纸",
      description: "裂冰全息 + WB/QR 面。扫描信号。",
      spec: "全息乙烯。双面。",
    },
  },
  "sticker-halloween": {
    en: {
      name: "Make Halloween Scary Again",
      description: "Double-sided drop. Bring the night back.",
      spec: "90 × 140 mm. Double-sided vinyl.",
    },
    ja: {
      name: "Make Halloween Scary Again",
      description: "両面ドロップ。夜を取り戻せ。",
      spec: "90 × 140 mm。両面ビニール。",
    },
    th: {
      name: "Make Halloween Scary Again",
      description: "ดรอปสองด้าน เอากลางคืนกลับมา",
      spec: "90 × 140 มม. ไวนิลสองด้าน.",
    },
    zh: {
      name: "Make Halloween Scary Again",
      description: "双面发售。把夜晚带回来。",
      spec: "90 × 140 mm。双面乙烯。",
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
      spec: "",
    }
  );
}
