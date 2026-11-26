# TITAN CORE architecture

## Current CALLiONE 1.1 development

The historical TITAN sections below document earlier designs, including retired installed-package import behavior. Current CALLiONE keeps installed FPKGs system/kstuff-owned, restricts Kraken to homebrew trees, uses the ShadowMountPlus native installer, and integrates a separately started manual PS4Mount service. The new supplied kstuff and selected Kraken 0.4.0 ports are described in [the current integration document](docs/CALLIONE_1_1_INTEGRATION.md). CALLiONE uses `/data/callione`, web port 8098 and tile CALL00001; PS4 service state is under `/data/callione/ps4mount`, with its API restricted to loopback port 8770. A local combined test ELF has been built; see the integration document for its hash and validation limits.

## Runtime

TITAN CORE is a Rust PS5 ELF with a bundled, offline web interface on8097. The unified-stack feature coordinates pinned kstuff-lite1.11 and ShadowMountPlus1.7beta12 as separate resident processes while preserving the native FPKG/folder engine. Readiness, process/boot guards and per-title ownership avoid duplicate component launches and competing overlays.

App data lives in /data/titan-core. The tile starts the saved /data/titan-core/titan-core.elf. The build has two stages: stage2 embeds/saves stage1. Project package names, build outputs and container image use TITAN CORE. Upstream protocol/index filenames and sandbox names remain compatible.

## Native sources

src/storage.rs discovers mounted internal/USB/extended drives. src/scan.rs finds supported debug PKGs/folders, validates metadata and resolves duplicates. src/cache.rs and src/ampr_index.rs prepare per-title caches and streaming indexes. src/register.rs registers game tiles and source mounts; src/launch.rs handles sandbox overlays at launch. Native work pauses while a game runs; no force unmount is used. Rebuild preserves game-written files; confirmed source Delete is a separate operation.

## Installed and external packages

Installed sources are prepared in place: /user/app/TID/app.pkg remains the authoritative package. installed_access.rs records original permissions before enabling read/traverse bits needed by the existing read-only per-game sandbox mount. No new package copy, symlink or hard link is created for a newly prepared installed source. The auto_import_installed setting key is retained for compatibility; its UI label describes in-place preparation.

Before scanning, receipt-proven internal imports may be restored to /user/app/TID/app.pkg. Exact original path, parsed title and recorded size must validate. Missing original title metadata can be staged from a matching cached param/icon and re-registered. Restoration journals an exclusively created destination reservation, validates its inode and contents immediately before rename, then uses rename (via a verified /user/data alias for nullfs paths). Pre-existing different package files are refused. The SDK has no atomic no-replace rename, so no external install/update/uninstall of the same title may run concurrently. Interrupted full reservations are recoverable; unexpected destination files are retained for inspection. There is no hard-link or full-copy fallback. Old interrupted hard links, if any, can still be completed as a same-inode recovery. Package bytes remain a single stored file. Running-game checks defer work and per-title errors are logged only when they change. No app.db size mutation is performed; System accounting and launch remain hardware acceptance checks.

Installer copies a selected supported debug PKG into /user/app/TID/app.pkg for Internal or <drive>/TITAN-CORE/Games/TID/TID.pkg for external, with progress/cancel, space/collision checks, full byte comparison, source-size/mtime verification, reparse and final rename. The external original is never deleted. Owned install roots are prioritized for native scanning. The worker shares the native work mutex. Ordinary error/cancel cleans the partial transaction; power-loss resume is not implemented. Package plus variable cache needs extra storage. No generic retail/encrypted or update/DLC merging support is implied.

## Web interface

Six destinations: Dashboard, Library, Installer, Storage, Diagnostics, Settings. One image filter covers exFAT/mixed formats without duplicate categories. Settings groups existing values; flags/native language selector, RTL, themes, controller and reduced-motion support remain. The public Stop control is removed; the guarded internal takeover endpoint remains.

GET /api/state provides reported sources/drives/cache/telemetry/services. Other existing routes manage settings, rescan/rebuild/source deletion and source metadata under their normal guards. GET /api/klog proxies at most64KiB of the pinned service's kernel-log tail. Installer browse/start/cancel/status routes validate mounted canonical external paths. No arbitrary browser-provided path is accepted for source deletion.

Diagnostics uses system metrics when exposed and explicitly labeled payload/peak fallbacks otherwise. Unsupported temperature/GPU/I/O stay unknown. CPU samples are browser-session only, bounded to one hour/1801points, with outage/null gaps and uptime-reset handling. Read-only health checks inspect a fresh status snapshot, persisting at most20browser-local results. JSON/CSV/browser-print reports remain client-side. CSV guards formula prefixes; console strings are rendered literally.

Header/About source links target this project; credits remain in CREDITS.md with upstream provenance. Background launcher removal only unregisters the exact recognized ShadowMount web tile after service readiness/no game, without stopping its process. The custom chmod v0.1 display runtime is AMPR0.4.0 with only its launch notice changed; attribution, ABI and engine source stay compatible.

## Build and evidence

Run TITAN_UNIFIED_STACK=1 bash ps5/build.sh with the existing Rust1.99/SDK0.43 Docker toolchain and at most2compiler jobs. Verify vendor hashes and both stages. Edit review/monitor-client.js then embed-monitor.py; regenerate catalogs with embed-localization.py and check script syntax. Existing browser/host/installer tests use synthetic fixtures and are not evidence of hardware gameplay. See docs/VALIDATION.md and CREDITS.md.

## External destination installer (0.6.0)

GET /api/installer/destinations lists connected destination mount points. POST /api/installer/start accepts {path,destination}, with legacy raw path requests retaining the internal default. A chosen external destination owns TITAN-CORE/Games/TID/TID.pkg. As of 0.6.3, all destinations use verified copy and preserve the download original, including the same external drive. The space check requires the full package size plus 256 MiB working reserve. Receipt-proven external roots join existing native scans. Mount/path identity, space, symlink, collision, pause/cancel and source revalidation guards apply. No drive formatting or installed /user/app migration is added. Internal cache remains necessary; System accounting is not changed. See docs/EXTERNAL_DESTINATION_VALIDATION.md.

## Internal destination correction (0.6.1)

Internal installation writes /user/app/TID/app.pkg with matching minimal title metadata and an owned receipt. A pre-existing native external tile is reusable only with metadata/title and exact cache source proof; installed packages, partial transactions and unrelated titles are never replaced. Native registration remains the existing cache-based engine. System-path source ownership is checked against the bundled installed-title inventory before Ready. Missing inventory triggers rescan/retry. Old managed-homebrew receipts remain readable; no implicit migration.

## External archive scan policy (0.6.4)

Before opening or parsing an external .pkg in native discovery, scan.rs permits only recognized system-installed package paths or the exact package inside a validated installer::roots receipt directory. Raw USB/extended archive PKGs are excluded before title deduplication; they cannot block /user/app installed candidates or appear as duplicate playable sources. Custom scan roots cannot override this rule. Installer browse/start and copy preservation are unchanged. External extracted folders and image discovery are unchanged. No existing source/cache or game tile is deleted by this policy; a previous-version stale tile is not proof of a new mount. Close games before replacing the payload.

## External installed presentation (0.6.5)

installer::external_installs returns exact package paths from validated connected external receipt roots. api_state gathers that snapshot once, before game_json serialization, rather than scanning disk for each card. The external_installed flag is separate from system installed_pkg/native_installed. UI only changes badge/details/style; source deletion/rebuild and installed management keep their existing routing. Reported package bytes remain file length, cache bytes remain internal-cache measurements. Registration and System size handling are unchanged; research/limits are recorded in docs/EXTERNAL_STATUS_VALIDATION.md.

## Local Kraken 0.2.1 integration

See docs/KRAKEN_0_2_1_UPGRADE.md for the pinned engine/runtime update, cache-v2 transition, TITAN-specific integration boundaries, attributed runtime notice and hardware acceptance limits.


## Fix4 source development (owner requested direct external playback)

The main scanner explicitly enables validated external debug/plaintext PS5 PKGs,
including original archives, without copying/deleting them. Legacy scanner callers
retain installer-only policy. Settling checks apply to live internal uploads too;
known partial-transaction directories are excluded. Internal installed sources take
priority over external duplicates. See docs/LOG_FIXES_FIX4.md for source fixes,
portable tests, open crash evidence and the deferred ELF build.

## Embedded PlayGo compatibility
Native runtime composition includes an optional pinned PlayGo Stub with global and per-title opt-out, manual runtime precedence, and per-title cache fingerprints. See docs/PLAYGO_INTEGRATION.md.

## FIX6 console updates
Automatic metadata checks, manual version selection/download/install/downgrade and atomic saved-payload replacement are documented in docs/CONSOLE_UPDATER.md. Startup self-copy completes before exposing update routes; current resident services are never hot-swapped.

## Backports catalog (source development after FIX6)

The Backports tab, exact compatibility policy, immutable native overlays, verified downloads, boot-deferred selection and rollback are documented in docs/BACKPORTS.md. The supplied catalog is empty; image/ShadowMount installation is explicitly unsupported. This source feature is separate from the pending PKG/fakelib2 audit and has not been built or hardware-tested.

FIX10 integrates quer3q/kraken-mount v0.3.1 and the official ampr-emu-ng v0.5.0. See docs/FIX10_RELEASE.md. Existing TITAN integrations remain.

FIX11 normalizes legacy TITAN CORE installed-source receipts after exact title/path checks. See docs/FIX11_RELEASE.md.


## FIX12 / Kraken 0.3.2 integration

Current release is TITAN 1.0.10 stable. See KRAKEN_0_3_2_UPGRADE.md for the adapted boundaries and INSTALL_RU.md / INSTALL_EN.md for current operation. Native API v1 on 8097 is a subset for Playden, not a replacement for the isolated ShadowMount service. TITAN's own updater is retained; standalone Kraken self-update is disabled.

The lifetime kernel lock `/data/titan-core.instance.lock` is held before migration, runtime installation, port ownership or game work. It is independent of the HTTP listener, preventing two FIX12 instances after rest mode. A second instance fails closed with a notification. The stale file is harmless after process exit; never unlink it during operation. Older payloads without the lock require a full reboot when upgrading. PID is added to the startup message for diagnosis.

Owned sandbox nullfs mounts are removed at process exit; the library overlay can survive a short same-title ELF transition grace interval. No forced unmounts are added. Additional ELF files outside decrypted/ are extracted by cache layout v3; rebuild preserves files not generated by TITAN. Folder overlay_off participates in the fakelib fingerprint and cannot disable PKG AMPR. Excluded paths are applied before source parsing and duplicate ownership selection, including external homebrew recursion and installed candidates.

The last detected matching console crash is kept in /data/titan-core/crashes.json and exposed by GET /api/report/<TID>. A missing record is not evidence of a successful run. Game process disappearance without NOTE_EXIT has an unknown exit status. Registration presence reads live SQLite rows in a single query, not raw database bytes. The reported Forza Horizon 5 PKG crash remains unconfirmed fixed; see the upstream issue linked in KRAKEN_0_3_2_UPGRADE.md.
