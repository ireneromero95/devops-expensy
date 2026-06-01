import dotenv from 'dotenv';
dotenv.config({ override: false });

import app from './app';

const port = process.env.PORT || 8706;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
