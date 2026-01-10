# Alumni Directory Prototype - Development Guide

## Project Overview
Build a clickable single-flow prototype of an alumni directory site. This is a **frontend-only application** with hardcoded sample data to demonstrate UX and interface design.

## Technical Stack
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (https://ui.shadcn.com)
- **Deployment**: Vercel
- **Data**: Hardcoded sample data (no backend/database)

## Brand Guidelines
- **Primary Accent Color**: `#a60021` (buttons, CTAs, active states, emphasis)
- **Initial Assets**: Placeholder icons and generic images
- **Icons**: lucide-react icons (included with shadcn/ui)

## Development Approach
Build incrementally, one component at a time. The developer will provide reference images for each stage before proceeding.

### Recommended Build Order:
1. Project setup & configuration
2. Header component
3. Search bar with dropdown
4. Filters section
5. Profile cards (grid/list toggle)
6. Profile detail modal
7. Connect/email functionality
8. Polish and refinements

## shadcn/ui Integration

### Setup
```bash
npx shadcn@latest init
```

### Key Components to Install
Install as needed throughout development:
- `Dialog` - profile detail modal
- `Input` - search bar
- `Button` - all interactive buttons
- `Card` - profile cards
- `Badge` - tags/labels
- `Select` or `Combobox` - filter dropdowns
- `Avatar` - profile images
- `Separator` - visual dividers
- `Popover` - search suggestions dropdown
- `Sheet` - mobile filter drawer
- `Toggle` or `ToggleGroup` - view switcher

### Installation Command
```bash
npx shadcn@latest add [component-name]
```

## Accessibility Requirements
- All interactive elements must be keyboard accessible
- Use semantic HTML elements
- Proper ARIA labels for screen readers
- Sufficient color contrast (WCAG AA minimum)
- Visible focus states on all interactive elements

## Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Grid view stacks to single column on mobile
- Filters collapse into drawer/sheet on mobile (use shadcn `Sheet`)

## Application Structure

### 1. Main Directory Page (`/app/page.tsx`)

#### Header Component
- Logo/branding (left aligned)
- Navigation links (if any)
- User profile/actions (right aligned)
- Minimal and clean design
- Optional: sticky on scroll

**Components**: Custom header component, shadcn `Button`

#### Search Bar
- Prominent search input with icon
- Dropdown/popover displaying:
  - Recent searches (3-5 hardcoded items)
  - Suggested searches (3-5 hardcoded items)
- Clear button when text is entered
- Search triggers result filtering

**Components**: shadcn `Input`, `Popover`, `Command`

**Example Structure**:
```tsx
<Popover>
  <PopoverTrigger asChild>
    <Input placeholder="Search alumni..." />
  </PopoverTrigger>
  <PopoverContent>
    <Command>
      <CommandGroup heading="Recent Searches">
        {/* Recent search items */}
      </CommandGroup>
      <CommandGroup heading="Suggested Searches">
        {/* Suggested search items */}
      </CommandGroup>
    </Command>
  </PopoverContent>
</Popover>
```

#### Filters Section

**Filter Categories**:
- **Industry**: Multi-select (Tech, Finance, Healthcare, Education, Non-profit, Consulting, Law)
- **Location**: Multi-select (New York, San Francisco, Boston, Remote, International cities)
- **Chapter**: Multi-select (Alpha, Beta, Gamma, Delta, Epsilon)
- **Graduation Year**: Range selector or multi-select (2015-2025)

**Features**:
- Active filter count badge
- "Reset All Filters" button (visible only when filters active)
- Collapsible on mobile

**Components**: shadcn `Select`, `Combobox`, `Button`, `Badge`, `Sheet` (mobile)

#### Results Display

**View Toggle**:
- Grid view (default): 3-4 columns desktop, 2 tablet, 1 mobile
- List view: Single column with horizontal cards
- Toggle with icons (lucide-react `Grid` and `List`)

**Components**: shadcn `Toggle` or `ToggleGroup`

**Profile Cards - Grid View**:
- Profile photo (shadcn `Avatar`)
- Name (bold, larger text)
- Current Company
- Current Role/Title
- Location (with icon)
- Graduation Year
- Chapter (as badge)
- "Open to Contact" indicator
- Bookmark icon (toggle, use `#a60021` when active)

**Profile Cards - List View**:
Same information, horizontal layout with more spacing

**Components**: shadcn `Card`, `Avatar`, `Badge`, `Button` (bookmark)

### 2. Profile Detail Modal

Triggered by clicking profile card.

**Modal Layout**:

**Header Section**:
- Large profile photo
- Name, current role, company
- Location, graduation year
- Social links (LinkedIn, etc.)

**Timeline Section**:
- Work Experience (chronological, most recent first)
- Education history

**Contact Section**:
- Email address
- Phone (optional)
- **Prominent "Connect" button** (`#a60021` background)

**Components**: shadcn `Dialog`, `Avatar`, `Badge`, `Button`, `Separator`

### 3. Connect/Email Functionality

**Implementation (Recommended for Prototype)**:
- Button opens `mailto:` link in new tab
- Pre-populated subject: "Connection Request from [Student Name]"
- Pre-populated body with professional template
- Show success toast notification after click

**Components**: shadcn `Button`, `Toast`

**Example**:
```tsx
const handleConnect = () => {
  const subject = encodeURIComponent("Connection Request from [Student Name]");
  const body = encodeURIComponent("Hi [Alumni Name],\n\n...");
  window.open(`mailto:${alumniEmail}?subject=${subject}&body=${body}`, '_blank');
  toast.success("Opening email client...");
};
```

## Data Structure

### TypeScript Interface
```typescript
interface AlumniProfile {
  id: string;
  name: string;
  profileImage: string; // placeholder URL
  currentCompany: string;
  currentRole: string;
  location: string;
  graduationYear: number;
  chapter: string;
  openToContact: boolean;
  bookmarked: boolean;
  email: string;
  phone?: string;
  linkedIn?: string;
  experience: Array<{
    company: string;
    role: string;
    startDate: string;
    endDate: string | 'Present';
    description?: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    field: string;
    year: number;
  }>;
}
```

### Sample Data Requirements
Create 15-20 sample profiles in `/lib/data.ts` with:
- Diverse industries
- Various locations (US cities + International + Remote)
- Graduation years 2015-2025
- Different chapters
- Mix of "open to contact" statuses
- Realistic job progression

## Design Patterns

### Color System
Add to Tailwind config:
```javascript
colors: {
  primary: '#a60021',
  'primary-hover': '#8a001a',
  'primary-light': '#d4002e',
}
```

### Typography
- Headings: font-semibold or font-bold
- Body: font-normal
- Scale: text-sm, text-base, text-lg, text-xl, text-2xl

### Spacing
- Consistent padding/margin with Tailwind scale
- Card padding: p-6
- Section spacing: space-y-6 or space-y-8

### Button Variants
```tsx
// Primary button
<Button className="bg-[#a60021] hover:bg-[#8a001a]">Connect</Button>

// Secondary button
<Button variant="outline">Cancel</Button>

// Icon button
<Button variant="ghost" size="icon">
  <Bookmark />
</Button>
```

### Interactive States
- Hover states on all clickable elements
- Active/selected states for filters and bookmarks
- Loading states (optional spinner)
- Empty states when no results

## File Structure
```
/app
  /page.tsx                 # Main directory page
  /layout.tsx               # Root layout
  /globals.css              # Global styles
/components
  /ui/                      # shadcn components (auto-generated)
  /Header.tsx
  /SearchBar.tsx
  /FilterSection.tsx
  /ProfileCard.tsx
  /ProfileDetailModal.tsx
  /ViewToggle.tsx
/lib
  /utils.ts                 # Utility functions (shadcn)
  /data.ts                  # Hardcoded sample data
/types
  /index.ts                 # TypeScript interfaces
```

## Implementation Checklist

### Functionality
- [ ] Search filters profiles by name, company, role
- [ ] Each filter category works independently and in combination
- [ ] Reset filters button clears all active filters
- [ ] Grid/List view toggle switches layouts smoothly
- [ ] Bookmark toggle maintains state during session
- [ ] Profile modal opens with correct data
- [ ] Connect button triggers mailto with pre-filled content
- [ ] Toast notification on connect button click

### Responsive Design
- [ ] Mobile (< 640px): Single column grid, mobile filter drawer
- [ ] Tablet (640-1024px): Two column grid
- [ ] Desktop (> 1024px): Three-four column grid
- [ ] All touch targets minimum 44x44px on mobile

### Accessibility
- [ ] Keyboard navigation works for all interactive elements
- [ ] Focus indicators visible on all focusable elements
- [ ] Proper heading hierarchy (h1, h2, h3)
- [ ] ARIA labels for icon buttons
- [ ] Color contrast meets WCAG AA standards
- [ ] Screen reader tested (optional but recommended)

## Performance Considerations
- Use Next.js `Image` component for profile photos
- Implement client-side filtering (simple array operations)
- Only import needed shadcn components
- Optimize bundle size

## Deployment to Vercel

1. Push code to GitHub repository
2. Import project in Vercel dashboard
3. Configure build settings (auto-detected for Next.js)
4. Deploy
5. Test production build

## Important Notes

- **Prototype focus**: Prioritize UI/UX over production-ready code
- **Hardcoded data**: All data in `/lib/data.ts`
- **No authentication**: Public access to all profiles
- **No persistence**: State resets on page reload (unless localStorage implemented)
- **Incremental development**: Build and review one component at a time

## Development Workflow

1. Wait for reference image/approval before starting each component
2. Build component following shadcn/ui patterns
3. Ensure responsive design
4. Test accessibility
5. Request review before proceeding

## Resources

- shadcn/ui: https://ui.shadcn.com/docs
- Next.js: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Lucide Icons: https://lucide.dev
- WCAG Guidelines: https://www.w3.org/WAI/WCAG21/quickref/

---
