> Test2 adds the isolated `/data/pkg-install/` FTP source, mounts package access before AMPR, and permits exact legacy homebrew-folder ownership handoff. Console acceptance remains pending.

> Local test1 was built on 2026-11-25: `dist/CALLiONE-test1.zip`. Build and embedded files verified; no PS5 execution or GitHub publication. Source-development context follows.

# CALLiONE

![CALLiONE](assets/callione-avatar.png)

[Русский](README.md) · **English**

CALLiONE is a new SirenaGoloviy project derived from TITAN FIX12, combining several PS5 game storage workflows behind one entry point.

**Status: 0.1.0-dev source development. No CALLiONE ELF has been built, published or console-tested.**

Installed system FPKGs stay with the system and the supplied new kstuff. Kraken handles compatible packages and folders only inside `/data/homebrew/` and the drive-root `homebrew` trees of supported connected drives. ShadowMountPlus handles supported images. An installed system copy takes priority over a matching homebrew Title ID.

The supplied avatar is retained unchanged. CALLiONE uses separate `/data/callione/` state, tile `CALL00001` and web port `8098`. Add games offers two distinct modes: Install to PS5 submits a PKG from a connected USB/extended drive to the native PS5 installer through ShadowMountPlus; Copy to homebrew keeps compatible Kraken sources in homebrew directories. Original files are preserved in both modes. PS5 chooses the system destination. Native job stages, byte progress, cancellation availability and final results are reported by the service. Close games and keep the source connected until completion. Native installation has not yet been tested on a console with this CALLiONE build.

Inputs are pinned by SHA-256. The supplied kstuff identifies itself as `1.15-dr-test2a`; the precise corresponding published source has not been established. The supplied ShadowMountPlus exactly matches official 1.7beta12. Source for a separate `1.7beta12-callione1` ownership adapter is included; the stock supplied ELF is not presented as this adapter.

CALLiONE release updates are disabled until its release repository is configured. TITAN releases must not overwrite this product. Existing TITAN settings and game data are not automatically migrated.

See [plan](CALLIONE_PLAN.md), [validation](VALIDATION.md), [credits](CREDITS.md) and GPL license. No Forza fix, FPS improvement or console compatibility result is claimed.

Support: donate 2200700949917206 💳
