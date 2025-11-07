"use client";

import { useState, useEffect } from "react";
import {
  BURMESE_DAYS_OF_STAGE,
  BURMESE_STAGE_NAMES,
  GUNAS,
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
    stageName: string;
  } | null>(null);
  const [currentDate, setCurrentDate] = useState<Date | null>(null);

  useEffect(() => {
    const startDate = new Date("2025-11-03T00:00:00");
    const today = new Date();
    setCurrentDate(today);

    const diffTime = today.getTime() - startDate.getTime();
    if (diffTime < 0) {
      // The cycle has not started yet
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
        stageName: BURMESE_STAGE_NAMES[stageIndex],
      });
    } else {
      // The 81-day cycle is complete
      setTodayInfo(null);
    }
  }, []);

  const getCellStyle = (isCurrentDay: boolean) => {
    if (isCurrentDay) {
      return {
        backgroundColor: "#e6f7ff",
        border: "2px solid #1890ff",
        fontWeight: "bold",
      };
    }
    return {};
  };

  return (
    <main>
      <h1>ကိုးနဝင်းကျင့်စဉ်</h1>

      <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#fff', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Today's Prayer</h2>
        {currentDate && <p><strong>Current Date:</strong> {currentDate.toLocaleDateString()}</p>}
        {todayInfo ? (
          <>
            <p><strong>Cycle Day:</strong> {todayInfo.cycleDay} / {TOTAL_DAYS}</p>
            <p><strong>Stage:</strong> {todayInfo.stageName}</p>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}><strong>Today's Guna:</strong> {todayInfo.guna}</p>
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
              <td>{BURMESE_STAGE_NAMES[stageIndex]}</td>
              {stage.map((gunaIndex, dayIndex) => (
                <td
                  key={dayIndex}
                  style={getCellStyle(
                    todayInfo?.stageIndex === stageIndex &&
                    todayInfo?.dayInStageIndex === dayIndex
                  )}
                >
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
