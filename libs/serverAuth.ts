import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import prisma from "./prismadb"

const serverAuth = async (req : NextApiRequest)=>{
const session = await getSession({req});

console.log(`session: ${session?.user?.email}`);
console.log(`session: ${session}`);
console.log(`request is: ${req}`);

if(!session?.user?.email){  
    throw new Error('Not signed in');
}

const currentUser = await prisma.user.findUnique({
    where: {
        email: session.user.email
    }
}); 

if(!currentUser){
    throw new Error('Not signed in');
}

    return {currentUser}
} 

export default serverAuth