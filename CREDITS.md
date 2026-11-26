# CALLiONE 1.1 development — attribution

The current source integrates the owner-supplied `kstuff-1.15-dr-test3-stable.elf`, selected compatible Kraken Mount 0.4.0 changes, and the manual PS4Mount service previously developed separately. This is not the unmodified standalone Kraken 0.4.0 payload. See [integration scope and validation](docs/CALLIONE_1_1_INTEGRATION.md) and [the exact port audit](review/KRAKEN_040_INTEGRATION.json). Source checks do not establish console compatibility. The new kstuff filename is supplied by the owner; its corresponding source/release provenance remains unverified.

PS4Mount 0.8.0 is by **gasb07**: [upstream source](https://github.com/gasb07/ps4mount), commit `3707377572a5da81feb55dc2175a53619dbfc3a1`, GPL-3.0-or-later. The CALLiONE adaptation adds explicit per-title mount permission, manual unmount, local API integration and ownership guards. Upstream notices and vendored source are retained in `vendor/ps4mount`. Its upstream rest-mode/data-loss warning remains applicable.

## Historical CALLiONE 1.0

CALLiONE 1.0 is the SirenaGoloviy integration based on CALLiONE TEST3.2 and TITAN FIX12. Original TITAN, Kraken, AMPR, kstuff and ShadowMountPlus authorship and licenses remain in force. Current bundled components are kstuff 1.15-dr-test2a, ShadowMountPlus 1.7beta12-callione4, Kraken 0.3.2, AMPR 0.5.1 and PlayGo Stub 0.6. The supplied kstuff test binary still has an unverified exact corresponding source. No PS4Mount experiment is included. The following TITAN component table is historical; exact current binary hashes are recorded in BUILD.json.

# TITAN — authors, components and licenses

TITAN / **PLAY NO LIMIT by SirenaGoloviy** is the local distribution and integration. Original **TITAN CORE by devchmod** authorship and contributions remain credited: interface, multilingual navigation, installation, installed-package preparation, diagnostics and service integration. See [historical notices](CREDITS_HISTORY.md).

Thank you to **quer3q**, **EchoStretch**, **drakmor**, the PS5 payload SDK contributors and the homebrew community. Thank you to PS5 testers **@ImN3k1t** and **Владимир Барсук (@script_durova)** for reports and testing earlier builds. This acknowledgement does not imply they tested FIX12.

| FIX12 component | Upstream | Distribution/adaptation |
|---|---|---|
| Kraken Mount 0.3.2 | [quer3q/kraken-mount](https://github.com/quer3q/kraken-mount/releases/tag/v0.3.2) | Native mount/cache/registration/launch code adapted to TITAN safety, UI and updater |
| ampr-emu-ng 0.5.1 | [quer3q/ampr-emu-ng](https://github.com/quer3q/ampr-emu-ng/releases/tag/v0.5.1) | Official unmodified release binary; TITAN launch notice is separate in `src/launch.rs` |
| kstuff-lite 1.11 | [EchoStretch/kstuff-lite](https://github.com/EchoStretch/kstuff-lite/releases/tag/v1.11) | Unchanged embedded resident payload |
| ShadowMountPlus 1.7beta12-titan-isolated4 | [drakmor/ShadowMountPlus](https://github.com/drakmor/ShadowMountPlus) | Source-built TITAN adaptation: isolated ownership/registration and protected hosts; earlier automatic uninstall call sites disabled |
| PlayGo Stub 0.6 | [drakmor/pgo_stub](https://github.com/drakmor/pgo_stub) | Unchanged bundled library with TITAN integration and game selection |
| PS5 Dump Forge | [quer3q/ps5-dump-forge](https://github.com/quer3q/ps5-dump-forge) | Format/decoder and build workflow references |
| ps5-payload-sdk 0.43 | [ps5-payload-dev/sdk](https://github.com/ps5-payload-dev/sdk) | Payload build libraries and toolchain |
| SQLite 3.46.1 | [sqlite.org](https://sqlite.org/) | Registration database access, public domain |
| RustCrypto sha2 0.10.9 | [RustCrypto/hashes](https://github.com/RustCrypto/hashes) | Streaming integrity checks; dependency licenses retained |

Root license is GPL-3.0-or-later; see [LICENSE](LICENSE). Full corresponding TITAN source, vendored service sources, official AMPR source, component licenses, third-party notices and provenance are in the release asset **TITAN-SirenaGoloviy-fix12-source.zip**. GitHub's automatic Source code archive contains this distribution repository and is not the full payload source.

Original authorship and notices are retained. Historical custom-branded AMPR archives remain for provenance; FIX12 does not run those older binaries. No third-party game backport or Sony module is bundled by the catalog feature. Sparse/index/codec reader attributions remain in the full source and THIRD_PARTY_NOTICES.
