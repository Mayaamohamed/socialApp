import z from 'zod'
import type { signUpValidator } from '../../Validators/User/auth.validator.js'

export type SignUpBodyType = z.infer<typeof signUpValidator.body>
