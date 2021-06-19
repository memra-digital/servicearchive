# 1.0.0rc1

- Now everything gets saved just before exiting the application and the autosave interval is longer (60 seconds)
- Implemented the created and last modified dates for documents even though it doesn't show up anywhere in the app

# 0.7.0

- Renamed all instances of "article" and "service" in code to "document"
- Refactored some code
- Added dark theme
- Fixed a few bugs regarding tabs
- Added a confirmation popup when deleting a document
- Removed the general tab from settings and moved the about tab to top
- Added highlighted parts to search results
- Fixed odd top margins for the first item in search results
- The sync and settings modals have an X button now
- The word counter is now much more accurate and asynchronous
- When renaming an article, the inputs value defaults to the articles title
- Nearly complete rewrote the sync modal to make it work a little bit better
- New syncing API
- Window title now includes the current open tabs name
- New easing function for the modal and popup opening/closing animation
- New README and branding (updated the font in logo)

# 0.6.1

- Fixed bug where you couldn't add a document if you didn't have any