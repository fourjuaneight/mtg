# Changelog

All notable changes to this project will be documented in this file.

## [1.4.0] - 2022-08-02

### Bug Fixes

- [Handle service unavailable status on all requests.](https://github.com/fourjuaneight/mtg/commit/aeb0fe0f884c43f7f48fe2807410d41bbe293598)
- [Remove url encode on scryfall lookup.](https://github.com/fourjuaneight/mtg/commit/b4be7b2bf525872ef898b95e5d9d827d8ac0e4e3)

### Features

- [Add set and collector number params on card lookup.](https://github.com/fourjuaneight/mtg/commit/b484d99241b539853731321c3922fc4f9b66841f)
- [Add support for dual faced cards.](https://github.com/fourjuaneight/mtg/commit/06c88893eb4591067098bad83acedaeb7a3f14d7)

### Miscellaneous Tasks

- [Update Changelog.](https://github.com/fourjuaneight/mtg/commit/6918b4bd9065cb15be7e25982e86945f3197b65e)
- [Log payloads.](https://github.com/fourjuaneight/mtg/commit/22797c9c47614bb7f91b2152cb6bd95cbc860466)
- [Add logs for debugging.](https://github.com/fourjuaneight/mtg/commit/bb44195b81c1e3d1785ec44745c0e2d3c7b2890d)
- [Remove logs.](https://github.com/fourjuaneight/mtg/commit/98e33d7b07ae7fcd7af56bd7e79a009491de6d52)
- [Add docs reference.](https://github.com/fourjuaneight/mtg/commit/135d7f0553ea075ddb49710a3bafd1c5ff20d1e2)
- [Update to v1.4.0.](https://github.com/fourjuaneight/mtg/commit/c2e941389e20b021faaec2c8503e26ca5d1301ff)

## [1.3.0] - 2022-07-29

### Bug Fixes

- [Sign version tag commits.](https://github.com/fourjuaneight/mtg/commit/1e0e69fab0945241a346c00a682adeb634a62882)

### Features

- [Add default commit message when version bumping.](https://github.com/fourjuaneight/mtg/commit/9d9d3cfcde4a225491debb5e1771bec5caf883f7)
- [Return app version on response.](https://github.com/fourjuaneight/mtg/commit/c72587f91defab0ad07f368cd0ec08e21b2d7fac)

### Miscellaneous Tasks

- [Update Changelog.](https://github.com/fourjuaneight/mtg/commit/688236797eb606675609823259a64fb4061dd289)
- [Minor typing optimizations.](https://github.com/fourjuaneight/mtg/commit/ec3cb60bb73c860e70838f850f7dfc4749e6f540)
- [Update to v1.3.0.](https://github.com/fourjuaneight/mtg/commit/42f33d5023cd8b72afab3b21f9e179298c8b1827)

## [1.2.0] - 2022-07-25

### Features

- [Update node version and migrate to pnpm.](https://github.com/fourjuaneight/mtg/commit/7e35fc8fe78a6377a96dfd822cf4ec9ca5e3a48d)

### Miscellaneous Tasks

- [Update Changelog.](https://github.com/fourjuaneight/mtg/commit/8ae80e2a0a1fa746f1685f42cc9efc9055be7348)

## [1.1.0] - 2022-07-17

### Bug Fixes

- [Change mana color lookup to use object instead of enum.](https://github.com/fourjuaneight/mtg/commit/52f668ae66825d602cade9d493dacaf816fc8261)
- [Minor typing updates.](https://github.com/fourjuaneight/mtg/commit/702dc92c40b1311686f8db2b3a0b5b6a10ceefa5)
- [Move query formatter inside try/catch.](https://github.com/fourjuaneight/mtg/commit/9845f5cddc43b772c3f084dc415c3c633caa9bec)
- [Return empty arrays instead of null and filter them on mutations.](https://github.com/fourjuaneight/mtg/commit/d366628014e7f03cc3098a22bd646174cbbf7e57)
- [Escape new lines on card descriptions.](https://github.com/fourjuaneight/mtg/commit/a270976009fd8e00cb3d0247ffd26d1e36642bbc)
- [Syntax error on hasura mutations.](https://github.com/fourjuaneight/mtg/commit/769335a2462ae00db6a1d5b914bb2c4c8fa05d00)

### Miscellaneous Tasks

- [Update Changelog.](https://github.com/fourjuaneight/mtg/commit/d1777038625e8dcafdaf871752ad752bc8070a72)
- [Change set accronym to uppercase.](https://github.com/fourjuaneight/mtg/commit/1a153ff8dec7022ea456c38cc58c08586a6cc7db)
- [Add logs for debugging.](https://github.com/fourjuaneight/mtg/commit/6306810cd9aeceb5becb3fedd7abd960871662d0)
- [Further logs for debugging insert type.](https://github.com/fourjuaneight/mtg/commit/ba4d3c1448bed36cdf4732974e4ef3adfb8c66f6)
- [Logging further up to catch syntax error.](https://github.com/fourjuaneight/mtg/commit/40ca698afa2f0573975effaa4a4af3fd5646cae5)
- [Remove debug logs.](https://github.com/fourjuaneight/mtg/commit/bc98b58cc9719cc3fa3d6a36d77f4cfef59e909e)
- [Minor syntax updates.](https://github.com/fourjuaneight/mtg/commit/a7eb26f51c291d7dd690d4466bd335842106706f)

## [1.0.1] - 2022-07-17

### Bug Fixes

- [Typing optimizations.](https://github.com/fourjuaneight/mtg/commit/636b13f94de061b0f9588c2344eac2ec71734bef)
- [Convert collector number to integer.](https://github.com/fourjuaneight/mtg/commit/21c9df02bf4e6e6cd4543e51da10d49343781493)
- [Only filter scryfall data if set filter is present.](https://github.com/fourjuaneight/mtg/commit/df264aecb05be890dde71005f4c943fc65dd78af)
- [Card lookup optimizations.](https://github.com/fourjuaneight/mtg/commit/5f118be2a8746b137c55a2e999fd9e35cbd5ce01)
- [Better scryfall error handling.](https://github.com/fourjuaneight/mtg/commit/d9d970c7ed351223fbc855a9defd6c2d23aedbad)
- [Update deprecate object lookup.](https://github.com/fourjuaneight/mtg/commit/0587de6ebf4b6b9cb52384df716f670489cbf023)

### Features

- [Convert magic color codes to words.](https://github.com/fourjuaneight/mtg/commit/b70800d09daaaeb9e2e948d7fb238cfc02207f25)
- [Remove empty values from item insert.](https://github.com/fourjuaneight/mtg/commit/37a5471ebf93627980006727440b5bb19c429ced)

### Miscellaneous Tasks

- [Update Changelog.](https://github.com/fourjuaneight/mtg/commit/9e9f3fb5f1a0f8a887048ff8022e66fb355731fe)
- [Remove deprecated variable.](https://github.com/fourjuaneight/mtg/commit/177bbe79ef172965b8fa501100389ee461df8661)
- [Minor syntax updates.](https://github.com/fourjuaneight/mtg/commit/ab772790eabf631593bc2976cb5f1f3ab171a453)
- [Minor syntax optimizations.](https://github.com/fourjuaneight/mtg/commit/8c587c5f92d09a3e01bd6f0bc39d2051e18a4a7e)
- [Log scryfall api response.](https://github.com/fourjuaneight/mtg/commit/afa7652ce7a38e4b7578414566c49dfdcfe6fb71)
- [More logs for debugging.](https://github.com/fourjuaneight/mtg/commit/d28a5b6b20339dcbc88e971a01ddfaed02cc6e51)
- [Log scryfall response for better debugging.](https://github.com/fourjuaneight/mtg/commit/c90d4a51f378aaf214f1483a67f855cf3d22813f)

## [1.0.0] - 2022-07-16

### Bug Fixes

- [Update linting rules to accomodate TS enums.](https://github.com/fourjuaneight/mtg/commit/073b0385202edd0283d9caef95b08ad5ac70de46)

### Features

- [Add changelog generation action.](https://github.com/fourjuaneight/mtg/commit/b1feb2ca51b6cbc6171ba814000fc991f08d4b5f)
- [Add typings for hasura, scryfrall, and worker payloads.](https://github.com/fourjuaneight/mtg/commit/6fff0a30479ec41f40aa32ba20e5826de216aa76)
- [Add hasura query helper methods.](https://github.com/fourjuaneight/mtg/commit/47f1e248f62a93db1ddfc5ffcefbc17154976e3e)
- [Add scryfall search helper method.](https://github.com/fourjuaneight/mtg/commit/8a4597f11128c656f37618c3d8cd0d71828b75f1)
- [Add optional set filter and better comments to scryfall query.](https://github.com/fourjuaneight/mtg/commit/c639552c9846cea003334223cb8654665726487d)
- [Add request handler logic.](https://github.com/fourjuaneight/mtg/commit/f7ca36e6411bdb5e9a770db3ad11651abd73f06f)
- [Add action to build and publish worker.](https://github.com/fourjuaneight/mtg/commit/9d3a3078c8cef56048e6e580949de223853dea90)

### Miscellaneous Tasks

- [Add node version and dependencies.](https://github.com/fourjuaneight/mtg/commit/1e70fb71288cc06821bca32f79ffaf8d91285f9a)
- [Add formating and linting configs.](https://github.com/fourjuaneight/mtg/commit/778acf43fe214fdbe5ad9ca990c9d4e64b73fd94)
- [Add Tyepescript config.](https://github.com/fourjuaneight/mtg/commit/50da37f37b8f8598841764db7dc4e47a82e6999c)
- [Add github codespace config.](https://github.com/fourjuaneight/mtg/commit/d37ce799c78ee9f816ae64394cb0fa79b764c441)
- [Add serverless function config.](https://github.com/fourjuaneight/mtg/commit/35d16d5667c29c191a4f0131d18cdab3414136da)
- [Add changelog generation config.](https://github.com/fourjuaneight/mtg/commit/5a34c8780b4da890d28087e23837e25c4a2265d0)
- [Add project description and license.](https://github.com/fourjuaneight/mtg/commit/428ef857497453d6a3de0088874295de51af2b53)
- [Minor typing optimizations.](https://github.com/fourjuaneight/mtg/commit/6c54f5b4b0fa1a04249523da0310af7e6a9ab9f1)
- [Add scryfall api docs reference.](https://github.com/fourjuaneight/mtg/commit/5b9519882666e09935309e5b77830dc368ecbdd9)

<!-- generated by git-cliff -->
