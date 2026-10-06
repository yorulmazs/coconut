# Politika ve lisans notları (doğrulanmış)

_Doğrulama tarihi: 2026-10-06. Kural: Politika ve lisans konularında kullanıcıya "kontrol edin" denmez. Birincil kaynaktan doğrula, neyi doğrulayabildiğini ve neyi doğrulayamadığını söyle, en güvenli kararı ver ve uygula._

**Doğrulama yöntemi notu:** Bu bulut ortamında `support.google.com` ve `huggingface.co` ağ engeli (egress) nedeniyle doğrudan açılamadı. YouTube Help ve YouTube Blog sayfalarının içeriği arama aracı üzerinden (resmî sayfalardan alınan özetler) okundu, bu yüzden sayfa metninin kendisi değil özeti görüldü. Kokoro lisansı projenin kendi GitHub dosyalarından doğrulandı.

## 1. Yapay zekâ sesi: YouTube açıklaması (disclosure)
- Kaynaklar: [Disclosing use of GenAI content (YouTube Help)](https://support.google.com/youtube/answer/14328491), [YouTube Blog](https://blog.youtube/news-and-events/disclosing-ai-generated-content/)
- **Kural:** Gerçekçi (bir gerçek kişi, yer veya olayla karıştırılabilecek) değiştirilmiş/sentetik içerik açıklanmalı. Özetlere göre bu, **bir kişinin sesini sentetik olarak üretip videoyu seslendirmeyi de kapsıyor**. Açıkça gerçekçi olmayan, animasyon, özel efekt veya sadece üretim yardımı için yapay zekâ kullanımı açıklama gerektirmiyor. Sürekli açıklama yapmayanlara etiket, içerik kaldırma veya YPP'den çıkarma gibi yaptırımlar var.
- **Belirsizlik:** Tamamen animasyon bir videoda gerçekçi bir yapay zekâ anlatıcı sesinin tam olarak hangi tarafa düştüğünü sayfa metninden doğrudan okuyamadım.
- **KARAR (güvenli taraf):** Yapay zekâ anlatıcı sesi kullanılan **her videoda** "altered or synthetic content" açıklamasını **Evet** yap. Maliyeti düşük (bir etiket), yanlış açıklamama riski daha yüksek. `youtube-skill` manifestinde `contains_synthetic_media: true` olarak ayarlanır.

## 2. Tekrarlayan / seri üretilmiş (inauthentic) içerik ve gelir
- Kaynaklar: [Channel monetization policies (YouTube Help)](https://support.google.com/youtube/answer/1311392), [Expanded YPP safeguards (YouTube Blog)](https://blog.youtube/news-and-events/introducing-expanded-youtube-partner/)
- **Kural:** Şablonla yapılmış veya art arda izlendiğinde tekrar eden, seri üretilmiş içerik YPP için uygun değil. Resmî örnekler arasında:
  - **Karakterlerin aynı durumda tekrar tekrar aynı sonuçla, çok benzer bir hikâye şablonuyla** yer aldığı videolar,
  - minimum anlatı/değer içeren şablonlu hikâyeler,
  - **aynı arka plan müziği ve tekrarlayan yapay zekâ görselleriyle, yapay zekâ yazılı bir metni okuyan** çok sayıda benzer video.
- **BİZİM İÇİN RİSK (ciddi):** "Coconut yabancıdan çekiniyor, sonra ısınıyor" kalıbını her bölümde tekrarlarsak "aynı durum, aynı sonuç" örneğine girer. Ayrıca senaryoyu yapay zekâ yazıyor ve ses de yapay zekâ.
- **KARAR:**
  1. "Çekingen ziyaretçi" yayını en fazla her 4 bölümden 1'i olsun. Diğer bölümler farklı durum, mekân, problem ve **farklı sonuçlarla** olsun (kutu, sayılar, renkler, veteriner, uyku vb., `docs/EPISODE_IDEAS.md`).
  2. Müzik her bölümde aynı olmasın, giriş şarkısı hariç sahneye göre değişsin.
  3. Hikâyelerin kaynağı **gerçek Coconut anıları ve kullanıcının yaratıcı kararları** olsun. Kullanıcı senaryoyu düzenler/onaylar ve kendi eklemelerini yapar. Böylece "insan yaratıcı katkısı" gerçek olur.
  4. Her bölüm özgün hikâye kıvrımı içersin (yeni bir olay, yeni bir sonuç).
- **Dürüst sonuç:** Gelire uygunluğu YouTube karar verir, garanti verilemez.

## 3. "Made for kids" (çocuklara özel) işaretlemesi
- Kaynaklar: [Determining if your content is made for kids](https://support.google.com/youtube/answer/9528076), [Set your channel or video's audience](https://support.google.com/youtube/answer/9527654)
- **Kural:** Çocuklara hitap eden karakterler, hikâyeler ve şarkılar içeren içerik büyük olasılıkla çocuklara özeldir. İşaretlemeyi doğru yapmak **yasal sorumluluk (COPPA vb.)** ve yaratıcıya ait. Her kitleye hitap eden animasyon "genel izleyici" sayılabilir, ama biz 2-5 yaşı hedefliyoruz.
- **KARAR:** Kanal ve tüm videolar **"Evet, çocuklara özel"** olarak işaretlenecek. `youtube-skill` manifestinde `made_for_kids: true`.

## 4. Kokoro TTS lisansı (yapay zekâ sesi)
- Kaynaklar (projenin kendi dosyaları, doğrulandı): [hexgrad/kokoro LICENSE ve README](https://github.com/hexgrad/kokoro) ("Apache-licensed weights", Apache 2.0), [thewh1teagle/kokoro-onnx](https://github.com/thewh1teagle/kokoro-onnx) (kod: MIT, "kokoro model: Apache 2.0").
- **Sonuç:** Apache 2.0 ticari kullanıma izin verir. Çıkan ses dosyalarının kullanımı için ek bir kısıt bulunmadı.
- **Model kartı (Hugging Face, arama aracı üzerinden resmî sayfanın içeriği, 2026-10-06):** Lisans `apache-2.0`. "Ağırlıklar ve resmî ses paketleri Apache-2.0". Eğitim verisi: yalnızca izin verilen/telifsiz ses (kamu malı, Apache/MIT vb. lisanslı) ve **büyük sağlayıcıların kapalı TTS modellerinden üretilmiş sentetik ses**; açık TTS modellerinden veya özel ses klonlarından sentetik veri yok. "Ticari ve ticari olmayan kullanıma hazır".
- **Doğrulanamayan:** Eğitimde kullanılan kapalı sağlayıcıların kendi koşulları (model kartı bunu izinli saydığını belirtiyor, sağlayıcıların koşullarını ayrıca okumadım). Sayfanın kendisi ağ engeli yüzünden doğrudan açılamadı.
- **KARAR:** **Kokoro ses örnekleri (af_heart, af_bella, af_sky, bf_emma) YouTube videolarında ticari olarak kullanılabilir.** Madde 1 (sentetik içerik açıklaması = Evet) ve madde 2 (içerik çeşitliliği) uygulanır. Kalan küçük belirsizlik: eğitim verisindeki kapalı sağlayıcı sentetik sesleri.

## 5. Diğer
- Yapay zekâ sesi seçildi (kullanıcı kendi İngilizce sesini kullanamıyor, aksan farkı).
- Ücretli ses servisleri (ElevenLabs vb.) seçilirse **o an** lisans ve koşulları birincil kaynaktan doğrulanacak (henüz doğrulanmadı).

## 6. Ses klonlama (kullanıcının kendi sesinden Amerikan aksanlı İngilizce)
_Doğrulama: 2026-10-06. Claude sesi dinleyemez (ses girdisi yok), klonlama ve sentez araçlarla yapılır. Bu ortamda denenemedi: Hugging Face ağ engeli (model dosyaları inmiyor) ve kullanıcının ses örneği henüz yok._

| Araç | Lisans (birincil kaynakta doğrulandı) | Ticari | Not |
|---|---|---|---|
| [Chatterbox](https://github.com/resemble-ai/chatterbox) | Kod: MIT (LICENSE okundu) | Evet | Kısa referans sesten klonlama. README: referans klibin dili hedef dil etiketiyle uyuşmazsa **çıktı referansın aksanını miras alabilir**, bunu azaltmak için `cfg_weight=0` öneriliyor |
| [OpenVoice](https://github.com/myshell-ai/OpenVoice) | V1 ve V2: MIT (README: "Free for both commercial and research use") | Evet | Ton rengi klonlama, stil/aksan kontrolü |
| [F5-TTS](https://github.com/SWivid/F5-TTS) | Kod MIT, **ağırlıklar CC-BY-NC** (README) | **HAYIR** | Gelirli kanalda kullanma |
| XTTS v2 (Coqui) | Coqui Public Model License, ticari değil (arama kaynaklarına göre, birincil kaynakta doğrulanmadı) | **HAYIR (varsayım, güvenli taraf)** | Kullanma |
| [ElevenLabs](https://elevenlabs.io/terms-of-use) | Resmî sayfalar (arama özeti): ücretsiz planda ticari kullanım yok, ücretli planlarda var; kendi sesinizi klonlamak serbest, ticari haklar Creator planından itibaren | Ücretli planda evet | Kullanıcı sesini ElevenLabs'a **kalıcı, geri alınamaz, alt lisanslanabilir bir lisansla** (hizmeti sunmak/geliştirmek için) veriyor. Gizlilik açısından bilinçli karar gerekir |

**Kararlar:**
- Klonlanmış kendi ses de **sentetiktir**: madde 1 geçerli, "altered or synthetic content" = Evet.
- Aksan: Amerikan aksanı garanti edilemez. Referans klip Türk aksanlı İngilizce veya Türkçe ise çıktı aksanı taşıyabilir (Chatterbox README). Bu yüzden klonlama yolu **önce test edilecek** (kullanıcı örnek kaydı + A/B dinleme), Kokoro (klonlama yok, Amerikan sesler hazır) yedek yol.
