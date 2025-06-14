# Project Rules & Guidelines

## 🎯 Project Overview

This is a modern portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. The project showcases professional skills, projects, and experience through a clean, responsive interface.

## 📁 Project Structure

```
my-portfolio/
├── app/                    # Next.js 14 app router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components (shadcn/ui)
│   └── *.tsx             # Feature-specific components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configurations
├── public/               # Static assets
└── styles/               # Additional stylesheets
```

## 🛠️ Development Rules

### Code Style & Standards

1. **TypeScript First**
   - Always use TypeScript for new files
   - Define proper interfaces and types
   - Avoid `any` type - use proper typing
   - Use strict mode settings

2. **Component Guidelines**
   - Use functional components with hooks
   - Follow PascalCase for component names
   - Use descriptive prop interfaces
   - Keep components focused and single-purpose
   - Maximum 200 lines per component (refactor if larger)

3. **File Naming Conventions**
   - Components: `PascalCase.tsx` (e.g., `ModernProjects.tsx`)
   - Hooks: `camelCase.tsx` starting with "use" (e.g., `useMediaQuery.tsx`)
   - Utilities: `camelCase.ts` (e.g., `utils.ts`)
   - Pages: `kebab-case` or `camelCase.tsx`

4. **Import Organization**
   ```typescript
   // 1. React imports
   import React from 'react'
   import { useState, useEffect } from 'react'
   
   // 2. Third-party libraries
   import { motion } from 'framer-motion'
   import { Card } from '@/components/ui/card'
   
   // 3. Internal imports (absolute paths)
   import { Button } from '@/components/ui/button'
   import { useMediaQuery } from '@/hooks/use-media-query'
   
   // 4. Relative imports
   import './component.css'
   ```

### CSS & Styling Rules

1. **Tailwind CSS First**
   - Use Tailwind utilities for styling
   - Create custom CSS only when necessary
   - Follow mobile-first responsive design
   - Use CSS variables for theme colors

2. **Responsive Design**
   - Test on mobile, tablet, and desktop
   - Use Tailwind breakpoints: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
   - Ensure touch-friendly interactive elements (min 44px)

3. **Animation Guidelines**
   - Use Framer Motion for complex animations
   - Keep animations subtle and purposeful
   - Respect user's motion preferences
   - Performance-first approach

### Component Architecture

1. **UI Components** (`components/ui/`)
   - Only reusable, generic components
   - No business logic
   - Well-documented props
   - Consistent API patterns

2. **Feature Components** (`components/`)
   - Business logic and feature-specific code
   - Can compose multiple UI components
   - Handle data fetching and state management

3. **Hooks** (`hooks/`)
   - Reusable stateful logic
   - Follow React hooks rules
   - Proper cleanup and dependency arrays

## 🔧 Technical Requirements

### Performance Standards

- **Core Web Vitals**
  - LCP (Largest Contentful Paint) < 2.5s
  - FID (First Input Delay) < 100ms
  - CLS (Cumulative Layout Shift) < 0.1

- **Bundle Size**
  - Keep bundle size optimized
  - Use dynamic imports for large components
  - Optimize images (WebP, proper sizing)

- **Accessibility**
  - WCAG 2.1 AA compliance
  - Proper semantic HTML
  - Keyboard navigation support
  - Screen reader compatibility

### Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile: iOS 14+, Android 10+

## 📝 Code Quality

### Required Checks

1. **Linting**
   - ESLint with TypeScript rules
   - Fix all warnings before committing
   - Use `npm run lint` to check

2. **Type Checking**
   - No TypeScript errors
   - Use `npx tsc --noEmit` to verify

3. **Testing**
   - Write tests for utility functions
   - Test complex component logic
   - Maintain >80% code coverage

### Git Workflow

1. **Commit Messages**
   ```
   feat: add new project gallery component
   fix: resolve mobile navigation issue
   docs: update README with setup instructions
   style: improve responsive design for tablets
   refactor: optimize image loading performance
   ```

2. **Branch Naming**
   - `feature/component-name`
   - `fix/issue-description`
   - `refactor/component-optimization`

3. **Pull Request Guidelines**
   - Clear description of changes
   - Include screenshots for UI changes
   - Test on multiple devices
   - Update documentation if needed

## 🚀 Deployment

### Environment Setup

1. **Development**
   ```bash
   pnpm install
   pnpm dev
   ```

2. **Production Build**
   ```bash
   pnpm build
   pnpm start
   ```

3. **Environment Variables**
   - Use `.env.local` for local development
   - Never commit sensitive data
   - Document required variables

### Performance Monitoring

- Monitor Core Web Vitals
- Check Lighthouse scores regularly
- Optimize based on real user metrics

## 🔒 Security Guidelines

1. **Data Handling**
   - Validate all user inputs
   - Sanitize form submissions
   - Use HTTPS in production

2. **Dependencies**
   - Keep dependencies updated
   - Audit for security vulnerabilities
   - Use `npm audit` regularly

## 📚 Documentation Requirements

1. **Component Documentation**
   - JSDoc comments for complex functions
   - Props interface documentation
   - Usage examples for UI components

2. **README Updates**
   - Keep installation instructions current
   - Document new features
   - Include deployment instructions

## 🎨 Design System

### Colors
- Use CSS variables defined in `globals.css`
- Maintain consistent color palette
- Ensure sufficient contrast ratios

### Typography
- Use system font stack for performance
- Consistent heading hierarchy
- Responsive font sizes

### Spacing
- Use Tailwind spacing scale
- Consistent padding/margin patterns
- Proper white space management

## 📱 Mobile-First Approach

1. **Design mobile layouts first**
2. **Progressive enhancement for larger screens**
3. **Touch-friendly interactions**
4. **Optimized images for different screen densities**

## 🔄 Continuous Improvement

- Regular code reviews
- Performance audits
- User feedback integration
- Technology stack updates
- Best practices evolution

---

**Remember**: These rules ensure code quality, maintainability, and optimal user experience. When in doubt, prioritize user experience and code clarity over complexity.