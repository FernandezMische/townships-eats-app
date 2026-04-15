BACKEND
clone repo
install node npm init -y

'cd backend' then run 'npm install' to install all dependencies 
add dump to your sql run the query. back in VS change the password to your sql password in backend env:
DB_PASSWORD=yourPassword

in backend terminal run 'npx nodemon index.js' or 'npm nodemon index.js'

open a second terminal in root and run 'npx localtunnel --port 5401'
copy and paste the provided link over the link in the backend env where:
PAYFAST_NOTIFY_URL=this-is-where-your-link-goes/api/payfast/notify
(no need to kill this terminal and reload if needed reload backend and frontend only as localtunnel gives random links each time)

open a third terminal and 'cd frontend' 
here you 'npm run dev'

FRONTEND
.....

login credentials for testing.
vendor has a specific login because he owns Kasi Flavours shop.
email: charlton@gmail.com
password: mische
select vendor and login.

to get email confirmation of purchase register as a customer with your real email :)
