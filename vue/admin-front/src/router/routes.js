import {routes as home} from '../modules/home/router'
import {routes as admin} from '../modules/admin/router'
import {routes as login} from '../modules/login/router'
import {routes as user} from '../modules/user-edit/router'
import {routes as userCreate} from '../modules/user-create/router'

export default [
  ...home,
  ...admin,
  ...login,
  ...user,
  ...userCreate
]
