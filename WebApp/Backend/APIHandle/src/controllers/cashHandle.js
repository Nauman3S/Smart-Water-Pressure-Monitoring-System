import { testEnvironmentVariable } from '../settings';

export const cashHandlePage = (req, res) => res.status(200).json({ message: testEnvironmentVariable+" NEW DATA" });