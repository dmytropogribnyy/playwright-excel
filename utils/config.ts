import dotenv from 'dotenv';

dotenv.config();

export const config = {
  msLoginUrl: process.env.MS_LOGIN_URL || '',
  excelUrl: process.env.EXCEL_URL || '',
  email: process.env.EMAIL || '',
  password: process.env.PASSWORD || '',
};
