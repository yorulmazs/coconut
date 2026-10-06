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
Mavi-gri kısa tüylü, tombul; yeşil-sarı gözler, ciddi/çatık bakış; göğüste beyaz leke, ön patilerde beyaz uçlar; boynunda krem tasma (boynun önünde simetrik bant, bir yanda örgü çiçek, ortadan çıngırak + sarı çiçek künye sarkar). **Kişilik:** ailesine (Mom & Dad) çok uysal, onlarla yatıp kalkar; yabancıya çekingen, ısınması zaman alır. Tam kurallar: `CHARACTER_BIBLE.md`.

## Üretim kapısı (EN ÖNEMLİ KURAL)
**Kullanıcı açıkça "yeni video yap" (veya eşdeğeri) demeden hiçbir video üretme ve gönderme.** Her video için ayrı onay gerekir, önceki onay sonrakini kapsamaz. Üretimden önce `.claude/skills/confirm-brief` becerisini uygula: `docs/BRIEF.md` oku, isteneni geri yaz, kabul ölçütlerini çıkar, onay al. Üretince kareleri kendin kontrol et ve sağlanmayan ölçütü dürüstçe söyle. Kullanıcı aynı geri bildirimi ikinci kez vermek zorunda kalmamalı: geri bildirimleri `docs/BRIEF.md` içine yaz.

## Animasyon kalitesi
Her sahneden önce `docs/ANIMATION_PLAYBOOK.md` oku (12 prensip, bizim motor parametrelerine uyarlanmış, bilinen zayıf noktalar, kontrol listesi). Video göndermeden önce oradaki kontrol listesini uygula.

## YouTube gerçekleri (ayrıntı `docs/RESEARCH.md`)
Inauthentic content politikası: şablon/tekrar eden içerik gelir elde edemeyebilir, her bölüm özgün olmalı. Made for Kids: kişiselleştirilmiş reklam ve yorumlar kapalı, CPM düşük, gelir beklentisi düşük tutulur.

## Kaynak repolar (ayrıntı ve gerekçeler: `docs/RESEARCH.md`)
**Kullanılan / kullanılacak:** [Rhubarb Lip Sync](https://github.com/DanielSWolf/rhubarb-lip-sync) (ağız senkronu), [youtube-skill](https://github.com/junjunjunbong/youtube-skill) (yükleme, güvenli bulundu, henüz çalıştırılmadı).
**Animasyon kalitesi için fikir kaynağı** (içerik kopyalanmaz, fikirler `docs/ANIMATION_PLAYBOOK.md`'de): [vibe-motion/skills](https://github.com/vibe-motion/skills) `disney-animation-rule-skill` (lisans belirsiz), [dylantarre/animation-principles](https://github.com/dylantarre/animation-principles) (MIT), [lottiefiles/motion-design-skill](https://github.com/lottiefiles/motion-design-skill) (MIT).
**Kanal açıldıktan sonra:** [analytix](https://github.com/parafoxia/analytix) (YouTube Analytics API SDK, BSD-3).
**Olası, henüz denenmedi:** [Kokoro TTS](https://github.com/hexgrad/kokoro) (taslak ses), [ai-video-captions](https://github.com/nicolaigaina/ai-video-captions) (Reels altyazısı), [Beat](https://github.com/lmparppei/Beat) (Mac senaryo editörü), [thorwhalen/an](https://github.com/thorwhalen/an) (fikir kaynağı).
**KULLANMA:** `GenielabsOpenSource/spine-animation-ai` (PolyForm Noncommercial: gelirli YouTube kanalında kullanılamaz), AgentTube, LLM Council, ECC, tam otomatik yapay zekâ video platformları (ana karakter için).
**Lisans kuralı:** Başka bir repodan kod/metin kopyalamadan önce lisansını kontrol et. Ticari kullanıma izin vermeyen (Noncommercial) veya lisanssız içeriği kullanma, sadece fikir al ve kendi cümlelerinle yaz.

## Bundan sonra çalışma yöntemi
1. `docs/BRIEF.md` + `docs/ANIMATION_PLAYBOOK.md` + `CHARACTER_BIBLE.md` oku.
2. `confirm-brief`: isteneni geri yaz, kabul ölçütlerini çıkar, onay al.
3. Kodu geliştir. Kontrol için tek kare: `node render.js <bolum.json> --stills 3,12` (kullanıcıya gönderme).
4. Kullanıcı "yeni video yap" deyince üret, oyun kitabı kontrol listesini uygula, sağlanmayanı dürüstçe söyle.
5. Yeni geri bildirim ve karar `docs/BRIEF.md`, `docs/STATUS.md`, bu dosyaya yazılır ve push edilir.

## Politika ve lisans kuralı (kullanıcının açık talimatı)
Kullanıcıya "politikayı/lisansı kontrol edin" **deme**. Kendin birincil kaynaktan doğrula (YouTube Help, projenin LICENSE/README dosyaları, hizmetin kullanım koşulları), ne doğrulayabildiğini ve ne doğrulayamadığını söyle, en güvenli kararı ver ve uygula. Doğrulanmış notlar: `docs/POLICY_NOTES.md`. Ağ engeli varsa (ör. `support.google.com`, `huggingface.co`) atlatmaya çalışma, alternatif birincil kaynak dene, ve yalnızca engelin kendisini bir kez bildir.
Özet kararlar: yapay zekâ sesi kullanılan her videoda "altered or synthetic content" = Evet (`contains_synthetic_media: true`), kanal ve videolar "made for kids" = Evet, tekrarlayan şablon hikâyeden kaçın ("çekingen ziyaretçi" arkı en fazla her 4 bölümden 1), müzik ve hikâye çeşitli olsun.

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
- `.claude/skills/confirm-brief/SKILL.md`: üretimden önce isteneni geri yaz, kabul ölçütleri, onay kapısı

## Komutlar
```bash
npm install && npx playwright install chromium   # bir kez
npm run pilot                                     # pilot videoyu üret
node render.js episodes/<bolum>.json              # bir bölümü üret
```
Not: Bulut sandbox'ta `CHROMIUM_PATH=/opt/pw-browsers/chromium` gerekir. Mac'te denenmedi, ilk çalıştırmada hata olursa düzelt.
