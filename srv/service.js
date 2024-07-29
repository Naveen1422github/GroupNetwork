const cds = require('@sap/cds');


module.exports = cds.service.impl( function() {
    this.on('CREATE', 'Groups', async(req) =>{
        console.log("Helloooooo", req.data);
        let groupId = undefined;
        let maxGroupId = await SELECT('groupId').from('hanaservices.Groups').orderBy('groupId desc').limit(1);
        console.log("maxGroupId ", maxGroupId);
        if(maxGroupId.length != 0  && maxGroupId[0].groupId){
            groupId = maxGroupId[0].groupId + 1;
        }
        else{
            groupId = 1;
        }
        console.log("groupId", groupId);
        req.data.groupId = groupId;
        console.log("Helloooooo", req.data.groupId);
        let createRes = await INSERT.into('hanaservices.Groups').entries(req.data)
        return req.reply([{
            "groupId" : 1,
            "groupname" : "Create Successfully"
        }]);
    });

    this.on('CREATE', 'Nodes', async(req) => {
        console.log("Creating node", req.data);
        let nodeId = undefined;
        let maxNodeId = await SELECT('nodeId').from('hanaservices.Nodes').orderBy('nodeId desc').limit(1);
        console.log("maxNodeId ", maxNodeId);
        if (maxNodeId.length != 0 && maxNodeId[0].nodeId) {
            nodeId = maxNodeId[0].nodeId + 1;
        } else {
            nodeId = 1;
        }
        console.log("nodeId", nodeId);
        req.data.nodeId = nodeId;
        console.log("Helloooooo", req.data.nodeId);
        let createRes = await INSERT.into('hanaservices.Nodes').entries(req.data);
        return req.reply([{
            "nodeId": nodeId,
            "nodename": "Create Successfully"
        }]);
    });

//     this.on('CREATE', 'nodeConnections', async(req) => {
//         console.log("Creating nodeConnection id", req.data);
//         let connectionsid = undefined;
//         let maxConnectionsid = await SELECT('connectionsid').from('hanaservices.nodeConnections').orderBy('connectionsid desc').limit(1);
//         console.log("maxConnectionsid ", maxConnectionsid);
//         if (maxConnectionsid.length != 0 && maxConnectionsid[0].connectionsid) {
//             connectionsid = maxConnectionsid[0].connectionsid + 1;
//         } else {
//             connectionsid = 1;
//         }
//         console.log("connectionsid", connectionsid);
//         req.data.connectionsid = connectionsid;
//         // console.log("Helloooooo", req.data.connectionsid);
//         let createRes = await INSERT.into('hanaservices.nodeConnections').entries(req.data);
//         return req.reply([{
//             "connectionsid": connectionsid,
        
//         }]);
//     });
})