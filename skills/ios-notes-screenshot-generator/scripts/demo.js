/**
 * Demo script for iOS Notes App Screenshot Generator
 * Shows how to generate different types of iOS notes screenshots
 */

// In a browser environment, you would include the generator script
// For Node.js usage, you'd need to modify the HTML generation

function generateIOSNotesScreenshots() {
    const generator = new IOSScreenshotGenerator();

    // Example 1: Single note in detail view
    const meetingNotes = `
Project Meeting - October 27, 2025

Attendees:
- John Smith (Project Manager)
- Sarah Johnson (Developer)
- Mike Chen (Designer)

Discussion Points:
1. Review Q4 deliverables
2. Budget allocation for next phase
3. Timeline adjustments

Action Items:
- Update project documentation by EOD Friday
- Schedule stakeholder review meeting
- Prepare budget proposal for next quarter

Next Meeting: November 3, 2025 at 2:00 PM
    `;

    const screenshot1 = generator.generateScreenshot(meetingNotes, {
        title: 'Project Meeting Notes',
        viewMode: 'detail',
        showSearch: false,
        showToolbar: true
    });

    // Example 2: Multiple notes in list view
    const multipleNotes = `
Shopping List

Groceries:
- Milk
- Eggs
- Bread
- Greek yogurt
- Bananas
- Spinach
- Cherry tomatoes
- Chicken breast
- Whole grain pasta
- Olive oil


Book Recommendations

Fiction:
- The Midnight Library
- Project Hail Mary
- Klara and the Sun

Non-Fiction:
- Atomic Habits
- Thinking, Fast and Slow
- The Subtle Art of Not Giving a F*ck


Work Ideas

Q1 2025 Initiatives:
- Launch new mobile app features
- Improve user onboarding flow
- Implement A/B testing framework
- Hire 2 senior developers
- Expand to European market
    `;

    const screenshot2 = generator.generateScreenshot(multipleNotes, {
        title: 'All Notes',
        viewMode: 'list',
        showSearch: true,
        showToolbar: true
    });

    // Example 3: Quick note
    const quickNote = `Remember to call mom on Sunday!`;

    const screenshot3 = generator.generateScreenshot(quickNote, {
        title: 'Quick Note',
        viewMode: 'detail',
        showSearch: false,
        showToolbar: true,
        batteryLevel: 42
    });

    return {
        meetingNotes: screenshot1,
        notesList: screenshot2,
        quickNote: screenshot3
    };
}

// Usage instructions
console.log(`
iOS Notes App Screenshot Generator - Usage Guide
==============================================

Basic Usage:
const generator = new IOSScreenshotGenerator();
const html = generator.generateScreenshot('Your text here');

Advanced Options:
const html = generator.generateScreenshot(text, {
    title: 'Custom Title',
    viewMode: 'detail', // 'list' or 'detail'
    showSearch: true,
    showToolbar: true,
    currentTime: '9:41',
    batteryLevel: 85
});

Features:
- Pixel-perfect iOS design system
- San Francisco font family
- iOS color schemes
- Realistic status bar
- Interactive elements
- Responsive design
- Light/dark mode ready

Example Texts:
1. Meeting notes with action items
2. Shopping lists
3. Ideas and brainstorms
4. Reminders and todos
5. Book recommendations
6. Project planning
    `);

// Export the demo function
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateIOSNotesScreenshots,
        IOSScreenshotGenerator
    };
}