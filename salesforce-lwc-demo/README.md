# Salesforce Lightning Web Component Accessibility Demo

This project demonstrates accessibility best practices and common violations in Salesforce Lightning Web Components (LWC). It's the Salesforce equivalent of the React accessibility demo.

## 🎯 Project Purpose

This demo showcases:
- ✅ **Good accessibility practices** in Lightning Web Components
- ❌ **Common accessibility violations** that trigger ESLint errors
- 🔧 **Salesforce-specific accessibility considerations**
- 📊 **Testing accessibility in LWC**

## 🏗️ Project Structure

```
salesforce-lwc-demo/
├── force-app/main/default/
│   ├── lwc/
│   │   ├── accessibilityDemo/          # Main demo component
│   │   │   ├── accessibilityDemo.html
│   │   │   ├── accessibilityDemo.js
│   │   │   ├── accessibilityDemo.css
│   │   │   ├── accessibilityDemo.js-meta.xml
│   │   │   └── __tests__/
│   │   └── testAccessibility/          # Component with violations
│   │       ├── testAccessibility.html
│   │       ├── testAccessibility.js
│   │       ├── testAccessibility.css
│   │       ├── testAccessibility.js-meta.xml
│   │       └── __tests__/
│   ├── applications/                   # Custom app definition
│   ├── tabs/                          # Tab configuration
│   └── flexipages/                    # Lightning page layout
├── package.json
├── sfdx-project.json
└── .eslintrc.json                     # ESLint config with a11y rules
```

## 🚀 Getting Started

### Prerequisites
- Salesforce CLI (sfdx)
- Node.js 18+
- Salesforce Dev Hub enabled
- VS Code with Salesforce Extension Pack

### Setup
1. **Clone and setup:**
   ```bash
   cd salesforce-lwc-demo
   npm install
   ```

2. **Create a scratch org:**
   ```bash
   sfdx force:org:create -f config/project-scratch-def.json -d 30 -s -a AccessibilityDemo
   ```

3. **Deploy the code:**
   ```bash
   sfdx force:source:push
   ```

4. **Open the org:**
   ```bash
   sfdx force:org:open
   ```

5. **Navigate to the Accessibility Demo app** in the App Launcher

## 🔍 Accessibility Testing

### ESLint with Accessibility Rules
```bash
# Run accessibility linting
npm run lint

# Expected violations in testAccessibility component:
# - jsx-a11y/alt-text: Images without alt attributes
# - jsx-a11y/anchor-has-content: Empty anchor tags
# - jsx-a11y/control-has-associated-label: Buttons without labels
# - jsx-a11y/heading-has-content: Empty headings
# - jsx-a11y/label-has-associated-control: Unassociated labels
```

### Unit Testing
```bash
# Run LWC Jest tests
npm run test:unit

# Run with coverage
npm run test:unit:coverage

# Watch mode for development
npm run test:unit:watch
```

## 🎨 Components Overview

### AccessibilityDemo Component
**Location:** `force-app/main/default/lwc/accessibilityDemo/`

**Features:**
- ✅ Proper semantic HTML structure
- ✅ ARIA labels and descriptions
- ✅ Keyboard navigation support
- ✅ High contrast and reduced motion support
- ✅ Accessible form controls
- ✅ Toast notifications for user feedback

### TestAccessibility Component
**Location:** `force-app/main/default/lwc/testAccessibility/`

**Intentional Violations:**
- ❌ Images without `alt` attributes
- ❌ Empty anchor tags
- ❌ Buttons without accessible text
- ❌ Empty headings
- ❌ Labels not associated with form controls
- ❌ Interactive elements without keyboard support
- ❌ Information conveyed by color only

## 🔧 Salesforce-Specific Accessibility Features

### Lightning Design System (SLDS)
- Built-in accessibility patterns
- Semantic CSS classes
- Focus management utilities
- Screen reader optimized components

### Lightning Base Components
- `lightning-button`: Automatically accessible
- `lightning-input`: Built-in ARIA support
- `lightning-card`: Proper heading structure
- `lightning-toast`: Screen reader announcements

### Platform Features
- **Keyboard Navigation:** Full keyboard support
- **Screen Reader Support:** NVDA, JAWS, VoiceOver
- **High Contrast Mode:** Automatic theme adaptation
- **Reduced Motion:** Respects user preferences

## 📚 Learning Resources

### Salesforce Documentation
- [Lightning Web Components Accessibility](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.accessibility)
- [Lightning Design System Accessibility](https://www.lightningdesignsystem.com/accessibility/overview/)
- [Trailhead: Lightning Web Components Accessibility](https://trailhead.salesforce.com/content/learn/modules/lightning-web-components-accessibility)

### Tools and Testing
- [axe DevTools](https://www.deque.com/axe/devtools/) - Browser extension for accessibility testing
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Built into Chrome DevTools
- [Salesforce Inspector](https://chrome.google.com/webstore/detail/salesforce-inspector/aodjmnfhjibkcdimpodiifdjnnncaafh) - Debug Salesforce apps

## 🛠️ Development Workflow

### Accessibility-First Development
1. **Plan with accessibility in mind**
2. **Use semantic HTML elements**
3. **Test with keyboard navigation**
4. **Run ESLint regularly**
5. **Test with screen readers**
6. **Validate color contrast**

### Commands
```bash
# Lint code for accessibility violations
npm run lint

# Fix auto-fixable issues
npx eslint force-app --fix

# Run tests
npm run test:unit

# Format code
npm run prettier

# Deploy to scratch org
sfdx force:source:push

# Pull changes from org
sfdx force:source:pull
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `npm run lint` to check for violations
5. Run `npm run test:unit` to ensure tests pass
6. Create a pull request

## 📄 License

This project is for educational purposes and demonstrates accessibility best practices in Salesforce Lightning Web Components.

---

## 🔗 Related Projects

- [Original React Accessibility Demo](../accessibility-demo/)
- [Salesforce LWC Recipes](https://github.com/trailheadapps/lwc-recipes)
- [Lightning Design System](https://github.com/salesforce-ux/design-system)