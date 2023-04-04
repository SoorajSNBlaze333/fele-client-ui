## Api endpoints needed for Admin
* POST /login
* POST /register
* GET  /networks (networks which the admin has access to)
* GET  /channels (channels under the network which the admin has chosen)
* GET  /local-org-users (all local users under the organization)
* POST /local-org-user (add new local org user)
* PUT  /local-org-user (update local org user)
* DELETE /local-org-user (delete local org user)
* GET  /mappings (get existing user mappings for org)
* POST /mapping (add new user mapping)
* PUT  /mapping (update user mapping)
* DELETE /mapping (delete user mapping)
* GET  /fele-users (all fele users under the network and channel)

## Api endpoints needed for User
* POST /login
* POST /register
* GET  /employees (all employees in the organization)
* POST /employee (add new employee info)
* PUT  /employee (update employee info)
* DELETE /employee (delete employee info)

