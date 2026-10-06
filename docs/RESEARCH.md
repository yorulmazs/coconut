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
