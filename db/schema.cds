namespace app.node;

using { managed } from '@sap/cds/common';

entity Nodes : managed {
    key nodeId:Integer;
    nodeTitle:String;
    nodeShape:String;
    nodeIcon:String;
    nodeStatus:String;
    nodeGroup: String;
    
}

type nodeAttributes {
    label : String;
    value : String;
}


entity Lines : managed {
    key lineId:UUID;
    lineFrom:String;
    lineTo:String;
}

entity Groups : managed {
    key groupId:Integer;
    groupKey : String;
    groupTitle:String;
    groupIcon:String;
    groupStatus:String;

}


