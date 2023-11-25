import Image from "next/image";
import Link from "next/link";
import blogIcon from "@/images/blog_no_bg.png";
import downloadIcon from "@/images/download_no_bg.png";
import projectsIcon from "@/images/projects_no_bg.png";

import * as FirestoreService from "@/services/firestore";
import TotalInformatic from "./fragments/TotalInformatic";
import InverterData from "./fragments/InverterData";

export default async function LandingPage() {
  var latestInverterData = await FirestoreService.getRealtimeData();
  var dataTimeStamp = new Date(latestInverterData.timestamp)

  await FirestoreService.updateRTDB();

  return (
    <section className="flex min-h-screen w-full flex-col items-center space-y-5 sm:space-y-5 bg-primary dark:bg-primary overflow-hidden relative  max-w-screen-lg mx-auto flex-auto text-stone-800">
      <h1 className=" text-center self-center h-full w-full  outline-none cursor-default text-4xl font-black">
        Inverter Data
      </h1>
      <p>Based on data from {dataTimeStamp.toLocaleDateString()} at {dataTimeStamp.toLocaleTimeString()} </p>
      <div className="mb-12 w-full grid grid-cols-1 gap-x-16 gap-y-8 sm:grid-cols-3 ">
        <TotalInformatic
          title="Total Yield Total"
          power={latestInverterData.total.YieldTotal.v}
          unit={latestInverterData.total.YieldTotal.u}
        />
        <TotalInformatic
          title="Total Yield Day"
          power={latestInverterData.total.YieldDay.v}
          unit={latestInverterData.total.YieldDay.u}
        />
        <TotalInformatic
          title="Total Power"
          power={latestInverterData.total.Power.v}
          unit={latestInverterData.total.Power.u}
        />
      </div>

      {latestInverterData.inverters.map((inverter, index) => (
        <InverterData key={index} inverter={inverter}/>
      ))}
    </section>
  );
}
