# Tasks: UniLLM Upgrade Checklist

- [x] **Phase 1: Backend Isolation & Local Auth DB**
  - [x] Implement local JSON database (`users.db.json`) logic in `server.js`
  - [x] Write `POST /api/auth/signup` endpoint with OTP generation logged to terminal
  - [x] Write `POST /api/auth/verify-otp` to verify and activate user
  - [x] Write `POST /api/auth/login` check for credentials and verification status
  - [x] Write `POST /api/auth/forgot-password` (generates recovery OTP)
  - [x] Write `POST /api/auth/reset-password` (replaces credentials on matching OTP)
  - [x] Set up JSON body-parser in `server.js`

- [x] **Phase 2: Frontend Service Integration & Routing**
  - [x] Update `public/js/apiService.js` to call backend `/api/auth` endpoints
  - [x] Modify `public/js/router.js` to register `/careers`, `/blog`, and `/blog/:id` routes
  - [x] Register new pages in `public/js/pages/index.js`
  - [x] Fix navigation menu redirection links in `public/js/components.js`

- [x] **Phase 3: Auth Page OTP Flows & Forms Redesign**
  - [x] Enhance text inputs, focus rings, hover borders, and errors in `login.js` and `signup.js`
  - [x] Design OTP Code entry layout and verification modal in `signup.js` and `login.js`
  - [x] Create security forgot password and verification OTP screens in `forgotPassword.js` and `resetPassword.js`

- [x] **Phase 4: Landing Page Hero & Custom Accordion FAQs**
  - [x] Redesign landing page hero in `landing.js` to reflect "The Enterprise AI Gateway" rows (Gateways, Controls, Operations)
  - [x] Write FAQ accordion transition CSS in `public/css/style.css`
  - [x] Set up interactive FAQ binding in `router.js` or page binders
  - [x] Add 6-8 industry FAQs with one-line previews and rotations across public views

- [x] **Phase 5: Completed Public Pages (Models, Careers, Blogs)**
  - [x] Implement dual-view (Grid/Table) layout switcher in `modelsMarketplace.js`
  - [x] Add Search + Provider filter pills in `modelsMarketplace.js`
  - [x] Create `public/js/pages/public/blog.js` for post lists and article layouts
  - [x] Create `public/js/pages/public/careers.js` detailing company culture and positions
  - [x] Build interactive apply modal/drawer in `careers.js`

- [x] **Phase 6: Hashing Security & Route Guards (New Requirements)**
  - [x] Implement secure `crypto.scrypt` password hashing with random salt and timing-safe comparison in `server.js`
  - [x] Add OTP validation attempts caps (max 5) and expiration controls in backend routes
  - [x] Clearly label frontend sandbox OTP alert boxes as "Development / Demo Mode" with integration warnings
  - [x] Build router-level SPA session protection guards redirection loop in `router.js`
  - [x] Resolve all dead links (Privacy Policy/Terms) in page footers

- [x] **Phase 7: Verification & QA**
  - [x] Perform full server boot checks and verify routing
