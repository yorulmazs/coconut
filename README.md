# Coconut Studio

Coconut the Cat bölümlerini bir JSON zaman çizelgesinden otomatik MP4 yapar. Karakter tek dosyadan geldiği için her bölümde birebir aynı kedi çıkar.

## Mac kurulumu (bir kez)

1. **Terminal**'i açın (Spotlight: `Terminal`).
2. Node.js yoksa kurun (Homebrew ile):
   ```bash
   brew install node
   ```
   (Homebrew yoksa https://brew.sh adresindeki tek satırlık komutu çalıştırın, ya da https://nodejs.org adresinden Node.js'i indirin.)
3. Proje klasörüne girin ve bağımlılıkları kurun:
   ```bash
   cd coconut-studio
   npm install
   npx playwright install chromium
   ```

## Pilot videoyu üretin

```bash
npm run pilot
```

Çıktı: `out/pilot-visitor.mp4`

## Yeni bölüm yapmak

1. `episodes/pilot-visitor.json` dosyasını kopyalayıp yeni bir isim verin (ör. `episodes/ep02-box.json`).
2. `keys` içinde parametreleri zamana göre değiştirin (`offsetY`, `earAngle`, `tilt`, `grumpy`, `eyeWide`...).
3. `bubbles` (konuşma balonu) ve `captions` (alt yazı) ekleyin.
4. Çalıştırın:
   ```bash
   node render.js episodes/ep02-box.json
   ```

## Seslendirme + ağız senkronu

1. Sesinizi **WAV** olarak kaydedin (Mac'te QuickTime/GarageBand, sonra WAV'e çevirin).
2. [Rhubarb Lip Sync](https://github.com/DanielSWolf/rhubarb-lip-sync/releases) Mac sürümünü indirin ve ağız verisi üretin:
   ```bash
   ./rhubarb -f json -o episodes/ep02-voice.json episodes/ep02-voice.wav
   ```
3. Bölüm JSON'una ekleyin:
   ```json
   "audio": "ep02-voice.wav",
   "mouthCues": "ep02-voice.json"
   ```

Coconut konuşurken ağız şekilleri otomatik değişir. Ses dosyası videoya eklenir.

## Önemli
- Karakteri **sadece** `character/coconut.js` ve `character/palette.json` içinde değiştirin. Ayrıntılar: `CHARACTER_BIBLE.md`.
- Yeni bir mekân için `scenes/room.js` içine yeni bir arka plan ekleyin.

## Ses üretimi (Kokoro) ve ağız verisi (Rhubarb)

Her bölümün sesini bir `*.voice.json` dosyası tanımlar (kim, ne zaman, ne diyor). Örnek: `episodes/ep00-meet-coconut-10s.voice.json`.

Kurulum (bir kez, Mac):
```bash
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
```
Rhubarb Lip Sync'in Mac sürümünü https://github.com/DanielSWolf/rhubarb-lip-sync/releases adresinden indirip açın.

Üretim:
```bash
RHUBARB=/yol/rhubarb python tools/make_voice.py episodes/ep00-meet-coconut-10s.voice.json
```
Çıktılar `out/voice/<bolum>/` altına (her satır ayrı WAV, `mix.wav`, `report.json` zamanlama raporu) ve `episodes/<bolum>.mouth.json` olarak yazılır. Kokoro model dosyaları (~350 MB) ilk çalıştırmada `models/` klasörüne indirilir (git'e girmez). Bölüm JSON'unda `audio` ve `mouthCues` alanları bunlara bağlıdır.
