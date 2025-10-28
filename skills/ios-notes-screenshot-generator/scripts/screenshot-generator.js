/**
 * iOS Notes App Screenshot Generator
 * Generates realistic iOS notes app screenshots from custom text input
 */

class IOSScreenshotGenerator {
    constructor() {
        this.screenWidth = 390;
        this.screenHeight = 844;
        this.statusBarHeight = 44;
        this.navBarHeight = 96; // Large title
        this.homeIndicatorHeight = 34;
        this.contentHeight = this.screenHeight - this.statusBarHeight - this.navBarHeight - this.homeIndicatorHeight;
    }

    /**
     * Generate a complete iOS notes app screenshot with custom text
     * @param {string} text - The text content to display in the note
     * @param {Object} options - Configuration options
     * @returns {string} Complete HTML for the screenshot
     */
    generateScreenshot(text, options = {}) {
        const config = {
            title: options.title || this.extractTitle(text),
            viewMode: options.viewMode || 'detail', // 'list' or 'detail'
            showSearch: options.showSearch !== false,
            showToolbar: options.showToolbar !== false,
            currentTime: options.currentTime || this.getCurrentTime(),
            batteryLevel: options.batteryLevel || 85,
            ...options
        };

        return this.buildHTML(text, config);
    }

    /**
     * Build complete HTML structure
     */
    buildHTML(text, config) {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.title} - iOS Notes</title>
    <style>
        ${this.getBaseCSS()}
    </style>
</head>
<body>
    <div class="iphone-screen">
        ${this.buildStatusBar(config.currentTime, config.batteryLevel)}
        ${this.buildNavigationBar(config.title)}
        ${this.buildContentArea(text, config)}
        ${config.showToolbar ? this.buildToolbar() : ''}
        ${this.buildHomeIndicator()}
    </div>

    <script>
        ${this.getInteractionsJS()}
    </script>
</body>
</html>`;
    }

    /**
     * Extract title from text content
     */
    extractTitle(text) {
        const lines = text.trim().split('\n');
        const firstLine = lines[0];

        // If first line is short, use it as title
        if (firstLine.length <= 50) {
            return firstLine;
        }

        // Otherwise, use first 30 characters
        return firstLine.substring(0, 30) + (firstLine.length > 30 ? '...' : '');
    }

    /**
     * Get current time in iOS format
     */
    getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: false
        });
    }

    /**
     * Build status bar HTML
     */
    buildStatusBar(time, batteryLevel) {
        return `
        <div class="status-bar">
            <div class="status-time">${time}</div>
            <div class="status-right">
                <div class="signal">📶</div>
                <div class="wifi">📶</div>
                <div class="battery">
                    <div class="battery-icon">
                        <div class="battery-level" style="width: ${batteryLevel}%"></div>
                    </div>
                    <span>${batteryLevel}%</span>
                </div>
            </div>
        </div>`;
    }

    /**
     * Build navigation bar HTML
     */
    buildNavigationBar(title) {
        return `
        <div class="nav-bar">
            <div class="nav-content">
                <button class="nav-button">‹ Notes</button>
                <div class="nav-title">${this.escapeHTML(title)}</div>
                <button class="nav-button">Done</button>
            </div>
        </div>`;
    }

    /**
     * Build content area HTML
     */
    buildContentArea(text, config) {
        if (config.viewMode === 'list') {
            return this.buildListView(text, config);
        } else {
            return this.buildDetailView(text, config);
        }
    }

    /**
     * Build list view with search
     */
    buildListView(text, config) {
        const notes = this.parseNotes(text);
        const searchHTML = config.showSearch ? `
        <div class="search-container">
            <input type="text" class="search-bar" placeholder="Search" value="">
        </div>` : '';

        return `
        <div class="content-area">
            ${searchHTML}
            <div class="notes-list">
                ${notes.map(note => this.buildNoteItem(note)).join('')}
            </div>
        </div>`;
    }

    /**
     * Build detail view for single note
     */
    buildDetailView(text, config) {
        const formattedText = this.formatNoteContent(text);
        return `
        <div class="content-area">
            <div class="note-detail">
                <div class="note-content">${this.escapeHTML(formattedText)}</div>
            </div>
        </div>`;
    }

    /**
     * Build individual note item for list view
     */
    buildNoteItem(note) {
        const preview = note.content.length > 100 ?
            note.content.substring(0, 100) + '...' : note.content;

        return `
        <div class="note-item">
            <div class="note-title">${this.escapeHTML(note.title)}</div>
            <div class="note-preview">${this.escapeHTML(preview)}</div>
            <div class="note-date">${note.date}</div>
        </div>`;
    }

    /**
     * Parse text into multiple notes
     */
    parseNotes(text) {
        const lines = text.trim().split('\n\n');
        const now = new Date();

        return lines.map((content, index) => {
            const title = content.split('\n')[0] || `Note ${index + 1}`;
            const noteContent = content.substring(title.length).trim() || content;

            return {
                title: title.length <= 50 ? title : title.substring(0, 50) + '...',
                content: noteContent,
                date: this.formatDate(new Date(now - index * 24 * 60 * 60 * 1000))
            };
        });
    }

    /**
     * Format note content with proper spacing
     */
    formatNoteContent(text) {
        // Convert multiple newlines to proper spacing
        return text.replace(/\n{3,}/g, '\n\n');
    }

    /**
     * Format date for iOS style
     */
    formatDate(date) {
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            return 'Today';
        } else if (diffDays === 1) {
            return 'Yesterday';
        } else if (diffDays < 7) {
            return `${diffDays} days ago`;
        } else {
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
            });
        }
    }

    /**
     * Build toolbar HTML
     */
    buildToolbar() {
        return `
        <div class="toolbar">
            <button class="toolbar-button">📁</button>
            <button class="toolbar-button">📝</button>
            <button class="toolbar-button">📷</button>
            <button class="toolbar-button">📋</button>
            <button class="toolbar-button">🔍</button>
        </div>`;
    }

    /**
     * Build home indicator HTML
     */
    buildHomeIndicator() {
        return '<div class="home-indicator"></div>';
    }

    /**
     * Get base CSS styles
     */
    getBaseCSS() {
        return `
        :root {
            /* Typography */
            --font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;
            --font-family-display: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;

            /* Colors - Light Mode */
            --background: #FFFFFF;
            --card-background: #FFFFFF;
            --text-primary: #000000;
            --text-secondary: #3C3C43;
            --text-tertiary: #3C3C4399;
            --system-blue: #007AFF;
            --system-gray: #8E8E93;
            --system-gray-light: #C7C7CC;
            --system-gray-ultralight: #F2F2F7;
            --separator: #C6C6C8;

            /* Spacing */
            --spacing-xs: 4pt;
            --spacing-sm: 8pt;
            --spacing-md: 16pt;
            --spacing-lg: 24pt;
            --spacing-xl: 32pt;

            /* Dimensions */
            --screen-width: 390px;
            --screen-height: 844px;
            --status-bar-height: 44px;
            --nav-bar-height: 44px;
            --nav-bar-height-large: 96px;
            --home-indicator-height: 34px;

            /* Effects */
            --shadow: 0 4px 16px rgba(0,0,0,0.1);
            --blur: blur(20px);
            --transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: var(--font-family);
            background-color: var(--system-gray-ultralight);
            color: var(--text-primary);
            overflow: hidden;
        }

        .iphone-screen {
            width: var(--screen-width);
            height: var(--screen-height);
            background-color: var(--background);
            position: relative;
            margin: 0 auto;
            overflow: hidden;
            box-shadow: var(--shadow);
        }

        .status-bar {
            height: var(--status-bar-height);
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: var(--blur);
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 var(--spacing-md);
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            z-index: 100;
        }

        .status-time {
            font-size: 17pt;
            font-weight: 600;
            font-family: var(--font-family);
        }

        .status-right {
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
            font-size: 17pt;
            font-weight: 600;
        }

        .battery {
            display: flex;
            align-items: center;
            gap: 2px;
        }

        .battery-icon {
            width: 24px;
            height: 12px;
            border: 1px solid var(--text-primary);
            border-radius: 2px;
            position: relative;
            padding: 1px;
        }

        .battery-icon::after {
            content: '';
            position: absolute;
            right: -3px;
            top: 3px;
            width: 2px;
            height: 6px;
            background: var(--text-primary);
            border-radius: 0 1px 1px 0;
        }

        .battery-level {
            height: 100%;
            background: var(--text-primary);
            border-radius: 1px;
        }

        .nav-bar {
            height: var(--nav-bar-height-large);
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: var(--blur);
            position: absolute;
            top: var(--status-bar-height);
            left: 0;
            right: 0;
            z-index: 99;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding-bottom: var(--spacing-sm);
        }

        .nav-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 var(--spacing-md);
        }

        .nav-button {
            background: none;
            border: none;
            color: var(--system-blue);
            font-size: 17pt;
            font-family: var(--font-family);
            font-weight: 400;
            padding: var(--spacing-sm);
            min-width: 44px;
            min-height: 44px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .nav-title {
            font-size: 34pt;
            font-weight: 400;
            font-family: var(--font-family-display);
            color: var(--text-primary);
        }

        .content-area {
            position: absolute;
            top: calc(var(--status-bar-height) + var(--nav-bar-height-large));
            left: 0;
            right: 0;
            bottom: var(--home-indicator-height);
            overflow-y: auto;
            background: var(--background);
        }

        .search-container {
            padding: var(--spacing-sm) var(--spacing-md);
            background: var(--system-gray-ultralight);
            border-bottom: 0.5px solid var(--separator);
        }

        .search-bar {
            background: var(--card-background);
            border: none;
            border-radius: 10pt;
            padding: var(--spacing-sm) var(--spacing-md);
            font-size: 17pt;
            width: 100%;
            height: 36px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .search-bar::placeholder {
            color: var(--text-tertiary);
        }

        .notes-list {
            padding: var(--spacing-sm) 0;
        }

        .note-item {
            background: var(--card-background);
            padding: var(--spacing-md);
            border-bottom: 0.5px solid var(--separator);
            min-height: 60px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            transition: var(--transition);
            cursor: pointer;
        }

        .note-item:hover {
            background: var(--system-gray-ultralight);
        }

        .note-title {
            font-size: 17pt;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 2px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .note-preview {
            font-size: 15pt;
            color: var(--text-secondary);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .note-date {
            font-size: 12pt;
            color: var(--text-tertiary);
            margin-top: 2px;
        }

        .note-detail {
            padding: var(--spacing-md);
            min-height: 100%;
        }

        .note-content {
            font-size: 17pt;
            line-height: 1.5;
            color: var(--text-primary);
            font-family: var(--font-family);
            white-space: pre-wrap;
            word-wrap: break-word;
        }

        .toolbar {
            position: absolute;
            bottom: var(--home-indicator-height);
            left: 0;
            right: 0;
            height: 44px;
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: var(--blur);
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 0 var(--spacing-md);
            z-index: 98;
            border-top: 0.5px solid var(--separator);
        }

        .toolbar-button {
            background: none;
            border: none;
            color: var(--system-blue);
            font-size: 24pt;
            width: 44px;
            height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            border-radius: 8pt;
            transition: var(--transition);
        }

        .toolbar-button:hover {
            background: var(--system-gray-ultralight);
        }

        .home-indicator {
            position: absolute;
            bottom: 8px;
            left: 50%;
            transform: translateX(-50%);
            width: 134px;
            height: 5px;
            background: var(--text-primary);
            border-radius: 100px;
            z-index: 101;
        }`;
    }

    /**
     * Get JavaScript for interactions
     */
    getInteractionsJS() {
        return `
        // Simple interactions for demo purposes
        document.addEventListener('DOMContentLoaded', function() {
            // Add click animations
            document.querySelectorAll('.note-item, .nav-button, .toolbar-button').forEach(element => {
                element.addEventListener('click', function() {
                    this.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 150);
                });
            });

            // Update time
            function updateTime() {
                const now = new Date();
                const timeString = now.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: false
                });
                const timeElement = document.querySelector('.status-time');
                if (timeElement) {
                    timeElement.textContent = timeString;
                }
            }

            // Update time every minute
            setInterval(updateTime, 60000);
        });`;
    }

    /**
     * Escape HTML to prevent XSS
     */
    escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IOSScreenshotGenerator;
}