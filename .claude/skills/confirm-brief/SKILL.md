---
name: confirm-brief
description: Coconut için HER üretimden önce (video, görsel, animasyon, senaryo, karakter değişikliği) kullan. İstenileni geri yazar, kabul ölçütlerini çıkarır, kullanıcı onaylamadan üretime geçmez. Kullanıcının tekrar tekrar aynı geri bildirimi vermesini engeller.
---

# Üretim kapısı: önce anla, onay al, sonra üret

Bu beceri, sonuçları tekrar tekrar düzeltmek zorunda kalmamak için var. **Üretim = video render, MP4 gönderme, yeni görsel, yeni sahne, karakter çizimi değişikliği.**

## Adımlar
1. **Oku:** `CLAUDE.md`, `docs/BRIEF.md` (kullanıcının kalıcı istekleri ve kalite çıtası), `CHARACTER_BIBLE.md`.
2. **Geri yaz (kısa):** Kullanıcının bu istekte ne istediğini 3-6 madde olarak yaz. "Söylediğin" ile "benim varsayımım"ı ayır.
3. **Kabul ölçütleri:** Bu işin "bitti" sayılması için ne görülmesi gerektiğini yaz (ör. "tasma boyna simetrik oturuyor", "gövde ve patiler hareket ediyor"). `docs/BRIEF.md` içindeki kalıcı ölçütleri ekle.
4. **Sor (gerekirse):** Belirsiz bir şey varsa **tek odaklı** soru sor. Önceden cevaplanmış şeyi tekrar sorma.
5. **Onay bekle.** Kullanıcı net şekilde "yap", "yeni video yap" veya benzeri demeden **hiçbir video üretme, hiçbir MP4 gönderme.**
   - Kodu geliştirmek ve tek kare (PNG) kontrol etmek serbest, ama kullanıcıya video gönderme.
6. **Üret → kendin denetle → sun:** Üretince kabul ölçütlerini kareleri bakarak tek tek kontrol et. Sağlanmayanı düzeltmeden "bitti" deme. Sunarken ölçütlerin hangisinin sağlandığını ve **hangisinin sağlanmadığını** dürüstçe yaz.
7. Her yeni video için kullanıcıdan **ayrı onay** al. Önceki onay sonrakini kapsamaz.

## Yasaklar
- Onaysız yeni video üretmek veya göndermek
- Kullanıcının daha önce verdiği geri bildirimi (BRIEF.md) yok saymak
- Test etmediğin şeyi "çalışıyor" demek
