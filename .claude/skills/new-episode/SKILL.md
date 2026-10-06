---
name: new-episode
description: Yeni bir Coconut bölümü başlatır: senaryo iskeleti, episodes/*.json zaman çizelgesi ve kontrol listesi. Kullanıcı "yeni bölüm", "bölüm 2 yapalım" gibi bir şey söylediğinde kullan.
---

# Yeni bölüm iskeleti

0. **Önce `confirm-brief` becerisini uygula** ve `docs/BRIEF.md` oku. Kullanıcı "yeni video yap" diyene kadar 4. adımdaki render'a ve herhangi bir video gönderimine GEÇME.
1. `docs/EPISODE_IDEAS.md` ve `docs/STATUS.md` oku. Hangi fikir seçilecek? Belirsizse kullanıcıya sor.
2. `script-writer` ajanıyla senaryoyu `docs/scripts/<epNN-ad>.md` olarak yaz (İngilizce).
3. `episodes/pilot-visitor.json` dosyasını şablon alıp `episodes/<epNN-ad>.json` oluştur:
   - `duration` senaryo süresine göre
   - `keys` (offsetY, eyeWide, grumpy, earAngle, tilt, tailAmp, tailSpeed) sahnelere göre
   - `bubbles` ve `captions` senaryodan
   - ses varsa `audio` ve `mouthCues` (Rhubarb çıktısı) ekle
4. `node render.js episodes/<epNN-ad>.json` ile üret (sandbox'ta `CHROMIUM_PATH=/opt/pw-browsers/chromium`).
5. `episode-reviewer` ajanıyla denetle.
6. `docs/STATUS.md` dosyasını güncelle.

Karakteri **asla** bölüm dosyasında veya render koduna kopyalayarak değiştirme. Değişiklik gerekiyorsa `character/` altında yap ve `CHARACTER_BIBLE.md`'yi güncelle.
