import { use } from "react";
import { OpinionsContext } from "../store/opinions-context";
import { Opinion } from "./Opinion";

export function Opinions() {
  const { opinions } = use(OpinionsContext);
  
  return (
    <div id="opinions">
      <h2>User Opinions</h2>
      {opinions && (
        <ul>
          {opinions.map((o) => (
            <li key={o.id}>
              <Opinion opinion={o} />
            </li>
          ))}
        </ul>
      )}
      {!opinions && (
        <p>No opinions found. Maybe share your opinion on something?</p>
      )}
    </div>
  );
}