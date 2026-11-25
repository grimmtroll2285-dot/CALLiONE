<p align="center"><img src="assets/callione-banner-v2.png" alt="CALLiONE — Play no limit. Illustrated artwork with Kolyvan and a PS5." width="100%"></p>

<h1 align="center">🎮 CALLiONE</h1>
<p align="center"><b>One PS5. One dashboard. Your games.</b><br>PLAY NO LIMIT · by SirenaGoloviy</p>
<p align="center">🧪 Private testing · 🌍 English / Русский · 🛠️ Built from TITAN</p>

CALLiONE brings system FPKGs, Kraken homebrew and ShadowMount images into one interface for a jailbroken PS5. Each format keeps its own launch path.

### ⚡ What it does

| Your games | How they run |
| --- | --- |
| 🎮 System-installed FPKGs | PS5 system + kstuff |
| 🐙 Compatible PKGs and game folders in `homebrew` | Kraken + AMPR |
| 💿 Supported images, including `.exfat` | ShadowMountPlus |

📦 System installation and homebrew copying are separate actions. CALLiONE also provides installation progress, storage tools, diagnostic logs and game-specific PlayGo / backport settings.

**🧪 Announcement only:** public builds and source code are not published here yet. Compatibility testing is ongoing. PS4Mount is a **separate experiment**, not part of the main build.

### 🖥️ Inside CALLiONE

*Actual PC interface previews with demonstration data; no console connected. Banner above is generated artwork.*

![CALLiONE home — English interface preview](assets/home-en.png)

<details>
<summary><b>📸 More screenshots — Library & Add games</b></summary>

![CALLiONE library — English interface preview](assets/library-en.png)

![CALLiONE Add games — English interface preview](assets/add-games-en.png)

</details>

<details>
<summary><b>📖 Quick guide for testers</b></summary>

1. Restart PS5, run your usual jailbreak and send the supplied CALLiONE ELF through Payload Manager. Do not load extra copies of TITAN, kstuff or ShadowMount alongside it.
2. Open the CALLiONE tile or `http://PS5-IP:8098/`.
3. **Add games → Install to PS5:** select a compatible FPKG on USB or in `/data/pkg-install/`. The system chooses the destination; wait for installation to finish before disconnecting USB.
4. **Copy to homebrew:** prepares a separate Kraken library. Its roots are `/data/homebrew/` and `homebrew/` on supported external drives. Images use ShadowMountPlus.

**FTP:** upload to `/data/pkg-install/`, which Kraken does not scan. Finish the transfer before installing; `.part` → `.pkg` is an optional way to mark completion.

**Report a problem:** build + firmware, Title ID/version, format, internal/USB drive, steps, photo and `/data/callione/callione.log`. Compatibility varies; a backport catalog requires configured compatible sources.

</details>

<details>
<summary><b>❤️ Credits & testers</b></summary>

Built on [TITAN](https://github.com/grimmtroll2285-dot/TITAN) and the TITAN CORE foundation by **devchmod**; [Kraken Mount](https://github.com/quer3q/kraken-mount) and [ampr-emu-ng](https://github.com/quer3q/ampr-emu-ng) by **quer3q**; [kstuff](https://github.com/EchoStretch/kstuff-lite), **EchoStretch** and contributors; [ShadowMountPlus](https://github.com/drakmor/ShadowMountPlus) by **drakmor**; community PlayGo work and the [PS5 payload SDK](https://github.com/ps5-payload-dev/sdk).

Special thanks to **[@ImN3k1t](https://t.me/ImN3k1t)** and **[@script_durova](https://t.me/script_durova)** for testing on real consoles. 🤝

</details>

---

<details>
<summary><b>🇷🇺 Русский — нажмите, чтобы раскрыть</b></summary>

### 🎮 Что такое CALLiONE

Единая надгрузка для взломанной PS5 на основе TITAN. Установленные FPKG, игры Kraken и образы ShadowMount доступны из одного интерфейса — у каждого формата свой способ запуска.

- 🎮 **Системные FPKG** — система PS5 и kstuff.
- 🐙 **Совместимые PKG и папки в homebrew** — Kraken / AMPR.
- 💿 **Поддерживаемые образы, включая .exfat** — ShadowMountPlus.
- 🛠️ Прогресс установки, хранилище, журналы, выбор игр для PlayGo и настройки бэкпортов. Каталогу бэкпортов нужны настроенные совместимые источники.

**🧪 Пока закрытое тестирование.** Здесь только анонс и скриншоты; публичных ELF и исходников ещё нет. PS4Mount сделан отдельным экспериментом и не входит в основной CALLiONE.

### 📖 Как пользоваться тестовой сборкой

1. Полностью перезагрузите PS5, выполните свой jailbreak и отправьте выданный ELF через Payload Manager. Дополнительные TITAN, kstuff и ShadowMount поверх не запускайте.
2. Откройте плитку CALLiONE или `http://IP-PS5:8098/`.
3. **Добавить игры → Установить в систему:** выберите совместимый FPKG на USB или в `/data/pkg-install/`. Место выбирает PS5. До завершения установки не отключайте накопитель.
4. **Скопировать в homebrew** — отдельный режим для Kraken. Он использует `/data/homebrew/` и `homebrew/` на поддерживаемых внешних дисках. Образы обслуживает ShadowMountPlus.

📂 **По FTP:** загружайте установочные PKG в `/data/pkg-install/` — Kraken эту папку не сканирует. Дождитесь полной передачи. При желании загружайте как `.part`, затем переименуйте в `.pkg`.

🩺 **При ошибке:** версия сборки и прошивки, Title ID/версия игры, формат, внутренний диск или USB, действия перед сбоем, фото и `/data/callione/callione.log`. Совместимость всех игр и прошивок пока не подтверждена.

📸 Скриншоты выше — настоящий предпросмотр интерфейса на ПК с демонстрационными данными, без консоли. Баннер — сгенерированная иллюстрация.

❤️ Спасибо авторам компонентов из блока **Credits & testers**, а также тестерам **[@ImN3k1t](https://t.me/ImN3k1t)** и **[@script_durova](https://t.me/script_durova)** за проверки на настоящих PS5!

</details>
