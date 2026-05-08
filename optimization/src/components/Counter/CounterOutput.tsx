import { log } from "../../log";

export default function CounterOutput({ value }: { value: number }) {
    log('<CounterOutput /> rendered', 2);

  const cssClass = value >= 0 ? 'counter-output' : 'counter-output negative';
  return <span className={cssClass}>{value}</span>;
}