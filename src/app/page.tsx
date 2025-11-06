import {
  BURMESE_DAYS_OF_STAGE,
  BURMESE_STAGE_NAMES,
  GUNAS,
  KO_NAWIN_GUNA_INDICES,
} from "./data";

export default function Home() {
  return (
    <main>
      <h1>
        ကိုးနဝင်းကျင့်စဉ်
      </h1>
      <table>
        <thead>
          <tr>
            <th>အဆင့်</th>
            {BURMESE_DAYS_OF_STAGE.map((day) => (
              <th key={day}>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {KO_NAWIN_GUNA_INDICES.map((stage, stageIndex) => (
            <tr key={stageIndex}>
              <td>{BURMESE_STAGE_NAMES[stageIndex]}</td>
              {stage.map((gunaIndex, dayIndex) => (
                <td key={dayIndex}>
                  {GUNAS[gunaIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
