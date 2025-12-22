# Color Theme Migration Guide

This document provides a mapping of old Tailwind color classes to the new theme-based classes.

## Color Mapping Reference

### Background Colors
- `bg-white` → `bg-bg-main`
- `bg-gray-50` → `bg-bg-secondary`
- `bg-gray-100` → `bg-bg-tertiary`
- `bg-blue-600` → `bg-primary`
- `bg-blue-50` → `bg-accent-cyan bg-opacity-10` (for info backgrounds)
- `bg-green-500` → `bg-accent-teal` (for success)
- `bg-red-500` / `bg-red-600` → `bg-status-error`
- `bg-yellow-500` → `bg-status-warning`
- `bg-orange-500` → `bg-status-warning`

### Text Colors
- `text-gray-900` → `text-text-primary`
- `text-gray-800` → `text-text-primary`
- `text-gray-700` → `text-text-secondary`
- `text-gray-600` → `text-text-secondary`
- `text-gray-500` → `text-text-tertiary`
- `text-gray-400` → `text-text-tertiary`
- `text-white` → `text-text-white`
- `text-blue-600` → `text-primary`
- `text-blue-100` → `text-text-white text-opacity-90`
- `text-blue-200` → `text-text-white text-opacity-70`
- `text-green-500` → `text-accent-teal`
- `text-red-500` / `text-red-600` → `text-status-error`

### Border Colors
- `border-gray-200` → `border-border`
- `border-gray-300` → `border-border`
- `border-gray-400` → `border-border`
- `border-blue-200` → `border-accent-cyan border-opacity-30`

### Status Colors
- Success: `bg-green-500` / `text-green-500` → `bg-accent-teal` / `text-accent-teal`
- Error: `bg-red-500` / `text-red-500` → `bg-status-error` / `text-status-error`
- Warning: `bg-yellow-500` / `text-yellow-500` → `bg-status-warning` / `text-status-warning`
- Info: `bg-blue-500` / `text-blue-500` → `bg-status-info` / `text-status-info`

### Sidebar Specific
- `bg-white` (sidebar) → `bg-sidebar`
- `bg-gray-100` (active item) → `bg-primary`
- `bg-gray-50` (hover) → `bg-sidebar-secondary`
- `text-gray-700` (sidebar text) → `text-text-white text-opacity-80`
- `text-gray-900` (active) → `text-text-white`
- `border-gray-200` → `border-sidebar-border`

## Common Patterns

### Cards
```tsx
// Old
<div className="bg-white rounded-lg shadow border border-gray-200">

// New
<div className="bg-bg-main rounded-lg shadow border border-border">
```

### Buttons (already updated in Button.tsx)
- Primary: Uses `bg-primary`, `hover:bg-primary-dark`
- Success: Uses `bg-accent-teal`
- Danger: Uses `bg-status-error`

### Input Fields (already updated in Input.tsx)
- Border: `border-border`
- Focus: `focus:ring-primary focus:border-primary`
- Text: `text-text-primary`
- Placeholder: `placeholder:text-text-tertiary`

### Status Badges
```tsx
// Success Badge
<div className="bg-accent-teal bg-opacity-10 text-accent-tealDarker border border-accent-teal border-opacity-30">

// Error Badge
<div className="bg-status-error bg-opacity-10 text-status-errorDark border border-status-error border-opacity-30">

// Warning Badge
<div className="bg-status-warning bg-opacity-10 text-status-warningDark border border-status-warning border-opacity-30">

// Info Badge
<div className="bg-status-info bg-opacity-10 text-accent-cyanDark border border-status-info border-opacity-30">
```

## Files Updated
✅ `tailwind.config.js` - Complete color theme added
✅ `src/components/common/Button.tsx` - All variants updated
✅ `src/components/common/Input.tsx` - Colors updated
✅ `src/components/layout/Sidebar.tsx` - Sidebar theme applied
✅ `src/features/authentication/pages/LoginPage.tsx` - Updated
✅ `src/features/authentication/pages/SignupPage.tsx` - Updated
✅ `src/features/onboarding/pages/CreateSchoolPage.tsx` - Updated
✅ `src/features/onboarding/components/CreateSchoolForm.tsx` - Updated

## Remaining Files to Update
The following files still need color updates (84 total files found):
- All table components
- All card components
- All form components
- Dashboard pages
- Feature pages
- Other layout components

Use this guide to systematically update each file.

