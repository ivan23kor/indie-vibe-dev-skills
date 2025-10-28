# iOS Notes App Screenshot Generator

A specialized skill that transforms arbitrary text input into realistic iOS notes app screenshots with pixel-perfect accuracy and Apple's design language.

## Features

### 🎨 **Pixel-Perfect iOS Design**
- Authentic iPhone 14/15 dimensions (390x844px)
- Proper iOS safe areas and system spacing
- San Francisco font family with correct weights
- iOS system colors and typography hierarchy

### 📱 **Realistic UI Components**
- Status bar with time, battery, and signal indicators
- Large title navigation bar with blur effects
- Interactive toolbars and buttons
- Search functionality
- Home indicator

### 🔄 **Multiple View Modes**
- **Detail View**: Single note with full text content
- **List View**: Multiple notes with previews
- Customizable search bar visibility
- Toggle toolbar options

### ⚙️ **Customization Options**
- Custom note titles
- Battery level adjustment
- Current time display
- View mode selection
- Search and toolbar visibility

## Usage

### Basic Usage
```javascript
const generator = new IOSScreenshotGenerator();
const html = generator.generateScreenshot('Your text here');
```

### Advanced Usage
```javascript
const html = generator.generateScreenshot(text, {
    title: 'Custom Note Title',
    viewMode: 'detail', // 'list' or 'detail'
    showSearch: true,
    showToolbar: true,
    currentTime: '9:41',
    batteryLevel: 85
});
```

## File Structure

```
ios-notes-screenshot-generator/
├── SKILL.md                    # Skill documentation and instructions
├── README.md                   # This file
├── test-demo.html             # Interactive demo and testing
├── assets/
│   └── ios-notes-template.html # Base HTML template
├── references/
│   └── ios-design-patterns.md  # iOS design specifications
└── scripts/
    ├── screenshot-generator.js # Core generator class
    └── demo.js                 # Usage examples and demos
```

## Examples

### Meeting Notes
Transform meeting transcripts into professional iOS notes screenshots:
```
Project Meeting - October 27, 2025

Attendees:
- Development Team
- Product Manager
- UX Designer

Action Items:
- Update documentation
- Prepare presentation
```

### Shopping Lists
Create clean, organized shopping list screenshots:
```
Groceries:
- Milk, eggs, bread
- Vegetables and fruits
- Pasta and sauces
```

### Creative Ideas
Capture brainstorming sessions in iOS-style format:
```
App Ideas
1. Meditation app with mood tracking
2. Task management with Kanban boards
3. Food discovery with reviews
```

## Technical Specifications

### Screen Dimensions
- **Total Screen**: 390×844px
- **Content Area**: 390×766px (excluding safe areas)
- **Status Bar**: 44px height
- **Navigation Bar**: 96px height (large title)
- **Home Indicator**: 34px bottom margin

### Typography
- **Font Family**: San Francisco (SF Pro)
- **Body Text**: 17pt, Regular weight
- **Large Title**: 34pt, Regular weight
- **Line Height**: 1.4-1.5 for optimal readability

### Colors
- **System Blue**: #007AFF (primary actions)
- **Text Primary**: #000000 (light mode)
- **Text Secondary**: #3C3C43
- **Background**: #FFFFFF
- **Ultra Light Gray**: #F2F2F7

## Testing

Open `test-demo.html` in a browser to:
- Test with custom text input
- View different layout options
- See pre-configured examples
- Customize appearance settings

## Integration

This skill can be integrated into:
- Design workflows for mockups
- Documentation tools
- Presentation software
- Content creation platforms

## License

This skill follows iOS design patterns and should be used in accordance with Apple's design guidelines and intellectual property policies.

---

**Generated with Skill Creator Framework**