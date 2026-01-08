# Business Units

## Overview

The multi-BU design system supports four business units, each with a distinct visual identity while sharing the same component APIs. This document describes each BU, their design direction, and how they complement each other.

## BU A: Core Banking Platform

**Visual Identity:** Conservative, dense, professional

**Use Case:** Internal, regulated, operational tooling

### Design Characteristics

- **Primary Color**: Deep navy blue (#3A5B81 at 500)
  - Professional, trustworthy appearance
  - Conservative and authoritative
- **Secondary Color**: Muted gray-blue (#818D9F at 500)
  - Low visual noise
  - Supporting conservative aesthetic
- **Typography**: Dense, information-focused
  - Base font size: 0.875rem (smaller, more compact)
  - Proportional font scale for efficient information display
  - Higher contrast for readability in dense layouts
- **Visual Result**: Denser layout, higher contrast, more defined boundaries, professional appearance

### When to Use

Core Banking Platform is designed for:
- Internal banking tools
- Regulatory compliance interfaces
- Operational dashboards
- Data-heavy applications requiring efficiency

## BU B: Growth & Payments Experience

**Visual Identity:** Expressive, spacious, modern

**Use Case:** External-facing, revenue and conversion focused

### Design Characteristics

- **Primary Color**: Vibrant cyan (#00BCD4 at 500)
  - Energetic, growth-oriented feel
  - Modern and approachable
- **Secondary Color**: Warm amber (#FFC107 at 500)
  - Conversion-focused accent
  - Approachable and inviting
- **Typography**: Spacious, readable
  - Base font size: 1.125rem (larger, more spacious)
  - Proportional font scale for comfortable reading
  - Softer contrast for modern appeal
- **Visual Result**: More spacious layout, softer colors, lighter borders, modern and approachable appearance

### When to Use

Growth & Payments Experience is designed for:
- Customer-facing applications
- Payment interfaces
- Marketing and growth tools
- User acquisition flows
- Conversion-focused experiences

## BU C: Wealth Management

**Visual Identity:** Sophisticated, premium, elegant

**Use Case:** High-value advisory services, premium client experiences

### Design Characteristics

- **Primary Color**: Rich deep purple/indigo (#673AB7 at 500)
  - Sophisticated and refined
  - Premium aesthetic
  - Conveys trust and expertise
- **Secondary Color**: Warm gold/amber (#FFC107 at 500)
  - Premium accent color
  - Luxury feel
  - Wealth and prosperity associations
- **Typography**: Balanced, elegant
  - Base font size: 1rem (balanced, moderate)
  - Elegant serif font option (Georgia) for primary
  - Refined contrast for sophisticated appeal
- **Visual Result**: Balanced layout, refined colors, premium feel, sophisticated appearance

### When to Use

Wealth Management is designed for:
- High-net-worth client portals
- Investment advisory tools
- Premium service interfaces
- Private banking applications
- Wealth planning platforms

## BU D: Developer Platform

**Visual Identity:** Tech-focused, developer-friendly, internal tooling

**Use Case:** Internal developer tools, API documentation, developer portal

### Design Characteristics

- **Primary Color**: Cyan/teal (#00BCD4 at 500)
  - Technology and code associations
  - Developer tooling aesthetic
  - Modern and technical
- **Secondary Color**: Blue-gray (#607D8B at 500)
  - Tech/professional appearance
  - Complementary to primary
  - Developer-focused
- **Typography**: Developer-friendly
  - Base font size: 1rem (balanced, readable)
  - Monospace primary font (Roboto Mono, SF Mono, Monaco, etc.)
  - Developer-oriented font stack
- **Visual Result**: Clean layout, technical colors, monospace typography, developer-friendly appearance

### When to Use

Developer Platform is designed for:
- Internal developer tools
- API documentation interfaces
- Developer portal applications
- Code management systems
- Developer onboarding flows
- Technical documentation

## How They Complement Each Other

The four BUs form a comprehensive design system portfolio:

1. **Coverage**: Together they cover the full spectrum of financial services needs
   - Internal operations (Core Banking)
   - Customer acquisition (Growth & Payments)
   - Premium services (Wealth Management)
   - Developer tooling (Developer Platform)

2. **Visual Range**: Each BU represents a distinct position on the visual spectrum
   - Dense vs. Spacious (Core Banking vs. Growth & Payments)
   - Conservative vs. Modern (Core Banking vs. Growth & Payments)
   - Functional vs. Premium (Core Banking/Growth vs. Wealth Management)
   - Business-focused vs. Tech-focused (All others vs. Developer Platform)

3. **Shared Foundation**: All BUs share:
   - Same component APIs
   - Same governance structure
   - Same token architecture
   - Same validation rules
   - Different visual expression only

## Choosing a BU

When selecting a BU for a new application:

1. **Consider the audience**
   - Internal operations → Core Banking Platform
   - Consumer-facing → Growth & Payments Experience
   - Premium/high-value → Wealth Management
   - Developers/engineers → Developer Platform

2. **Consider the use case**
   - Data-heavy operations → Core Banking Platform
   - Conversion-focused → Growth & Payments Experience
   - Advisory services → Wealth Management
   - Developer tools/APIs → Developer Platform

3. **Consider visual requirements**
   - Professional/dense → Core Banking Platform
   - Modern/spacious → Growth & Payments Experience
   - Premium/elegant → Wealth Management
   - Tech-focused/developer-friendly → Developer Platform

## Token Differences Summary

| Aspect | Core Banking | Growth & Payments | Wealth Management | Developer Platform |
|--------|--------------|-------------------|-------------------|-------------------|
| Primary Color | Deep Navy (#3A5B81) | Vibrant Cyan (#00BCD4) | Deep Purple (#673AB7) | Cyan/Teal (#00BCD4) |
| Secondary Color | Muted Gray-Blue (#818D9F) | Warm Amber (#FFC107) | Warm Gold (#FFC107) | Blue-Gray (#607D8B) |
| Base Font Size | 0.875rem (dense) | 1.125rem (spacious) | 1rem (balanced) | 1rem (balanced) |
| Font Family | Sans-serif (Inter) | Sans-serif (Inter) | Serif (Georgia) / Sans-serif | Monospace (Roboto Mono) / Sans-serif |
| Text Contrast | High (neutral-900) | Soft (neutral-800) | Refined (neutral-900) | High (neutral-900) |
| Border Definition | Defined (neutral-400) | Soft (neutral-200) | Standard (neutral-300) | Standard (neutral-300) |

## Visual Differentiation

When viewing the same component side-by-side across BUs:

- **Color**: Immediately distinct primary colors
- **Typography**: Density differences are clear (size and spacing)
- **Contrast**: Different contrast levels create different moods
- **Borders**: Border weight contributes to overall feel

All differences are driven by tokens, not component code changes. The same component code renders differently based on the selected theme.

