# Araç taraması ve kararlar

## Kullanılacak / kullanılabilir
| Araç | Karar | Neden |
|---|---|---|
| [Rhubarb Lip Sync](https://github.com/DanielSWolf/rhubarb-lip-sync) v1.14.0 | **Kullan** | Ses → ağız şekilleri (A-H, X). Linux binary'si çalıştı, `--version` doğrulandı. Gerçek konuşma kaydıyla denenmedi |
| [youtube-skill](https://github.com/junjunjunbong/youtube-skill) | **Kullan (yükleme için)** | ~635 satır, kod okundu. Sadece Google API'ye bağlanıyor, token 0600, varsayılan dry-run/private, made_for_kids zorunlu. Testler geçti. Yükleme betiği çalıştırılmadı |
| [hexgrad/kokoro](https://github.com/hexgrad/kokoro) | Taslak ses için olası | Apache 2.0, İngilizce, hafif. Çocuk içeriğinde insan sesi tercih edilir |
| [ai-video-captions](https://github.com/nicolaigaina/ai-video-captions) | Instagram Reels için olası | MIT, Whisper + FFmpeg, kelime kelime altyazı |
| [Beat](https://github.com/lmparppei/Beat) | Mac'te senaryo yazımı için olası | Mac'e özel Fountain editörü, GPL (arama sonucuna göre) |
| [thorwhalen/an](https://github.com/thorwhalen/an) | **Test edilmedi, fikir kaynağı** | `scene.md` → 2D cutout animasyon, 9 viseme. Alfa. Coconut'ı içeri aktarma kolaylığı bilinmiyor |
| [remotion-voicevox-template](https://github.com/nyanko3141592/remotion-voicevox-template) | Fikir kaynağı | Remotion + YAML + ağız hareketi. Japonca VOICEVOX'a bağlı |

## Kullanma
| Araç | Neden hayır |
|---|---|
| AgentTube (darkzOGx/youtube-automation-agent) | Karakter tutarlılığı yok, bilgilendirici kanallara yönelik, README başlığında kripto token adresi var, tam otomatik düşük emekli içerik çocuk içeriğinde politika riski |
| tokland/youtube-upload, tkersten09/youtube-batch | 2018-2020, eski OAuth, bakımsız |
| LLM Council (karpathy / sarangsmk) | Kimlik doğrulama yok, her soru 9+ ücretli çağrı, lisans yok, bizim darboğaz değil |
| ECC (affaan-m/ECC) | Yazılım ekipleri için ağır iş akışı paketi, bizim için gereksiz. İleride `remotion-video-creation` ve `content-engine` becerilerine bakılabilir |
| Stretchy Studio | Çalışıyor ama "See-Through" modeli anime/VTuber çizimine göre eğitilmiş, sade çizgi film kedisine uymayabilir |
| Tam otomatik yapay zekâ video platformları (Atlabs, Mootion, LongStories) | Ana karakter tutarlılığı garanti değil. Denenmedi. Sadece yardımcı sahneler için düşünülebilir |

## Test edilmeyenler (sonra bakılabilir)
Piper TTS, CharForge (tek görselden karakter LoRA), BetterFountain.

## Animasyon kalitesi için bakılanlar (2026-10-06)
| Repo | Karar | Not |
|---|---|---|
| [vibe-motion/skills](https://github.com/vibe-motion/skills) `disney-animation-rule-skill` | **Fikir kaynağı** | Prosedürel (SVG/Remotion) animasyon için 12 prensip kuralları, faz tablosu, kontrol listesi. Tam bizim yaklaşımımıza uyuyor. Kök dizinde lisans dosyası görmedim, bu yüzden kopyalamadım, fikirleri kendi cümlelerimle `docs/ANIMATION_PLAYBOOK.md`'ye yazdım |
| [dylantarre/animation-principles](https://github.com/dylantarre/animation-principles) | **Fikir kaynağı** (MIT) | Prensip başına beceriler (squash-stretch, anticipation, follow-through...). Arayüz animasyonu odaklı ama prensip kısımları işe yarar |
| [lottiefiles/motion-design-skill](https://github.com/lottiefiles/motion-design-skill) | **Fikir kaynağı** (MIT) | Zamanlama/yumuşatma tabloları, kalite kontrol listesi, sorun giderme. Arayüz odaklı |
| [GenielabsOpenSource/spine-animation-ai](https://github.com/GenielabsOpenSource/spine-animation-ai) | **KULLANMA** | PolyForm Noncommercial lisansı: ticari kullanıma izin vermez, YouTube'dan gelir elde edilecek bir kanalda kullanılamaz |
| Çocuk içeriği tempo rehberi | Depo bulunamadı | Sadece genel web önerileri var, kaynak güvenilirliği düşük |

## YouTube'da animasyon yapanlar nasıl çalışıyor (2026-10-06)
**Güvenilirlik uyarısı:** Sonuçlar ağırlıklı olarak serbest çalışma ilanları ve SEO blogları. Çocuk kanalı yapan kişilerin kendi anlattığı güvenilir bir kaynak bulunamadı. Genel tablo olarak oku.

**İş akışı:** Ön hazırlık (senaryo, kaba storyboard) → üretim (karakter ve arka plan, animasyon, ağız senkronu) → son işlem (montaj, ses, müzik, çıktı). Büyük kanallar rolleri ayırır; küçükler karakteri bir kez çizip yeniden kullanılabilir rig yapar. [Kaynak](https://cloud.motorsport.unibo.it/article/how-to-create-a-cartoon-video-from-concept-to-screen)

**Araçlar** ([karşılaştırma](https://www.bloopanimation.com/character-animator-vs-toon-boom/)): Adobe Character Animator (canlı performans yakalama, konuşma ağırlıklı işlere uygun, aksiyonda zayıf), Moho (yeniden kullanılabilir 2D rig, tek seferlik ~$400), Toon Boom Harmony (sektör standardı, $25-117/ay), Cartoon Animator, Blender Grease Pencil, After Effects, Adobe Animate. Fiyatlar kaynağa göre, doğrulanmadı.

**Maliyet** ([kaynak](https://zelios.agency/pricing-guide-cost-of-2d-animation-per-minute-worldwide/)): 2D animasyon dakika başı serbest çalışan ~$50-300, küçük stüdyo ~$300-30.000, ABD $3.000-10.000, Hindistan/Filipinler $500-3.000. Bölüm başına süre için güvenilir rakam bulunamadı.

**YouTube kuralları:**
- *Inauthentic content* politikası ([Temmuz 2025](https://alternativeto.net/news/2025/7/youtube-updates-its-policy-to-demonetize-inauthentic-mass-produced-ai-generated-content)): şablon/tekrar eden, neredeyse aynı, özgünlüğü az videolar gelir elde edemeyebilir. Yapay zekâ kullanmak yasak değil. **Sonuç: her bölüm farklı hikâye, gerçek ses, gerçek Coconut bağlantısı olsun, şablon bölüm tekrarlama.**
- *Made for Kids* ([kaynak](https://www.vidiq.com/blog/post/make-money-kids-youtube-channel)): kişiselleştirilmiş reklam, yorumlar ve bazı özellikler kapalı, CPM düşük (kaynaklara göre genel animasyon ~$1-3, eğitici ~$4-7). Reklam geliri tek başına yetmeyebilir. YouTube Kids'te görünme avantajı. **Gelir beklentisi düşük tutulacak, Instagram ve ürünler çeşitlendirme için düşünülecek (varsayım).**

## YouTube ile ilgili repo taraması (2026-10-06)
| Repo / araç | Ne yapıyor | Karar |
|---|---|---|
| [parafoxia/analytix](https://github.com/parafoxia/analytix) | YouTube Analytics API için Python SDK, rapor dışa aktarma (CSV, pandas), OAuth. BSD-3, son commit Mart 2026. Klonlandı ve README/lisans incelendi, çalıştırılmadı | **Kanal açılınca kullan** (izlenme, tutulma raporları). `pip install analytix`. Hangi metriklerin (ör. gösterim tıklama oranı) API'den geldiğini doğrulamadım |
| [Thomas-George-T/Streamlit-YouTube-Dashboard](https://github.com/Thomas-George-T/Streamlit-YouTube-Dashboard) | Tek video için yorum/beğeni özeti | **Gereksiz.** Made for Kids videolarında yorum kapalı |
| YouTube thumbnail/başlık A/B testi | Açık kaynak depo **bulunamadı**. Ticari araçlar var (ThumbnailTest, VidAnalyze), YouTube'un kendi "Test & Compare" özelliği de var | Kanal büyüyünce YouTube'un kendi özelliğine bak |
| YouTube anahtar kelime/etiket araçları | Açık kaynak depo bulunamadı, çoğu ücretli/Apify servisi | Gerekirse elle YouTube arama önerilerine bak |
| Altyazı (SRT) yükleme | Hazır güvenilir depo bulunamadı. `google-api-python-client` ile yapılabilir, `youtube-skill` ile birlikte düşünülür | Kendi betiğimiz, ihtiyaç olunca |
| Shorts için 9:16 kesit çıkarma (AutoShorts vb.) | Canlı çekim videolar için (yüz takibi, Whisper). Depo adresini doğrulayamadım | **Gereksiz.** Kendi render'ımız animasyonu doğrudan 9:16 üretebilir (render ayarı eklenecek) |

## Konuşan Coconut mu, sessiz Coconut + anlatıcı mı? (2026-10-06)
**Kaynak kalitesi:** Bulgular genel çocuk gelişimi araştırmaları ve yayın sektörü yazılarından; ne konuşan karakter ne de sessiz karakter formatını doğrudan karşılaştıran güçlü bir çalışma buldum. Karar araştırma + bizim kısıtlarımızın birleşiminden.
- Görsel olarak anlatılan (animasyonlu) hikâyeler küçük çocuklar için işlemesi daha kolay, anlatı kurma, kelime çeşitliliği ve fiil kullanımı kitaba göre daha yüksek bulunmuş ([PMC çalışması](https://pmc.ncbi.nlm.nih.gov/articles/PMC9292601/)). Çoklu ortam hikâyeler özellikle ikinci dil öğrenen çocuklarda kelime öğrenmeyi destekliyor.
- Çocuk-etkileşimli okuma (soru-cevap, katılım) ekranda pasif izlemeden daha iyi sonuç veriyor ([PMC EEG çalışması](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6874384/)). **Çıkarım:** anlatıcı izleyiciye soru sorsun, duraklasın.
- Sessiz hayvan karakterler (Pingu, Shaun the Sheep) küresel erişim ve kolay dublaj sağlıyor, duygu yüz ifadesi, beden dili ve karakter sesleriyle aktarılıyor ([kaynak](https://kidscreen.com/?p=6040)). Ama bu formatta animasyon kalitesi (göz, mimik, hareket) daha da kritik.
- Küçük çocuk kanallarında net öğretici hedef, tekrar ve sade görsel kazanımı artırıyor, gürültü ve hızlı kesme zarar veriyor (genel rehberler, düşük güvenilirlik).

**Bizim kısıtlarımız:** (1) Gerçek Coconut konuşmuyor, Instagram bağlantısı için doğal. (2) Coconut'a yapay zekâ ses vermek (tizleştirilmiş Kokoro) yapay duruyor ve ağız senkronu zayıf noktamız. (3) Sadece anlatıcı sesi olunca dil değiştirmek (ör. Türkçe kanal) çok kolay, animasyon aynen kalır. (4) Ses sentezi bir anlatıcıyla sınırlı kalınca YouTube "sentetik içerik" yükümlülüğümüz de daralıyor. (5) Motorumuzun güçlü yanı hareket ve ifade.

**KARAR:** Coconut konuşmaz, anlatıcı anlatır, bölümler öğretici. Gerçek Coconut'ın miyav/mırıltı kayıtları efekt olarak kullanılacak (kullanıcı kaydedebilir, kayıtta insan sesi ve kişisel bilgi olmasın).

## EP01 konu seçimi: konum kelimeleri (in, on, behind) (2026-10-06)
- **Edinim sırası:** Çocuklar mekân edatlarını her dilde aynı sırayla öğreniyor: önce içerme/destek/örtme (in, on, under), sonra yakınlık (next to, between), en son yansıtmalı ilişkiler (in front of, behind). "In" ve "on" yaklaşık 2-3 yaşta, "behind/in front of" yaklaşık 30-35 ayda ([Cambridge, Journal of Child Language](https://resolve.cambridge.org/core/journals/journal-of-child-language/article/how-do-children-describe-spatial-relationships/56FC690878EF7DBE93346B9F3F5400C6), [The Rehabilitation Journal 2022](https://doaj.org/article/4cf5e9265a8d4ffd9205141e8a38f9b6), [UND tezi](https://commons.und.edu/theses/2794)). **Çıkarım:** in/on/behind seti 2-5 yaş aralığına uyuyor.
- **Kelime öğretimi:** Hedef kelimeden **önce** yapılan dramatik duraklama, sonra yapılan duraklamadan veya hiç duraklamamaktan daha çok kelime öğrenimi sağladı; kelime tekrarı arttıkça öğrenme artıyor; ticari eğitim videolarının temposu çoğu çocuk için fazla hızlı ([Reading Rockets özeti](https://www.readingrockets.org/resources/resource-library/learning-vocabulary-educational-media-role-pedagogical-supports-low), [APS 2018 bildirisi](https://www.psychologicalscience.org/conventions/archive/2018annual/paper/12793/), [ERIC ED614316](https://files.eric.ed.gov/fulltext/ED614316.pdf)). **Çıkarım:** her hedef kelime en az 6 kez, kelimeden önce kısa duraklama ("Coconut is... IN the box!"), izleyiciye soru + 2 sn bekleme, sakin tempo.
- **Neden ziyaretçi hikâyesi değil:** EP00 "çekingen ziyaretçi" arkını kullandı. Çeşitlilik kuralı (`docs/POLICY_NOTES.md` madde 2) gereği EP01 farklı durum ve farklı sonuç.
- **Neden kutu:** Tek karakterle (Coconut) anlatılabiliyor, Mom & Dad ve ziyaretçi varlıkları henüz yok; motorun güçlü yanı olan zıplama/ezilme-esneme ile örtüşüyor; yürüme döngüsü gerektirmiyor; gerçek Coconut'la Instagram eşleşmesi kolay.
