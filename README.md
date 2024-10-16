# Go + React practice
## Teh tech
### Backend
 - golang
 - sqlx
 - go-chi 
 - postgres 
 - flyway 


### Frontend 
 - ts 
 - react 
 - mui ui library (not yet commited)
 - vite 

## Dev-ing

get a postgres container running
```
docker run -d --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=password postgres
```

run the go server
```bash
go run main.go
```
run front end (yeah i named it egg)
```bash
cd egg
npm run dev
```


 ### todo
- [x] extract out "showpost method" and pass post as props to showPost component (refactor)
- [x] extract out "showposts method" and pass posts as props to showPosts component (refactor)
- [x] implement GET 
- [x] implement POST
- [x] implement PUT
- [x] implement DELETE
- [ ] make it look good 

![funny gif](https://jollycontrarian.com/images/a/ab/Dramatic_Look_Gopher.gif) 
- ^ (gopher reacting) ^
