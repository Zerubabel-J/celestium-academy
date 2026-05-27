# Round Gambling Game Assets Guide

This document describes the required assets for the Round Gambling game implementation.

## Directory Structure

All assets should be placed in the following directory structure:
```
assets/round-gambling/
├── icons/
│   ├── bitcoin-icon.svg
│   ├── trophy-icon.svg
│   ├── cash-icon.svg
│   └── lightning-icon.svg
└── images/
    ├── player-avatar-placeholder.png
    └── game-wheel-background.png
```

## Required Assets

### Icons (`assets/round-gambling/icons/`)

1. **bitcoin-icon.svg**
   - **Usage**: Center of the game wheel
   - **Specifications**: 32x32px, SVG format
   - **Description**: Bitcoin symbol displayed in the center of the game wheel

2. **trophy-icon.svg**
   - **Usage**: Statistics cards and winner indicators
   - **Specifications**: 24x24px, SVG format
   - **Description**: Trophy icon for bonus and winner displays

3. **cash-icon.svg**
   - **Usage**: Statistics cards for staking earnings
   - **Specifications**: 24x24px, SVG format
   - **Description**: Money/cash icon for financial displays

4. **lightning-icon.svg**
   - **Usage**: Betting controls and action buttons
   - **Specifications**: 20x20px, SVG format
   - **Description**: Lightning bolt for instant actions

### Images (`assets/round-gambling/images/`)

1. **player-avatar-placeholder.png**
   - **Usage**: Default player avatars in leaderboard
   - **Specifications**: 32x32px, PNG format
   - **Description**: Generic avatar for players without custom avatars

2. **game-wheel-background.png**
   - **Usage**: Background texture for the main game wheel
   - **Specifications**: 320x320px, PNG format with transparency
   - **Description**: Optional decorative background for the game wheel

## Asset Replacement Instructions

To replace placeholder assets with your custom designs:

1. **Navigate** to the appropriate directory under `assets/round-gambling/`
2. **Replace** the placeholder files with your custom assets
3. **Maintain** the same filename and format specifications
4. **Ensure** proper permissions and file sizes for optimal performance

## Fallback Behavior

The implementation includes fallback behavior for missing assets:
- Missing icons will display emoji alternatives
- Missing images will show colored placeholders
- The game remains fully functional without custom assets

## Performance Considerations

- Keep SVG icons under 5KB each
- Optimize PNG images for web (use compression)
- Consider using WebP format for better compression
- Ensure assets are properly cached by the browser

## Color Scheme Integration

Assets should complement the game's color scheme:
- **Primary**: #10b981 (Green)
- **Secondary**: #8b5cf6 (Purple)
- **Accent**: #f59e0b (Yellow)
- **Background**: #0a0e1a (Dark blue)
- **Text**: #ffffff (White)

## Notes

- All assets are optional and have coded fallbacks
- The game is fully responsive and assets should work at different scales
- Consider providing 2x versions for high-DPI displays
- Test assets in both light and dark themes if applicable
