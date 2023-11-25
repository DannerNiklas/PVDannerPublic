"use client";

import { Inverter } from "@/services/firebase_rtdb";

export default async function InverterData(props: { inverter: Inverter }) {
  return (
    <div className="flex flex-col h-full w-full items-center outline-none cursor-default text-2xl border rounded-xl bg-sky-800 text-white overflow-hidden font-normal ">
      <h2 className="bg-sky-950 w-full text-center font-bold">
        {props.inverter.name}{" "}
      </h2>
      <div className="px-10">
        <div className="w-full text-left  py-2">
          <p>
            <mark className="bg-transparent text-white font-bold ">
              {" "}
              Serial Number:
            </mark>{" "}
            {props.inverter.serial}{" "}
          </p>
          <p>
            <mark className="bg-transparent text-white font-bold ">
              {" "}
              Current Limit:
            </mark>{" "}
            {props.inverter.limit_relative}{" "}
          </p>

          <p>
            <mark className="bg-transparent text-white font-bold ">
              {" "}
              Data Age:
            </mark>{" "}
            {props.inverter.data_age}
          </p>
        </div>

        <div className="w-full text-left py-2">
          {props.inverter.INV.map((inv, index) => (
            <div key={index}>
              <p className="font-bold">{`INV ${index + 1}:`}</p>
              <p>{`Temperature: ${inv.Temperature.v} ${inv.Temperature.u}`}</p>
            </div>
          ))}
        </div>
        <div>
          <div className="mb-12 w-full grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-3 overflow-hidden">
            {props.inverter.AC.map((ac, index) => (
              <div className="bg-gray overflow-hidden rounded-xl" key={index}>
                <h3 className="bg-sky-950 w-full text-center font-bold">{`AC ${
                  index + 1
                }:`}</h3>
                <div className="px-4 text-left text-base">
                  <table className="table-fixed w-full self-center divide-y-2 divide-gray-200 divide-solid">
                    <thead>
                      <tr>
                        <th>Property</th>
                        <th>Value</th>
                        <th>Unit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 divide-solid">
                      <tr>
                        <td>Power</td>
                        <td>{ac.Power.v.toFixed(2)}</td>
                        <td>{ac.Power.u}</td>
                      </tr>
                      <tr>
                        <td>Voltage</td>
                        <td>{ac.Voltage.v.toFixed(2)}</td>
                        <td>{ac.Voltage.u}</td>
                      </tr>
                      <tr>
                        <td>Current</td>
                        <td>{ac.Current.v.toFixed(2)}</td>
                        <td>{ac.Current.u}</td>
                      </tr>
                      <tr>
                        <td>Power DC</td>
                        <td>{ac["Power DC"].v.toFixed(2)}</td>
                        <td>{ac["Power DC"].u}</td>
                      </tr>
                      <tr>
                        <td>Yield Day</td>
                        <td>{ac.YieldDay.v.toFixed(2)}</td>
                        <td>{ac.YieldDay.u}</td>
                      </tr>
                      <tr>
                        <td>Yield Total</td>
                        <td>{ac.YieldTotal.v.toFixed(2)}</td>
                        <td>{ac.YieldTotal.u}</td>
                      </tr>
                      <tr>
                        <td>Frequency</td>
                        <td>{ac.Frequency.v.toFixed(2)}</td>
                        <td>{ac.Frequency.u}</td>
                      </tr>
                      <tr>
                        <td>Power Factor</td>
                        <td>{ac.PowerFactor.v.toFixed(2)}</td>
                        <td>{ac.PowerFactor.u}</td>
                      </tr>
                      <tr>
                        <td>Reactive {"\n"} Power</td>
                        <td>{ac.ReactivePower.v.toFixed(2)}</td>
                        <td>{ac.ReactivePower.u}</td>
                      </tr>
                      <tr>
                        <td>Efficiency</td>
                        <td>{ac.Efficiency.v.toFixed(2)}</td>
                        <td>{ac.Efficiency.u}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
            {props.inverter.DC.map((dc, index) => (
              <div className="bg-gray overflow-hidden rounded-xl" key={index}>
                <h3 className="bg-sky-950 w-full text-center font-bold">{`DC ${
                  index + 1
                }:`}</h3>
                <div className="px-4 text-left text-base">
                  <table className="table-fixed w-full self-center divide-y-2 divide-gray-200 divide-solid">
                    <thead>
                      <tr>
                        <th>Property</th>
                        <th>Value</th>
                        <th>Unit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 divide-solid">
                      <tr>
                        <td>Power</td>
                        <td>{dc.Power.v.toFixed(2)}</td>
                        <td>{dc.Power.u}</td>
                      </tr>
                      <tr>
                        <td>Voltage</td>
                        <td>{dc.Voltage.v.toFixed(2)}</td>
                        <td>{dc.Voltage.u}</td>
                      </tr>
                      <tr>
                        <td>Current</td>
                        <td>{dc.Current.v.toFixed(2)}</td>
                        <td>{dc.Current.u}</td>
                      </tr>
                      <tr>
                        <td>Yield Day</td>
                        <td>{dc.YieldDay.v.toFixed(2)}</td>
                        <td>{dc.YieldDay.u}</td>
                      </tr>
                      <tr>
                        <td>Yield Total</td>
                        <td>{dc.YieldTotal.v.toFixed(2)}</td>
                        <td>{dc.YieldTotal.u}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
