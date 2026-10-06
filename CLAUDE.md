# CLAUDE.md: Coconut projesi için yardımcı ajan hafızası

Bu dosyayı her oturumun başında oku. Proje geçmişi, kararlar ve kurallar burada. Ayrıntılar `docs/` altında.

## Proje özeti
Sahibi, kedisi **Coconut**'tan esinlenen bir **çocuk animasyonu YouTube kanalı** (2-5 yaş, İngilizce, 2-3 dk bölümler) ve gerçek Coconut için bir **Instagram hesabı** kuruyor. İkisi birbirini besleyecek (biyografide karşılıklı link). Kullanıcı Türkçe konuşur, bilgisayarı **Mac**. Videolar ve kanal içeriği **sadece İngilizce**. Kullanıcıyla Türkçe konuş.

## Ana kararlar (tekrar tartışma, değiştirmek için kullanıcıya sor)
1. **Tutarlılık kuralı:** Coconut sadece `character/coconut.js` + `character/palette.json` ile çizilir. Hiçbir sahnede "yeniden çizilmez". Yapay zekâ video platformları ana karakter için kullanılmaz (tutarlılık riski, çocuk içeriği politikası riski).
2. **Üretim hattı:** Bölüm = `episodes/*.json` zaman çizelgesi, `render.js` ile MP4. Ağız senkronu Rhubarb Lip Sync (A-H, X) ile.
3. **Ses:** Kullanıcı kendi sesini kaydeder (WAV). Taslak için Kokoro olabilir. Yapay ses kullanılırsa YouTube açıklama kurallarına uyulur.
4. **YouTube:** Kanal "çocuklara özel" (Made for Kids) işaretlenir. Yükleme için `junjunjunbong/youtube-skill` (incelendi, güvenli görünüyor: varsayılan dry-run, private, made_for_kids zorunlu).
5. **Ayrı depo:** Bu depo `fitcite` projesinden bağımsız.

## Coconut (gerçek kedi) özeti
Mavi-gri kısa tüylü, tombul; yeşil-sarı gözler, ciddi/çatık bakış; göğüste beyaz leke, ön patilerde beyaz uçlar; boynunda krem örgü çiçek tasma + çıngırak + sarı çiçek künye. **Kişilik:** ailesine (Mom & Dad) çok uysal, onlarla yatıp kalkar; yabancıya çekingen, ısınması zaman alır. Tam kurallar: `CHARACTER_BIBLE.md`.

## Üretim kapısı (EN ÖNEMLİ KURAL)
**Kullanıcı açıkça "yeni video yap" (veya eşdeğeri) demeden hiçbir video üretme ve gönderme.** Her video için ayrı onay gerekir, önceki onay sonrakini kapsamaz. Üretimden önce `.claude/skills/confirm-brief` becerisini uygula: `docs/BRIEF.md` oku, isteneni geri yaz, kabul ölçütlerini çıkar, onay al. Üretince kareleri kendin kontrol et ve sağlanmayan ölçütü dürüstçe söyle. Kullanıcı aynı geri bildirimi ikinci kez vermek zorunda kalmamalı: geri bildirimleri `docs/BRIEF.md` içine yaz.

## Sert kurallar
- **Çocuk güvenliği:** Tırmalama, tıslama, vurma sahnede gösterilmez. Çekingenlik = saklanma, sırt çevirme, kuyruk kabartma, "Hmph.", "Not today.". Yabancıya tepki yumuşatılır ve sabırla ısınma hikâyesine çevrilir.
- **Mahremiyet:** Kullanıcının fotoğraflarında adres, plaka, belge ve imza görünmüştü. Hiçbir çıktıya (video, görsel, metin) gerçek adres, plaka, kişisel belge girmez. Instagram'a konacak gerçek fotoğraflar için bulanıklaştırma/kırpma hatırlat.
- **Karakter kontrol listesi** (`CHARACTER_BIBLE.md`) her yeni sahnede uygulanır.
- **Dürüstlük:** Büyüme garantisi verme. Yapamadığın veya test etmediğin şeyi (ör. Mac'te çalıştırma) açıkça söyle.
- Kullanıcının hesabına/yayınına dokunan eylemlerde (YouTube yükleme, Instagram paylaşımı, depo oluşturma) önce onay iste.

## Durum (güncel durumu `docs/STATUS.md` içinde tut)
Bkz. `docs/STATUS.md`. Her oturum sonunda orayı güncelle.

## Yardımcı ajanlar ve beceriler
- `.claude/agents/script-writer.md`: İngilizce bölüm senaryosu, şarkı sözü, diyalog
- `.claude/agents/episode-reviewer.md`: bölümü karakter, güvenlik, yaş uygunluğu açısından denetler
- `.claude/skills/new-episode/SKILL.md`: yeni bölüm iskeleti (senaryo + JSON + kontrol listesi)

## Komutlar
```bash
npm install && npx playwright install chromium   # bir kez
npm run pilot                                     # pilot videoyu üret
node render.js episodes/<bolum>.json              # bir bölümü üret
```
Not: Bulut sandbox'ta `CHROMIUM_PATH=/opt/pw-browsers/chromium` gerekir. Mac'te denenmedi, ilk çalıştırmada hata olursa düzelt.
