# 🌟 Responsive Sign-up Form Component  
  
  This project features a fully responsive sign-up form component for a React and Next.js application. On PC, the form appears as a modal window, while on mobile phones, it slides up as a drawer that can be closed with a swipe. The project also supports a dark theme for better user experience.  

![Demo Video/GIF](assets/demo.gif)  
  

## 🚀 Features  

- **Fully Responsive**: Works seamlessly across different screen sizes.
- **Modal on PC**: Opens as a modal window for desktop users.
- **Drawer on Mobile**: Appears as a drawer from the bottom on mobile devices.
- **OTP Verification**: Sends a One-Time Password (OTP) to the provided email for verification.
- **Database Integration**: Saves user data to the database using Prisma and PostgreSQL.
- **Dark Theme Support**: Switch between light and dark themes.
- **Resend Integration**: Uses Resend service for sending OTP emails.

## 🛠️ Tech Stack

- **Next.js**: The React framework for production.
- **TypeScript**: Typed JavaScript for enhanced code quality.
- **Zod**: TypeScript-first schema declaration and validation library.
- **React Hook Form**: Performant, flexible, and extensible forms with easy-to-use validation.
- **Prisma**: Next-generation ORM for Node.js and TypeScript.
- **PostgreSQL**: Open-source relational database.
- **Framer Motion**: A production-ready motion library for React.
- **shadcn/ui**: Beautifully crafted UI components.
- **Resend**: Service for sending OTP emails.

## 📥 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ruslan-yeromin/sign-up-component.git
   ```
2. Navigate to the project directory:
   ```bash
   cd sign-up-component
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up the database:
   ```bash
   npx prisma migrate dev
   ```
5. Configure your environment variables by copying `.env.sample` to `.env` and updating the values:
   ```bash
   cp .env.sample .env
   ```
6. Run the development server:
   ```bash
   npm run dev
   ```

## 📧 OTP Email Verification

Upon registration, an OTP password will be sent to the provided email for verification. Make sure to configure your Resend service provider settings in the `.env` file.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to the developers of the libraries and tools used in this project.

## 📝 Contact

For any inquiries, please contact [GMAIL](mailto:r.yeremin91@gmail.com).
