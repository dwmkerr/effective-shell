# WebsiteOnly Component

Subtle indicator for website-only content not included in the print book.

## Usage

Import the component at the top of your MDX file:

```mdx
import WebsiteOnly from '@site/src/components/WebsiteOnly';
```

### In Section Headings

Mark entire sections as website-only:

```mdx
## <WebsiteOnly /> The Power of Readline

Content that only appears on the website...
```

### Inline Usage

Mark inline content as website-only:

```mdx
This technique also works in Python <WebsiteOnly inline /> and Node.js REPLs.
```

## Visual Design

- Gift box icon (24px) indicating bonus content
- Primary color with 70% opacity (100% on hover)
- Tooltip appears on hover: "Bonus online content"
- Supports both light and dark themes
- Eye-catching but professional appearance

## When to Use

Mark content as website-only when it:
- Includes animated GIFs or interactive demonstrations
- Contains supplementary explanations not in the print book
- Provides web-specific features or additional context
- Shows alternative approaches or extended examples

## Accessibility

- Includes proper ARIA attributes
- Tooltip activated on hover
- Icon uses semantic SVG
- Cursor changes to `help` to indicate interactivity
