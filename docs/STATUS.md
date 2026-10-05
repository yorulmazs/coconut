# Durum ve yol haritası

_Son güncelleme: 2026-10-05 (EP00 eklendi)_

## Bitenler
- [x] Konsept: Coconut the Cat (çekingen ama ailesine uysal kedi), İngilizce, 2-5 yaş
- [x] Karakter sistemi (`character/`), pilot render hattı (`render.js`), pilot demo (`episodes/pilot-visitor.json`)
- [x] Rhubarb ağız verisi (A-H, X) desteği (elle yazılmış ağız verisiyle test edildi, gerçek sesle denenmedi)
- [x] Araç taraması (bkz. `docs/RESEARCH.md`)
- [x] Ayrı depo: bu depo
- [x] **EP00 "Meet Coconut!"** (tanıtım, 70 sn): senaryo `docs/scripts/ep00-meet-coconut.md`, bölüm dosyası `episodes/ep00-meet-coconut.json`, sessiz taslak video üretildi (`npm run render -- episodes/ep00-meet-coconut.json`)

## Açık işler (öncelik sırasıyla)
1. [ ] **EP00 sesi:** Anlatıcı sesini WAV kaydet, Rhubarb ile ağız verisi üret, `audio` + `mouthCues` ekle, yeniden render et. Not: Videoda ağız şekilleri henüz sesle senkron değil, ses yok
2. [ ] **EP00 sonrası EP01:** "Coconut Meets a Visitor" (senaryo yazılacak)
3. [ ] Mac'te kurulum ve `npm run pilot` testi (kullanıcı deneyecek, hata olursa düzelt)
4. [ ] Varlık setini genişlet: yandan görünüş, yürüme, 5 ifade, ikinci mekân (yatak odası), Mom & Dad karakterleri
5. [ ] Kanal kimliği paketi: kanal adı, logo, biyografi (EN), Instagram biyografisi
6. [ ] Google Cloud OAuth + `youtube-skill` ile **private** deneme yüklemesi
7. [ ] İlk 3 bölümü birlikte yayına al, haftada 1 bölüm + haftada 3-4 Instagram paylaşımı

## Bekleyen / kullanıcıdan gerekenler
- Kanal adı seçimi (adaylar: Coconut the Cat, Coconut & Friends, Little Coconut, Coconut's Cozy Day)
- Çizim yolu: şimdilik kod tabanlı Coconut; ileride illüstratör düşünülebilir (aynı karakter kılavuzuyla)
- Seslendirme: kendi sesi mi, yapay ses mi (öneri: kendi sesi)
- `fitcite` deposundaki [PR #2](https://github.com/yorulmazs/fitcite/pull/2) Coconut'ı içermiyor, kullanıcı kapatabilir

## Büyüme planı
| Platform | İçerik | Sıklık |
|---|---|---|
| YouTube | 2-3 dk animasyon bölümü | Haftada 1 |
| Shorts/Reels | Bölümden 15-30 sn kesit | Haftada 2-3 |
| Instagram | Gerçek Coconut videoları | Haftada 3-4 |
| Instagram Story | Gün içi anlar, bölüm duyurusu | Günlük |

Fikir: Her animasyon bölümüne karşılık gerçek Coconut'ın aynı davranışını gösteren kısa bir Instagram videosu. İlk 3 ayın hedefi büyük sayı değil, düzenli üretim.
