import {
  getDatabase,
  ref,
  set,
  query,
  orderByChild,
  onValue,
  Query,
  DataSnapshot,
  Database,
} from "firebase/database";

export interface Inverter {
  AC: any[];
  DC: any[];
  INV: any[];
  data_age: number;
  events: number;
  limit_absolute: number;
  limit_relative: number;
  name: string;
  order: number;
  poll_enabled: boolean;
  producing: boolean;
  reachable: boolean;
  serial: string;
}

interface Power {
  d: number;
  u: string;
  v: number;
}

interface Total {
  Power: Power;
  YieldDay: Power;
  YieldTotal: Power;
}

export interface FirstElement {
  hints: {
    default_password: boolean;
    radio_problem: boolean;
    time_sync: boolean;
  };
  inverters: Inverter[];
  timestamp: number;
  total: Total;
}

export const updateRTDB = (
  realtimeDB: Database,
  maxCurrentDataLength: number
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const inverterQuery: Query = query(
      ref(realtimeDB, "inverters/data"),
      orderByChild("inv/timestamp")
    );

    onValue(inverterQuery, (snapshot: DataSnapshot) => {
      const data: any = snapshot.val();
      if (!!data) {
        const dataArray: any[] = Object.values(data).reverse();
        //console.log("Data length: " + dataArray.length);
        if (dataArray.length > maxCurrentDataLength) {
          //set a datapoint on the current date
          let date = new Date();
          let day = String(date.getDate()).padStart(2, "0");
          let month = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
          let year = date.getFullYear();
          let formattedDate = day + "|" + month + "|" + year;
          const currentDateRef = ref(realtimeDB, "dailyData/" + formattedDate);
          const firstElement: any = dataArray[0];

          set(currentDateRef, {
            data: firstElement,
          });

          //delete previous entries
          const generalInverterRef = ref(realtimeDB, "inverters/data");
          set(generalInverterRef, {
          }).then(
            () => {
              set(generalInverterRef, {
                data: firstElement,
              })
            }
          );

        }
        resolve("Data length: " + dataArray.length);
      } else {
        reject("Data not found");
      }
    });
  });
};

export const getLatestInverterData = (realtimeDB: Database): Promise<any> => {
  return new Promise((resolve, reject) => {
    const inverterQuery: Query = query(
      ref(realtimeDB, "inverters/data"),
      orderByChild("inv/timestamp")
    );

    onValue(inverterQuery, (snapshot: DataSnapshot) => {
      const data: any = snapshot.val();
      if (!!data) {
        const dataArray: any[] = Object.values(data).reverse();

        const firstElement: any = dataArray[0];
        resolve(firstElement);
      } else {
        reject("Data not found");
      }
    });
  });
};

export const getLatestTotal = (realtimeDB: Database) => {
  const inverterQuery: Query = query(
    ref(realtimeDB, "inverters/data"),
    orderByChild("inv/timestamp")
  );

  onValue(inverterQuery, (snapshot: DataSnapshot) => {
    const data: any = snapshot.val();
    if (!!data) {
      const dataArray: any[] = Object.values(data);
      const firstElement: any = dataArray[0].total;
      //console.log(firstElement);
    } else {
      console.log("Data not found");
    }
  });
};
