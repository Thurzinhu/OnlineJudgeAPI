import { redirect } from "next/navigation";


export default function Home() {
  redirect("/problems");
  
  return null;
}
