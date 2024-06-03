# Playwright Excel Test
### Demo Video
Watch the demo video on Loom.com:
https://www.loom.com/share/b33d1de9085048238a869b1e154bd376?sid=c3b3eda7-0b3b-4450-b90b-30bcef3b2d5c


### Purpose
The primary goal of this project is to create a reliable test for validating the `TODAY()` function in Excel Online using Playwright and TypeScript. 
The emphasis is on demonstrating a working solution within a short time frame. 
While this is not the only way to implement the test, it is a practical example that can be adapted and improved.

### Project Structure
  **Pages**: 
  - `ExcelPage`: Handles interactions with Excel Online.
  - `LoginPage`: Manages the login process.
  - `GotItPopupPage`: Deals with the "Got it" popup in Excel Online.

  **Utils**:
  - `clipboardContext`: Sets up the browser context with clipboard permissions.
  - `config`: Stores configuration data such as login credentials.
  - `logger`: Implements logging using the Winston library.

  **Tests**:
  - `excel.test.ts`: Contains the end-to-end test for validating the `TODAY()` function.


### Configuration Files

- **TypeScript**: `tsconfig.json`
- **Playwright**: `playwright.config.ts`
- **Jest**: `jest.config.ts`


### Key Challenges and Workarounds

**Interacting with Excel Online:**
- Handling elements inside an iframe.
- Using coordinates (x, y) to locate cells within the canvas.

**Validating the TODAY() Function:**
- Copying the content of cell A1 to the clipboard.
- Comparing the clipboard content with the current date.

**Clipboard Permissions:**
- Implementing clipboardContext to manage clipboard read/write permissions and avoid system popups.


### Playwright Best Practices
**This project adheres to several Playwright best practices:**

- Page Object Model: Organizes code by separating page interactions into distinct classes.

- Environment Variables: Stores sensitive data such as login credentials in a .env file to enhance security.

- Actionability Checks: Ensures elements are actionable before interacting with them, reducing flaky tests.

- Retries and Timeouts: Configures appropriate retries and timeouts to enhance test reliability.


### Running the Tests
**To run the tests, use the following commands:**

- Playwright Tests:   npm run test

- Playwright Tests in Debug Mode:  npm run test:debug


### Step-by-Step Guide to Running the Test
1) Install Dependencies: npm install

2) Set Up Environment Variables:

Refer to the .env.example file for the required format.
To securely store and access Microsoft login credentials, use a `.env` file.

This file should include:

MS_LOGIN_URL=https://login.microsoftonline.com
EXCEL_URL=https://www.office.com/launch/excel
EMAIL=my-username
PASSWORD=my-password

3) Recommendation for Better Results:
Ensure Clipboard is Empty: For better test results, it is recommended to ensure that the clipboard is empty before running the test.

To manually clear the clipboard on both Windows and Mac, follow these steps:
- on Windows using Command Prompt: Open Command Prompt (cmd) and type:  echo off | clip
- on Mac open the Terminal and type:  pbcopy < /dev/null

This command will clear the clipboard content.

4) Run the test: npm run test

or Playwright Tests in Debug Mode:  npm run test:debug


### FAQs
1. What are the known bottlenecks or limitations?

Dynamic Locators: Handling dynamic locators inside the iframe required using coordinates to locate cells.
Clipboard Management: Copying and reading clipboard content involves managing system permissions, which can be complex.

2. Are there alternative solutions?

Yes, there are optional ways to interact with Excel Online and validate the TODAY() function. 
This project provides a practical approach but can be extended or modified based on specific requirements and constraints.

### Conclusion

This project demonstrates a practical implementation of an end-to-end test for validating the TODAY() function in Excel Online using Playwright and TypeScript. 
While it focuses on providing a working solution within a short time frame, it also highlights areas for potential improvement and alternative approaches.

NOTE for logging: For more advanced logging and debugging, the project includes a logger module using Winston, which can replace console.log for more sophisticated logging needs.

By following the steps and understanding the challenges and workarounds, we can adapt this project to fit specific testing requirements.



