# BRIEF: Kullanıcının kalıcı istekleri ve kalite çıtası

Her üretimden önce bunu oku. Kullanıcı bir şeyi bir kez söylediyse tekrar söyletme.

## Süreç kuralı
- **Kullanıcı açıkça "yeni video yap" (veya eşdeğeri) demeden video üretme veya gönderme.** Her video için ayrı onay gerekir. (Kod geliştirmek ve kendi kontrolün için tek kare PNG üretmek serbest, kullanıcıya gönderme.)
- Üretimden önce `confirm-brief` becerisini uygula: isteneni geri yaz, kabul ölçütlerini çıkar, onay al.

- **Politika/lisans:** Kullanıcıya "kontrol edin" deme. Kendin birincil kaynaktan doğrula ve en güvenli kararı uygula (bkz. `docs/POLICY_NOTES.md`). Bu bundan sonra HER ZAMAN geçerli (kullanıcının açık talimatı, 2026-10-06).
- **Soru-cevap tarzı (kullanıcı birkaç kez uyardı):** Soru sorulunca tam araştır, emin ol, SONRA kesin cevap ver. Cevabı "doğrulamadım/okumadım/karar sizde" ile açık bırakma. Açık nokta kalırsa kapatmak için araştırmaya devam et. Öneri araştırmaya dayansın.
- **Sayılar ve sistem verileri:** Oturum kaydındaki veya sistemdeki bir sayıyı (maliyet, limit, kullanım) ne anlama geldiğini resmî belgeden doğrulamadan kullanıcıya söyleme. (2026-10-06: oturum kaydındaki `cost_usd` alanı "18 dolar maliyet" diye yanlış sunuldu. Doğrusu: Pro/Max'ta kullanım aboneliğe dahil, bu rakam faturalama için geçerli değil, sadece token sayısından liste fiyatıyla yapılan tahmin. Kaynak: https://code.claude.com/docs/en/costs)
- **Format (araştırılıp karar verildi):** Coconut konuşmaz, anlatıcı hikâyeyi anlatır, Coconut'ın hareketleri izletilir, bölümler öğretici. Ayrıntı `CLAUDE.md` ve `docs/RESEARCH.md`.
- **Ses:** Kullanıcı İngilizceyi kendi sesiyle yapamıyor (aksan). Yapay zekâ sesi kullanılacak (Kokoro denemeleri: af_heart, af_bella, af_sky, bf_emma). Kanal sesi **af_heart** olarak seçildi (Kokoro kalite notu A, Amerikan). Kullanıcı farklı isterse değiştirilir.

## Kalite çıtası (EP00 geri bildirimi, 2026-10-06)
Kullanıcı ilk EP00 taslağı için dedi ki: **"çok basit olmuş, hiç hareket yok, ben gerçek animasyon istiyorum."** ve **"Coconut'ın tasması yamuk duruyor."**

Kabul ölçütleri (her bölümde kontrol et):
1. **Gerçek animasyon:** Sadece kuyruk sallama/göz kırpma yetmez. Gövde nefesi ve ağırlık aktarımı, kafa dönüşü ve eğilmesi, bakış yönü (göz hareketi), kulakların bağımsız hareketi, patilerin kalkması/sallanması, zıplama/ezilme-esneme (squash & stretch), sahnede hareket eden öğeler (kapı, ziyaretçi, kamera yakınlaşması), süzülen kalpler gibi efektler olmalı. **Hiçbir sahnede 4-5 saniyeden uzun süre neredeyse hiçbir şeyin hareket etmediği an olmamalı.**
2. **Tasma düzgün:** Boyunda simetrik bir bant olarak oturmalı, gövdeyle birlikte hareket etmeli, kafa eğilince yamulmamalı. Örgü çiçek bir yanda, çıngırak ve sarı çiçek künye ortadan sarkmalı ve hafifçe sallanmalı.
3. Karakter her karede `CHARACTER_BIBLE.md` ile uyumlu.

## Görsel zenginlik (EP00 10 sn geri bildirimi, 2026-10-06)
Kullanıcı EP00 10 sn karelerine bakıp dedi ki: **"3-4 yaşında bir çocuk gözüyle bak: daha canlı renkler, daha farklı bir atmosfer daha dikkat çekici olmaz mı? Animasyonu zenginleştirmemiz lazım."**
Tespit (karelerden): duvar, zemin, tünel, tasma, alt yazı yastığı hep bej/krem; doygunluk çok düşük, Coconut ve krem tasma zeminle kaynaşıyor; büyük boş duvar; ortamda hiçbir şey hareket etmiyor; alt yazı tünelin üstüne yazılmış; ziyaretçi küçük ve düz.
Kabul ölçütleri (her bölümde):
4. **Canlı, sıcak, aydınlık palet:** sahne renkleri orta-yüksek doygunlukta, bej/gri ağırlıklı "soluk" sahne yok. Coconut'ın kendi renkleri değişmez (`CHARACTER_BIBLE.md`), sahne onu öne çıkaracak şekilde seçilir (gri kedi ve krem tasma arka plandan net ayrılmalı).
5. **Derinlik ve ışık:** en az 3 katman (arka duvar/pencere, orta mekân, ön plan), güneş ışığı/gölge, kamera hareketinde katmanlar farklı hızda kayar.
6. **Ortamda yavaş canlılık:** pencerede bulut/kuş, sallanan bitki gibi 2-3 yavaş hareket. Karakterin yüzünün arkasında yoğun detay yok (dikkat dağıtma).
7. **Hikâye nesneleri en canlı renkte** (ör. kırmızı top), çocuğun gözü nereye bakacağını bilsin.
8. **Bölüme göre farklı atmosfer:** mekân, saat, hava değişsin (güneşli öğleden sonra, gece, yağmurlu gün).
9. **Sınırlar:** yanıp sönen ışık yok, hızlı kesme yok, sakin tempo.

## Dürüst sınır (kullanıcıya söylendi)
Kod tabanlı sistemle çıkan en iyi sonuç "iyi hazırlanmış kesme-kâğıt animasyonu"dur, profesyonel çizgi film kalitesi değildir. Daha fazlası için illüstratör çizimi + gerçek animasyon aracı (Synfig/OpenToonz/Moho) gerekir.

## Diğer kalıcı istekler
- Dil: sadece İngilizce (kanal içeriği). Kullanıcıyla Türkçe konuş.
- Mac kullanıyor.
- İlk video: Coconut'ı tanıtma videosu (EP00).
