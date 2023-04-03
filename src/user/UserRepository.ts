import { Repository } from "typeorm"
import { UserEntity } from "./user.entity"

export const getUser = async (rePosi: Repository<UserEntity>, id?: string) => {
  let result
  if (id) {
    result = await rePosi.findOne({
      where: {
        id: id,
      },
    })
  } else {
    result = await rePosi.find()
  }
  return result
}

export const createUser = async (rePosi: Repository<UserEntity>, data: any) => {
  return await rePosi.save(data)
}

export const updateUser = async (
  rePosi: Repository<UserEntity>,
  id: string,
  data: any
) => {
  return await rePosi.update(id, data)
}

export const deleteUser = async (
  rePosi: Repository<UserEntity>,
  id: string
) => {
  return await rePosi.delete(id)
}
