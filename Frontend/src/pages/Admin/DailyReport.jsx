import { useAnalyticsStore } from '../../store/useAnalyticsStore';
import React, {useEffect} from 'react'

function DailyReport() {
  const { DailyData, isGettingDailyData, getDailyData } = useAnalyticsStore()

  useEffect(() => {
    getDailyData()
  }, [])

  console.log(DailyData);


  return (
    <div>DailyReport</div>
  )
}

export default DailyReport