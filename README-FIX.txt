XXL PASS 1.1.1 — Safe Area Fix

Replace these files in the GitHub repository:
- App.js
- components/UI.js
- components/BottomNav.js
- index.html

What this fixes:
- Header no longer overlaps the iPhone status bar / Dynamic Island area.
- Notification and profile buttons stay below the system status region.
- Bottom navigation respects the iPhone home indicator.
- Uses react-native-safe-area-context through SafeAreaProvider + live insets.

After replacing the files, commit to main and reopen:
https://oxvaa.github.io/xxl-pass/
Then create/open the new SDK 57 Snack.
