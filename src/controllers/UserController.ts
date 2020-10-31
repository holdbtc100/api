import { Request, Response } from 'express'
import { v4 } from 'uuid'
import bcryptjs from 'bcryptjs'
import hash from 'hash.js'

interface User {
  id: string
  pseudonym: string
  password: string
}

const Users: User[] = []

class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const { pseudonym, password } = request.body

    const hashedPseudonym = hash.sha256().update(pseudonym).digest('hex')
    const hashedPassword = await bcryptjs.hash(password, 8)

    const verifyExists = Users.find(item => item.pseudonym === hashedPseudonym)

    if (verifyExists) {
      return response.status(400).json({ message: 'Pseudonym has already in use' })
    }

    const user = {
      id: v4(),
      pseudonym: hashedPseudonym,
      password: hashedPassword,
    }

    Users.push(user)

    return response.json(user)
  }

  async index(request: Request, response: Response): Promise<Response> {
    const users = Users

    return response.json(users)
  }
}

export default UserController
