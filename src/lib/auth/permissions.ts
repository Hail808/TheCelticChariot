import { createAccessControl } from "better-auth/plugins/access";

const statement = {
    project: ["create", "share", "update", "delete"],
} as const;
const ac = createAccessControl(statement);
const customer = ac.newRole({ 
    project: ["create"], 
}); 
const admin = ac.newRole({ 
    project: ["create", "update"], 
}); 


export {ac,admin,customer,statement}