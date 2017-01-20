yourFishingReport
Users can get/add fishing reports and information on specific bodies of water. 

After downloading the project:
- Ensure node/npm, express, and less-middleware are installed to run node
- This app uses MongoDB and will need MongoDB to be started before you can start node. 
- cd to project root folder
- run mongod to start mongo (may need to run as sudo if it fails to start)
- run 'node index.js' to start node.js - this file connects to mongo automatically
- navigate to: http://localhost:1337/

To kill node server:
ps aux | grep node
kill -9 PROCESS_ID 


MongoDB setup

Install - https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/
Run - http://mongodb.github.io/node-mongodb-native/2.2/quick-start/?_ga=1.257366219.1598135373.1484100619

Solid setup/walkthrough 
https://www.terlici.com/2015/04/03/mongodb-node-express.html

Another walkthrough with bodyparser explanation
https://zellwk.com/blog/crud-express-mongodb/
