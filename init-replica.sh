#!/bin/bash
mongosh --port 40001 <<EOF
rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "mongodb0:40001" },
    { _id: 1, host: "mongodb1:40002" },
    { _id: 2, host: "mongodb2:40003" }
  ]
})
EOF
