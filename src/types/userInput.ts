import zod from 'zod';


export const userInput = zod.object({
  name: zod.string().min(3).max(50, { message: 'Name must be between 3 and 50 characters' }),
  email: zod.string().email(),
  password: zod.string().min(8).max(50, { message: 'Password must be between 8 and 50 characters' }),
  passwordConfirm: zod.string().min(8).max(50, { message: 'Password must be between 8 and 50 characters' }),
});

export const loginInput = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8).max(50),
});




