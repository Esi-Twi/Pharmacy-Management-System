import { useAnalyticsStore } from '../../store/useAnalyticsStore';
import React, {useEffect} from 'react'

function WeeklyReport() {
 const { weeklyData, isGettingWeeklyData, getWeeklyData } = useAnalyticsStore()

  useEffect(() => {
    getWeeklyData()
  }, [])

  console.log(weeklyData);

  return (
    <div>WeeklyReport</div>
  )
}

export default WeeklyReport