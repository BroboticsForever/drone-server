# drone-server
video delivery/ node server

To run- start the server then start the browser on  the server side
navigate to localhost:3000/serverBroadcast.html the server side browser has to be started before
any clients connect

to stream video, connect to the IP:3000, select standard video and it will trigger the broadcast server
to stream to the client, as well as, initiate object recognition

Note: i havent implement a disconnected/reconnected user scheme so you can only get the broadcast one time
if the stream stops or a client refreshes, the node server needs to be start over and server broadcaster connected first
then the client can reconnect

to fix this the broadcaster must be notified on disconnect so it can begin repolling the node server for new client ID
the old client ID also needs to be set to NULL so the broadcaster does not grab the wrong ID and stop polling.
