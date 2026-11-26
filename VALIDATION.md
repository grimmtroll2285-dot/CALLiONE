# CALLiONE 0.1.0-dev — выполненные проверки

Дата: 25.11.2026. Это исходники нового проекта, не готовый консольный релиз.

- 39 тестов Rust прошли в `review/callione-tests`: правила путей, ограничения scan paths, настройки, запрет старого автоимпорта, библиотека, PlayGo и политика старта. Suite использует реальные модули проекта. Один унаследованный тест ожидал подготовки системного FPKG через Kraken; ожидание изменено под новое требование, затем suite прошёл целиком.
- C suite владения из адаптера ShadowMountPlus прошёл с `-Wall -Wextra -Werror`: валидация, защита хостов, одновременные повторные claims, лимит таблицы и границы homebrew.
- `cargo check` для `x86_64-ps5-freebsd` с unified-stack прошёл без предупреждений. Это проверка типов/метаданных; финальный payload не линковался. Для проверки include_bytes использовался присланный штатный ELF ShadowMountPlus как данные. Это не означает, что он является адаптером CALLiONE.
- Изменённые `sm_titan.c`, `sm_scan.c`, `sm_api_service.c` прошли `prospero-clang -fsyntax-only` из PS5 SDK.
- Синтаксис извлечённого из итогового HTML JavaScript проверен `node --check`.
- Пересобраны встроенные блоки monitor/features/localization; валидатор каталогов и подстановок прошёл.
- Синтаксис `ps5/build.sh` проверен `bash -n`; CRLF в изменённых shell-файлах исправлен.
- ELF-заголовки/архитектура/границы сегментов, размеры и SHA-256 присланных бинарных файлов проверены. Штатный SMP совпадает с release asset официального 1.7beta12.
- Аватарка в assets и ps5/icon0.png побайтово совпадает с присланным PNG.

## Не выполнено

Не собирались адаптированный SMP и оба этапа CALLiONE ELF. Не проверялись финальная линковка, запуск на PS5, FPKG install/launch, режим покоя, совместимость прошивок или производительность. Нет новой публикации GitHub и подтверждённого исправления Forza. Точное публичное происхождение исходников kstuff 1.15-dr-test2a пока не установлено.

Старые полные тестовые наборы TITAN не выдаются за проверку нового продукта: часть их fixtures предусматривает старую политику импорта установленных PKG. Выполненный отдельный suite и его границы перечислены выше.

Машиночитаемые результаты: [review/CALLIONE_VALIDATION.json](review/CALLIONE_VALIDATION.json).

## CALLiONE interface — 2026-11-25

Replaced the inherited side navigation with top tabs, a cream/orange home screen, three launch-method library filters, and explicit homebrew-copy wording. Native system installation remains an external-installer workflow, clearly disclosed on Add games. Local assets, existing backend APIs and translations remain bundled. No game/cache/launch backend changes.

Checked inline JavaScript with Node, unique HTML IDs and localization placeholders. Viewed the real HTML in the in-app browser using the loopback synthetic fixture on port 8774: system filter showed one system FPKG, Kraken showed two homebrew games, images showed one image. Add games displayed the destination picker and Copy PKG button. These are synthetic browser checks; no CALLiONE ELF was built and no PS5 console behavior was tested.

## Native FPKG installer source — 2026-11-25

Connected the pinned SMP packages/install API to Add games with an explicit system/kraken mode. The worker holds the native work mutex until the service job finishes; USB path validation, running-game gates, shared installer busy state and original preservation remain. System destination is chosen by PS5, not by the homebrew-copy picker. Lost-submit responses are reconciled without resubmitting; unavailable status keeps mutation work blocked. Cancellation is sent only to the owned job ID while the service reports it cancellable. A backend cancellation rejection does not imply cancellation succeeded.

PS5-target unified-stack cargo check passed without warnings. 43 host tests passed, including four new tests for native job identity, native completion, full-transfer-before-completion and unknown-connection busy state. Inline JS syntax, unique HTML IDs and 31-locale placeholder catalogs validated. Synthetic in-app browser check exercised system confirmation, progress, disabled duplicate-submit/mode controls, and cancellation. The fixture never contacts a console or invokes AppInstUtil. No CALLiONE ELF built, no native package installed, no PS5 compatibility result claimed.

## Local test1 ELF build — 2026-11-25

Owner authorized local build and explicitly prohibited GitHub publication. Incoming shadowmountplus (2).elf matches stock 1.7beta12 exactly. Built 1.7beta12-callione1 adapter and both release ELF stages with at most two compiler jobs. Completed build log has no compiler warnings or errors. Missing patch/cmake tools were installed in the WSL build distro; missing SDK stub sources were supplied from the existing local SDK 0.43 source checkout.

Final ELF is 20,907,104 bytes; SHA256 3c6be2330a69d38b7f8a3483207dcf1658be69162ce91b683a98b3ed89a97ae8. Read-only verification checked ELF64/x86_64 headers and program bounds; final stage contains exact stage1, and stage1 contains exact pinned kstuff, source-built SMP adapter, AMPR and PlayGo files. ZIP integrity checked; ELF and ZIP copied to Downloads. See review/CALLIONE_TEST1_BUILD.json. No console execution, gameplay, sleep-mode, native-install or firmware-compatibility test was performed. No GitHub upload.

## Test2 source fixes — 2026-11-25

Reviewed the supplied callione.log without copying personal console data into the project. PPSA01969 was built from a homebrew source; the log does not establish the exact runtime discovery failure. Found a real injection-order race: common/lib overlay preceded source mounts. Source mounts now precede overlay, with descriptor/open/size/inode checks. Added exact legacy folder-link handoff with scanner/runtime gates, metadata Title ID checks, no image/system takeover, no link deletion, and SMP cleanup exclusion for confirmed claims. Added the isolated FTP inbox to installer browse/source validation and native upload-settling checks.

48 Rust host tests passed, including FTP boundary and runtime source-identity regressions. C ownership suite passed new same-source/path tests. Unified PS5 cargo check passed. Inline JS syntax and localization placeholders passed. None of these prove PPSA01969 now launches; no new console testing was performed.

Test2 adapter and both release ELF stages built successfully with no compiler warnings/errors in review/callione-test2-build.log. Exact embedded files and stage1 verified with review/verify-callione-test2.py; final SHA256 88e6cae4c1ab684c760daa5d9d4a438d7fcacd0de09e8fcdc36b44cbcdf3199b. ZIP integrity verified and ELF/ZIP copied to Downloads. Console verification remains pending; GitHub unchanged.

## Background error notification suppression (source only)
Removed per-game and batch failure system toasts from the background registration pipeline. Failure records, retry handling, log entries and UI error state remain. Explicit installer errors and startup-critical notifications remain. Deleted the now-unused failure-toast translation helpers. Existing test2 binary is unchanged.

## Quiet UI error handling (source only)
Removed the USB-error dialog, raw game-action error text in game modals, game/service errors from the notification popover, and raw installer/updater/installed-management error details in their action views. Brief unsuccessful-operation status remains; confirmations and Diagnostics remain. Browser-only action errors are sent to a bounded same-origin JSON log endpoint (escaped controls; 80-character context, 2048-character message, 4 KiB body limit). Client deduplication suppresses identical entries for 60 seconds with at most 100 keys. If the payload cannot be reached, browser console retains the message. JS syntax, 31-locale placeholders and PS5-target cargo check passed; no ELF built and existing test2 unchanged.
