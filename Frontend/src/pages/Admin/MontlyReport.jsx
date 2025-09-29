import Loader from '../../components/Loader';
import DataTable from '../../components/DataTable';
import { useAnalyticsStore } from '../../store/useAnalyticsStore';
import React, { useEffect } from 'react'

function MontlyReport() {

  const { monthlyData, isGettingMonthlyData, getMonthlyData } = useAnalyticsStore()

  useEffect(() => {
    getMonthlyData()
  }, [])

  console.log(monthlyData);

  const statsData = [
    {
      title: 'Total Medicines',
      value: monthlyData?.NoDrugs || 0,
      icon: 'bi-capsule',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      textColor: 'text-green-800'
    },
    {
      title: 'Sold This Week',
      value: monthlyData?.drugsSoldWeekly || 0,
      icon: 'bi-box-seam',
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      textColor: 'text-yellow-800'
    },
    {
      title: 'Sales Today',
      value: monthlyData?.todaysSales || 0,
      icon: 'bi-exclamation-triangle',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-800'
    },
    {
      title: 'Sales This Week',
      value: monthlyData?.weeklySales || 0,
      icon: 'bi-calendar-x',
      bgColor: 'bg-red-100',
      iconColor: 'text-red-600',
      textColor: 'text-red-800'
    }
  ];


  return (
    <div>
      <div className="p-4 lg:p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {statsData.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl lg:text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <i className={`${stat.icon} ${stat.iconColor} text-xl`}></i>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* top 10 most sold drugs */}
        {isGettingMonthlyData ? <Loader /> :
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 m-4 lg:p-6">
            <div>
              <h1 className='font-bold text-2xl text-blue-500'>Top 10 most sold drugs</h1>
            </div>
            <DataTable
              data={monthlyData?.topMostSoldDrugs}
              onReload={() => getDashboardData()}
              columns={{
                _id: "ID",
                drugName: "Name",
                quantity: "Quantity Sold",
              }}
              columnRenderers={{
                _id: (_, __, rowIndex) => rowIndex + 1,
                createdAt: (value) => {
                  if (!value) return "";
                  const d = value instanceof Date ? value : new Date(value);
                  const year = d.getFullYear();
                  const month = String(d.getMonth() + 1).padStart(2, "0");
                  const day = String(d.getDate()).padStart(2, "0");
                  return `${year}-${month}-${day}`;
                }
              }}
            />
          </div>}
      </div>
    </div>
  )
}

export default MontlyReport