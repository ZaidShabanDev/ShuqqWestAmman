import { loginIsRequiredServer } from "@/lib/auth";

export default async function Dashboard() {
    await loginIsRequiredServer();
    return ( <div>hi</div> );
} 
 