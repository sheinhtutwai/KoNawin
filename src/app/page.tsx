"use client";

import { useState, useEffect } from "react";
import {
  BURMESE_DAYS_OF_STAGE,
  BURMESE_STAGE_NAMES,
  GUNAS,
  GUNA_ROUNDS,
  KO_NAWIN_GUNA_INDICES,
  DAYS_PER_STAGE,
  TOTAL_DAYS,
} from "./data";

export default function Home() {
  const [todayInfo, setTodayInfo] = useState<{
    cycleDay: number;
    stageIndex: number;
    dayInStageIndex: number;
    guna: string;
    gunaRounds: number;
    stageName: string;
  } | null>(null);
  const [currentDate, setCurrentDate] = useState<Date | null>(null);

  useEffect(() => {
    const startDate = new Date("2025-11-03T00:00:00");
    const today = new Date();
    setCurrentDate(today);

    const diffTime = today.getTime() - startDate.getTime();
    if (diffTime < 0) {
      setTodayInfo(null);
      return;
    }

    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < TOTAL_DAYS) {
      const cycleDay = diffDays + 1;
      const stageIndex = Math.floor(diffDays / DAYS_PER_STAGE);
      const dayInStageIndex = diffDays % DAYS_PER_STAGE;
      const gunaIndex = KO_NAWIN_GUNA_INDICES[stageIndex][dayInStageIndex];

      setTodayInfo({
        cycleDay,
        stageIndex,
        dayInStageIndex,
        guna: GUNAS[gunaIndex],
        gunaRounds: GUNA_ROUNDS[gunaIndex],
        stageName: BURMESE_STAGE_NAMES[stageIndex],
      });
    } else {
      setTodayInfo(null);
    }
  }, []);

  return (
    <main>
      <h1>ကိုးနဝင်းကျင့်စဉ်</h1>

      <div className="today-card">
        <h2>Today's Prayer</h2>
        {currentDate && <p><strong>Current Date:</strong> {currentDate.toLocaleDateString()}</p>}
        {todayInfo ? (
          <>
            <p><strong>Cycle Day:</strong> {todayInfo.cycleDay} / {TOTAL_DAYS}</p>
            <p><strong>Stage:</strong> {todayInfo.stageName}</p>
            <p className="guna"><strong>Today's Guna:</strong> {todayInfo.guna} ({todayInfo.gunaRounds} ပတ်)</p>
          </>
        ) : (
          <p>The prayer cycle is either not yet started or has completed.</p>
        )}
      </div>

      <table>
        <thead>
          <tr>
            <th>အဆင့်</th>
            {BURMESE_DAYS_OF_STAGE.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {KO_NAWIN_GUNA_INDICES.map((stage, stageIndex) => (
            <tr key={stageIndex}>
              <td data-label="အဆင့်">{BURMESE_STAGE_NAMES[stageIndex]}</td>
              {stage.map((gunaIndex, dayIndex) => (
                <td
                  key={dayIndex}
                  data-label={BURMESE_DAYS_OF_STAGE[dayIndex]}
                  className={
                    todayInfo?.stageIndex === stageIndex &&
                    todayInfo?.dayInStageIndex === dayIndex
                      ? "highlight"
                      : ""
                  }
                >
                  {GUNAS[gunaIndex]} ({GUNA_ROUNDS[gunaIndex]} ပတ်)
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
