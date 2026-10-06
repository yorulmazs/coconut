# Animasyon oyun kitabı (Coconut)

Kaynaklar (kendi cümlelerimle özetlendi, kopyalanmadı): Disney'in 12 prensibi, `vibe-motion/skills` içindeki `disney-animation-rule-skill`, `dylantarre/animation-principles` (MIT), `lottiefiles/motion-design-skill` (MIT). Her bölümden önce bunu oku, sonra `docs/BRIEF.md` ile birlikte kontrol listesi olarak kullan.

## Çalışma sırası (her sahne için)
1. Eylemi tek cümleyle yaz: kim, ne yapıyor, hangi duyguyla? (ör. "Coconut kapı zilinden irkilip saklanıyor, korkmuş ama meraklı")
2. **Önce ana hareketi** (konum, zamanlama) sade haliyle kur. Efekt (kalp, sallanma) sonra gelir.
3. Anahtar pozları sırayla belirle: hazırlık → harekete geçiş → tepe/karar noktası → temas → aşma (overshoot) → yerleşme.
4. İkincil hareketi (kuyruk, kulak, çıngırak) ana harekete göre **geç başlat, geç bitir**.
5. Tek kareleri kontrol et: poz tek kareden okunuyor mu (siluet net mi)?

## Prensipler ve bizim motorda karşılığı
| Prensip | Nasıl uygularız (parametre) |
|---|---|
| **Ezilme-esneme** | Sadece hızlanma/temas anlarında. `squashY` küçülürken `squashX` büyür (hacim korunur). Sürekli uygulama |
| **Hazırlık (anticipation)** | Zıplamadan önce kısa çömelme: `offsetY` +10, `squashY` 0.9, sonra fırlama. Hareketin tersi yönünde küçük bir geri çekilme |
| **Takip ve örtüşme** | Kuyruk ucu (`tailTip`) gövdeden gecikmeli, kulaklar ve çıngırak (`bell`) kafadan geç salınır ve geç durur |
| **Yavaş giriş-çıkış** | Anahtarlar arası yumuşak geçiş zaten var. Hızlı eylemde anahtarları sıkıştır, sakin eylemde aç |
| **Yaylar (arcs)** | Kafa ve pati düz çizgide değil kavisle gider: `tilt` + `headBob` birlikte kullan |
| **İkincil hareket** | Gözler, kulak seğirmesi, kuyruk. Ana eylemle yarışmasın, onu desteklesin |
| **Zamanlama** | Çocuk içeriği: sakin, ama hiçbir şey 2 sn'den uzun durağan kalmasın. Önemli an öncesi kısa bekleme (hold) |
| **Abartı** | Sadece bir iki kanalda abart (irkilme anında göz büyür, kulak yatar). Hepsini aynı anda değil |
| **Sahneleme** | Her an tek bir şey dikkat çeksin. Koyu kedi, açık arka plan: siluet net kalsın |
| **Çekicilik (appeal)** | Büyük göz ve ciddi bakış Coconut'ın imzası. Her ifadede göz ve kaş farkı okunsun |

## Sık hatalar (kaçın)
- Her özellik için aynı yumuşatma eğrisini kullanmak (mekanik görünür)
- Simetrik zıplama (çıkış ve iniş aynı hız): iniş daha hızlı, yerleşme daha uzun olsun
- Sürekli sallanan "yüzen" öğe: sallanma bir olaydan (zıplama, dönüş) doğmalı
- Aynı anda her şeyi hareket ettirmek: önce ana, sonra ikincil, sonra efekt
- Zayıf pozu efektle (kalp, parıltı) örtmek

## Çocuk içeriği tempo kuralları
- Sakin tempo, hızlı kesme ve yanıp sönen ışık yok
- Tekrar ve beklenti (aynı hareket kalıbını tekrar etmek) küçük izleyiciyi tutar
- Karakter duygusu büyük ve net okunmalı: büyük gülümseme, yumuşak bakış, basit hareketler
- Not: Bunlar web aramasından gelen genel öneriler, tek bir güvenilir depo yok. Kanal ilerledikçe kendi izlenme verimizle test edilecek

## Bilinen zayıf noktalarımız ve planı
| Zayıf nokta | Plan |
|---|---|
| Kalkan pati beyaz leke gibi okunuyor | Patiyi gövde silüetinden dışarıda tut, kol çizgisini kalın ve temiz çiz |
| Yürüme / yan görünüş yok | Yan görünüş varlık seti + yürüme döngüsü (4 anahtar poz: temas, geçiş, tepe, geçiş) |
| Ziyaretçi çocuk çok basit | Ayrı bir karakter kılavuzu + ifade seti |
| Ses yok, ağız hareketi sahte | Gerçek ses + Rhubarb |
| Çeşitli ifadeler az | 5 ifade seti: ciddi, şaşkın, mutlu (kapalı göz), uykulu, meraklı |

## Gözden geçirme kontrol listesi (video göndermeden önce)
- [ ] Eylem 3-4 tek kareden okunuyor mu?
- [ ] Hazırlık hareket yönünün tersine mi?
- [ ] İkincil hareket ana hareketten sonra mı başlıyor/bitiyor?
- [ ] Beklemelerde (hold) tüm kanallar donmuş mu? (Hayır olmalı: nefes, göz, kulak devam etmeli)
- [ ] Ezilme-esneme sadece ivme/temas anlarında mı?
- [ ] Hiçbir efekt zayıf pozu örtmüyor mu?
- [ ] 2 saniyeden uzun durağan an yok mu?
- [ ] Aynı kare tekrar tekrar mı: her kare aynı girdiyle aynı sonucu veriyor mu (rastgelelik yok)?
