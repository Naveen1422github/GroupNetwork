using {app.node} from '../db/schema';

service hanaservices {

    entity Groups    as projection on node.Groups;
    entity Nodes   as projection on node.Nodes;
    entity Lines as projection on node.Lines;
}
