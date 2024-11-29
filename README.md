# RB SEF Dashboard

## Project Overview ([live link](https://rainforestbuilder.netlify.app/))

This web application was developed as a take-home assignment for RB, featuring a secure login system and a comprehensive dashboard for displaying reports. The project demonstrates proficiency in modern web development technologies and best practices.

## 🚀 Project Requirements

- [x] Implement login functionality using provided API
- [x] Create dashboard to display reports
- [x] Use React and Next.js
- [x] Apply Tailwind CSS for styling
- [x] Implement unit testing
- [x] Set up CI/CD pipeline
- [x] Deploy application
- [x] Invite `kofi-teddy` to the repository

## 🛠 Technologies Used

- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Form Management**: react-hook-form
- **HTTP Requests**: axios
- **Testing**:
  - Jest
  - React Testing Library
- **Deployment**: Netlify
- **CI/CD**: GitHub Actions

## 📋 Prerequisites

- Node.js (v18 or later)
- npm or yarn
- GitHub account

## 🔧 Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/AckonSamuel/rb-project.git
cd rb-project
```

### 2. Install dependencies

```bash
npm install --legacy-peer-deps
# or
yarn install
```

### 3. Run development server

```bash
npm run dev
# or
yarn dev
```

### 4. Run tests

```bash
npm run test
# or
yarn test
```

## 🌐 Deployment

- **Platform:** Netlify
- **Deployment Link:** [Project link](https://rainforestbuilder.netlify.app/)

## 🔐 API Endpoints

- **Authentication:** [Auth Login](https://rb-playground.onrender.com/internal/redoc/#tag/auth/operation/auth_login_create)
- **Report Summary:** [Report Summary](https://rb-playground.onrender.com/internal/redoc/#tag/report/operation/report_get_summary)

## 📝 Important Notes

- Backend service may have startup delay after periods of inactivity.
- Patience recommended when first accessing the service.
- Date picker functionality was intentionally ignored as per assignment instructions.

## 🧪 Testing Strategy

- Unit tests for login functionality
- Component rendering tests
- API interaction validation
- CI pipeline includes test execution

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to your branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

## 📜 License

MIT License

## 🙏 Acknowledgments

Special thanks to the RB team for this engaging take-home assignment.
