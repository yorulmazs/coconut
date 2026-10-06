# Durum ve yol haritası

_Son güncelleme: 2026-10-06 (motor v2, onay kapısı)_

## Bitenler
- [x] Konsept: Coconut the Cat (çekingen ama ailesine uysal kedi), İngilizce, 2-5 yaş
- [x] Karakter sistemi (`character/`), pilot render hattı (`render.js`), pilot demo (`episodes/pilot-visitor.json`)
- [x] Rhubarb ağız verisi (A-H, X) desteği (elle yazılmış ağız verisiyle test edildi, gerçek sesle denenmedi)
- [x] Araç taraması (bkz. `docs/RESEARCH.md`)
- [x] Ayrı depo: bu depo
- [x] **EP00 "Meet Coconut!"** (tanıtım, 70 sn): senaryo `docs/scripts/ep00-meet-coconut.md`, bölüm dosyası `episodes/ep00-meet-coconut.json`, sessiz taslak video üretildi (`npm run render -- episodes/ep00-meet-coconut.json`)

- [x] **Motor v2 (kodda, video üretilmedi):** tasma yeniden çizildi (boyunda simetrik bant, çıngırak/künye sallanır), gövde ezilme-esneme, bakış yönü ve kafa dönüşü, bağımsız kulaklar, kalkan ve sallanan patiler, kapı + ziyaretçi, kamera yakınlaşması, kalpler, kuyruk ucu gecikmesi. `node render.js <bolum.json> --stills 3,12` ile tek kare kontrolü yapılır
- [x] **Üretim kapısı:** `CLAUDE.md`, `docs/BRIEF.md`, `.claude/skills/confirm-brief`: kullanıcı "yeni video yap" demeden video üretilmez

- [x] Animasyon kalitesi araştırması: `docs/ANIMATION_PLAYBOOK.md` (12 prensip, zayıf noktalar, kontrol listesi) ve `docs/RESEARCH.md` güncellendi

- [x] YouTube animasyon üretimi ve repo taraması `docs/RESEARCH.md`'ye kaydedildi

- [x] Politika ve lisans doğrulaması: `docs/POLICY_NOTES.md` (AI ses açıklaması, tekrarlayan içerik riski, made for kids, Kokoro lisansı)
- [x] Kokoro ses örnekleri üretildi (af_heart, af_bella, af_sky, bf_emma), kullanıcının seçimi bekleniyor

- [x] Ses klonlama araştırması ve lisans doğrulaması `docs/POLICY_NOTES.md` madde 6 (denenmedi, ağ engeli ve kullanıcı ses örneği yok)

- [x] Kokoro ses kullanım hakkı doğrulandı (model kartı: Apache-2.0 ağırlık ve ses paketleri, ticari kullanım hazır), `docs/POLICY_NOTES.md` madde 4

- [x] Kanal sesi seçildi: Kokoro af_heart (kalite notu A, Amerikan), hız 0.9

- [x] **EP00 10 sn için ses hazır:** `tools/make_voice.py` (Kokoro af_heart + Rhubarb), `episodes/ep00-meet-coconut-10s.voice.json`, ağız verisi `episodes/ep00-meet-coconut-10s.mouth.json`, bölüm dosyasına `audio`/`mouthCues` bağlandı. Video henüz üretilmedi (kullanıcı onayı bekleniyor). Kullanıcı sesi henüz dinlemedi

- [x] Format kararı: sessiz Coconut + anlatıcı + öğretici bölümler (`docs/RESEARCH.md`). EP00 10 sn sesi sadece anlatıcıyla yeniden üretildi, balonlar sembol oldu

## Açık işler (öncelik sırasıyla)
0. [~] **EP00 10 sn sürümü üretildi (`episodes/ep00-meet-coconut-10s.json`), kullanıcı geri bildirimi bekleniyor.** (Eski not:) Mevcut `episodes/ep00-meet-coconut.json` eski motorun az hareketli zaman çizelgesi. Yeni motorun hareketleriyle yeniden yazılacak ve kullanıcı "yeni video yap" deyince üretilecek. Eski EP00 videosu kullanıcı tarafından "çok basit, hareket yok" diye reddedildi
1. [ ] **EP00 sesini kullanıcı dinleyip onaylayacak**; sonra "yeni video yap" ile ses ve ağız senkronlu 10 sn video üretilir
2. [ ] **EP00 sonrası EP01:** "Coconut Meets a Visitor" (senaryo yazılacak)
3. [ ] Mac'te kurulum ve `npm run pilot` testi (kullanıcı deneyecek, hata olursa düzelt)
4. [ ] Varlık setini genişlet: yandan görünüş, yürüme, 5 ifade, ikinci mekân (yatak odası), Mom & Dad karakterleri
5. [ ] Kanal kimliği paketi: kanal adı, logo, biyografi (EN), Instagram biyografisi
6. [ ] Google Cloud OAuth + `youtube-skill` ile **private** deneme yüklemesi
7. [ ] Render'a dikey (9:16) Shorts çıktısı seçeneği ekle
8. [ ] İlk 3 bölümü birlikte yayına al, haftada 1 bölüm + haftada 3-4 Instagram paylaşımı

## Bir sonraki adım (kullanıcı seçecek)
Zayıf noktalardan hangisi önce: pati/ifadeler, yürüme döngüsü + yan görünüş, ses + ağız senkronu. Seçime göre oyun kitabına uyarak kodda geliştir, tek karelerle kontrol et, kullanıcı "yeni video yap" deyince üret.

## Bekleyen / kullanıcıdan gerekenler
- Kanal adı seçimi (adaylar: Coconut the Cat, Coconut & Friends, Little Coconut, Coconut's Cozy Day)
- Çizim yolu: şimdilik kod tabanlı Coconut; ileride illüstratör düşünülebilir (aynı karakter kılavuzuyla)
- Seslendirme: yapay ses (kullanıcı aksan nedeniyle kendi sesini kullanamıyor). Kanal sesi af_heart, kullanıcı dinleyip değiştirmek isterse değişir
- `fitcite` deposundaki [PR #2](https://github.com/yorulmazs/fitcite/pull/2) Coconut'ı içermiyor, kullanıcı kapatabilir

## Büyüme planı
| Platform | İçerik | Sıklık |
|---|---|---|
| YouTube | 2-3 dk animasyon bölümü | Haftada 1 |
| Shorts/Reels | Bölümden 15-30 sn kesit | Haftada 2-3 |
| Instagram | Gerçek Coconut videoları | Haftada 3-4 |
| Instagram Story | Gün içi anlar, bölüm duyurusu | Günlük |

Fikir: Her animasyon bölümüne karşılık gerçek Coconut'ın aynı davranışını gösteren kısa bir Instagram videosu. İlk 3 ayın hedefi büyük sayı değil, düzenli üretim.
