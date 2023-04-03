import type { VercelRequest, VercelResponse } from "@vercel/node"
import { getConnection } from "typeorm"
import ConnectDB from "../src/connectDB"
import { UserEntity } from "../src/user/user.entity"
import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from "../src/user/UserRepository"

interface respon {
  status: number
  message: string
  data?: any
}

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  await ConnectDB()
  const userRepository = getConnection().getRepository(UserEntity)
  const method = await req.method
  const id = req.query.id?.toString()
  if (method === "GET") {
    try {
      const result = await getUser(userRepository, id)
      const resData: respon = {
        status: 200,
        message: "Get user successful!",
        data: result,
      }
      res.status(200).send(resData)
    } catch (error) {
      const resData: respon = {
        status: 400,
        message: "Get user failed!",
      }
      res.status(200).send(resData)
    }
  }
  if (method === "POST") {
    const result = await createUser(userRepository, req.body)
    const resData: respon = {
      status: 200,
      message: "Create user successful!",
      data: result,
    }
    res.status(200).send(resData)
  }
  if (method === "PUT") {
    try {
      await updateUser(userRepository, id, req.body)
      const resData: respon = {
        status: 200,
        message: "Update user successful!",
      }
      res.status(200).send(resData)
    } catch (error) {
      const resData: respon = {
        status: 400,
        message: "Update failed!",
      }
      res.status(400).send(resData)
    }
  }
  if (method === "DELETE") {
    try {
      await deleteUser(userRepository, id)
      const resData: respon = {
        status: 200,
        message: "Delete user successful!",
      }
      res.status(200).send(resData)
    } catch (error) {
      const resData: respon = {
        status: 400,
        message: "Delete failed!",
      }
      res.status(400).send(resData)
    }
  }
}
