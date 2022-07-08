# 2.0.0

**NEW FEATURES:**

- Document categories with customizable colors which immensely help with categorizing everything
- A "general" tab in settings that now houses these settings:
    - Re-open tabs upon start
    - Auto-save interval
- Extended information for each document - you can add a lot of metadata to each document and then search for it!
- Splash screen which shows the latest documents and credits
- Context menus (or right-click menus, whatever you want to call them) are now all across the application

**CHANGED FEATURES:**

- Design refresh for the whole program - it's more consistent, compact and practical
- Improved editor - the word/char counters are faster and more useful, there are more formatting options and there are 
- Renaming and deleting doesn't have buttons in the sidebar anymore - instead, context menus are used for that now

**BUGS FIXED:**

- When resizing the window, layout would break
- The formatting buttons for the editor wouldn't accurately indicate the formatting for the selected text range

**TECHNICAL CHANGES:**

- The way documents are saved is completely different (previously everything would be saved in one JSON file, now only metadata is saved in a central JSON file and document content is saved in separate files). This might negatively impact performance a little bit, but it definitely improves the safety of the files.

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