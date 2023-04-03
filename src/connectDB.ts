import { createConnection } from "typeorm"
import { UserEntity } from "./user/user.entity"
export default async () => {
  await createConnection({
    type: "postgres",
    host: process.env.HOST_PG,
    port: parseInt(process.env.POST_PG),
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASENAME,
    entities: [UserEntity],
    synchronize: true,
  })
}
