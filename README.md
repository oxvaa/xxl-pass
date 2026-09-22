# XXL CZECHIA 3.0 — O2 Arena

Major rebrand of XXL PASS into **XXL CZECHIA**.

## 3.0 highlights
- Guest is the default experience. Login/Register are optional.
- Local account registration + login stored with AsyncStorage.
- Each local account keeps its own My XXL state (favorites, XP, PASS tier, wallet, missions and reservations).
- Passwords are SHA-256 hashed locally with `expo-crypto`.
- Czech is the default UI language; English remains available.
- App roles: User / Admin.
- All simulation/demo controls are isolated inside Admin mode.
- O2 Arena Prague venue module + transport / entrance / parking guidance.
- Official XXL CZECHIA logo asset extracted from the supplied event artwork.
- Supplied official event poster included as the main event artwork.
- Full 3-day artist + DJ lineup from the supplied poster.
- XXL PASS remains as a signed-in account benefit.
- My XXL favorites, missions, rewards, wallet, crew and profile modules.
- Expo SDK 57 + iPhone Safe Area architecture.

## Guest vs signed-in
Guest can browse:
- Home
- Event
- Full lineup
- O2 Arena / transport
- Notifications
- Safety / help

Signed-in users additionally unlock:
- Personalized XXL PASS
- My XXL favorites
- Missions / XP
- Rewards
- XXL Wallet
- Crew
- Account profile

## Admin test login
For local prototype testing only:

- Email: `admin@xxlczechia.local`
- Password: `XXLAdmin2026!`

After login, switch **User → Admin** in Profile / More. Admin mode contains all demo controls.

## Venue facts
O2 Arena address and visitor transport/entry information are based on the official O2 Arena visitor pages. The event itself and lineup come from the supplied XXL CZECHIA poster. The poster does not display a year or set times, so 3.0 intentionally does not invent them.

## Upload
Replace the repository project with the contents of this package, preserving:
- `components/`
- `screens/`
- `assets/`

Commit to `main`, then open:
https://oxvaa.github.io/xxl-pass/

The included `index.html` opens the current project directly in Expo Snack SDK 57.
