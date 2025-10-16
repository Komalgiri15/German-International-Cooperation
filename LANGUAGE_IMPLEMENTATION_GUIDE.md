# Language Selector Implementation Guide

## Overview
This document describes the implementation of a multi-language selector feature that supports English, Arabic, and German across the entire website.

## Features Implemented

### 1. Language Support
- **English (en)** - Default language
- **Arabic (ar)** - Full RTL (Right-to-Left) support
- **German (de)** - Full translation support

### 2. UI Components

#### Language Selector Component
**Location:** `src/components/ui/LanguageSelector.jsx`

A dropdown menu component that displays:
- Language icon (Languages from lucide-react)
- Flag emojis for each language
- Native language names
- Check mark for the currently selected language

**Features:**
- Accessible with proper ARIA labels
- Smooth hover animations
- Visual feedback for current selection
- Responsive design

#### Integration Points
The language selector has been added to:
1. **Main Header** (`src/components/layout/Header.jsx`)
   - Positioned between the notification bell and user profile
   - Visible on all main pages

2. **Admin Portal Header** (`src/components/admin/AdminPortalHeader.jsx`)
   - Positioned before the Admin Portal toggle
   - Ensures consistency across admin pages

### 3. Translation System

#### i18n Configuration
**Location:** `src/i18n/config.js`

**Features:**
- Automatic language persistence to localStorage
- RTL support for Arabic (automatically switches document direction)
- Language attribute updates on the HTML element
- Fallback to English for missing translations

#### Locale Files
**Location:** `src/i18n/locales/`

Three comprehensive locale files have been created:
- `en.json` - English translations
- `ar.json` - Arabic translations (with RTL-friendly text)
- `de.json` - German translations

**Translation Structure:**
```json
{
  "resources": {
    "pageTitle": "...",
    "subtitle": "...",
    "searchPlaceholder": "...",
    "filters": { ... },
    "featured": { ... },
    "card": { ... },
    "languages": { ... }
  },
  "navigation": { ... },
  "header": { ... },
  "common": { ... }
}
```

### 4. RTL Support for Arabic

The i18n configuration automatically:
- Sets `document.documentElement.dir = 'rtl'` when Arabic is selected
- Sets `document.documentElement.dir = 'ltr'` for English and German
- Updates the `lang` attribute on the HTML element

### 5. Language Persistence

The language preference is automatically:
- Saved to localStorage when changed
- Restored on page reload
- Applied immediately across all components using translations

## Usage

### For Developers

#### Using Translations in Components

```jsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t, i18n } = useTranslation();
  
  return (
    <div>
      <h1>{t('resources.pageTitle')}</h1>
      <p>{t('resources.subtitle')}</p>
    </div>
  );
}
```

#### Changing Language Programmatically

```jsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { i18n } = useTranslation();
  
  const switchToArabic = () => {
    i18n.changeLanguage('ar');
  };
  
  return <button onClick={switchToArabic}>العربية</button>;
}
```

#### Adding New Translations

1. Add the translation key to all three locale files:
   - `src/i18n/locales/en.json`
   - `src/i18n/locales/ar.json`
   - `src/i18n/locales/de.json`

2. Use the translation in your component:
   ```jsx
   <p>{t('your.new.translation.key')}</p>
   ```

### For Users

#### Changing Language

1. Locate the language selector button (globe icon) in the navbar
2. Click the button to open the language dropdown
3. Select your preferred language from:
   - 🇬🇧 English
   - 🇸🇦 العربية (Arabic)
   - 🇩🇪 Deutsch (German)
4. The interface will immediately switch to the selected language

#### Language-Specific Behaviors

**Arabic Mode:**
- Text direction changes to right-to-left
- UI elements are mirrored appropriately
- All text displays in Arabic

**English/German Mode:**
- Text direction is left-to-right
- Standard Western layout
- All text displays in the selected language

## Technical Details

### Dependencies
- `i18next` - Core i18n functionality
- `react-i18next` - React bindings for i18next
- `lucide-react` - Icons (Languages icon)

### File Structure
```
src/
├── i18n/
│   ├── config.js              # i18n initialization and configuration
│   └── locales/
│       ├── en.json            # English translations
│       ├── ar.json            # Arabic translations
│       └── de.json            # German translations
├── components/
│   ├── ui/
│   │   └── LanguageSelector.jsx  # Language selector component
│   ├── layout/
│   │   └── Header.jsx             # Main header with language selector
│   └── admin/
│       └── AdminPortalHeader.jsx  # Admin header with language selector
└── main.jsx                   # i18n config imported here
```

### Browser Support
- Modern browsers with CSS Grid and Flexbox support
- RTL direction support in all major browsers
- localStorage for persistence

## Testing

### Test Cases
1. ✅ Language selector appears in main navbar
2. ✅ Language selector appears in admin portal header
3. ✅ Clicking language selector opens dropdown
4. ✅ Selecting a language changes the interface immediately
5. ✅ Selected language is persisted after page reload
6. ✅ Arabic selection switches to RTL mode
7. ✅ English/German selection switches to LTR mode
8. ✅ All translated text displays correctly
9. ✅ Language selector shows current language with check mark
10. ✅ Resources page uses language selector and translations

## Future Enhancements

### Recommended Additions
1. Add more translation keys for:
   - Course pages
   - User profile pages
   - Settings pages
   - Assessment pages
   - Group pages

2. Additional language support:
   - French
   - Spanish
   - Hindi
   - Other regional languages

3. Date and number formatting:
   - Locale-specific date formats
   - Currency formatting
   - Number formatting

4. Dynamic content translation:
   - User-generated content translation
   - API integration for content translation
   - Translation management system

## Troubleshooting

### Common Issues

**Issue:** Language doesn't change
- **Solution:** Check if i18n is imported in `main.jsx`
- **Solution:** Verify locale files are properly formatted JSON

**Issue:** RTL not working for Arabic
- **Solution:** Check if `document.documentElement.dir` is being set
- **Solution:** Verify CSS doesn't override direction property

**Issue:** Translation keys showing instead of text
- **Solution:** Verify the key exists in all locale files
- **Solution:** Check spelling of translation keys

**Issue:** Language selector not visible
- **Solution:** Verify LanguageSelector is imported in Header components
- **Solution:** Check component positioning in the header

## Maintenance

### Regular Tasks
1. Keep translations synchronized across all locale files
2. Test RTL layout when adding new components
3. Verify language persistence after browser updates
4. Monitor for missing translations in console

### Best Practices
1. Always add translations to all three locale files simultaneously
2. Use semantic translation keys (e.g., `resources.pageTitle`)
3. Test with all three languages before deploying
4. Keep translation values concise and clear
5. Use native speakers for translation verification

## Summary

The language selector implementation provides a complete internationalization solution for the Athena LMS platform. It supports three languages with proper RTL handling for Arabic, persistent language preferences, and a clean, accessible UI. The system is extensible and ready for additional languages and translation keys as needed.

## Contact

For questions or issues related to the language implementation, please refer to:
- i18n documentation: https://www.i18next.com/
- React i18next documentation: https://react.i18next.com/

