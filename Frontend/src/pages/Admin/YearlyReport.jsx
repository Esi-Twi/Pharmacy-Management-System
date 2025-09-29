import Loader from '../../components/Loader';
import DataTable from '../../components/DataTable';
import { useAnalyticsStore } from '../../store/useAnalyticsStore';
import React, { useEffect } from 'react'


function YearlyReport() {
  const { yearlyData, isGettingYearlyData, getYearlyData } = useAnalyticsStore()

  useEffect(() => {
    getYearlyData()
  }, [])


  const statsData = [
    {
      title: 'Total Sales Made',
      value: yearlyData?.noSales || 0,
      icon: 'bi-capsule',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      textColor: 'text-green-800'
    },
    {
      title: 'Total Revenue(GHS)',
      value: yearlyData?.totalRevenue || 0,
      icon: 'bi-currency-dollar',
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      textColor: 'text-yellow-800'
    },
  
  ];


  return (
    <div>
      <div className="p-4 lg:p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-6">
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
      {isGettingYearlyData ? <Loader /> :
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
          <div>
            <h1 className='font-bold text-2xl text-blue-500'>Top 10 most sold drugs</h1>
          </div>
          <DataTable
            data={yearlyData?.topMostSoldDrugs}
            onReload={() => getYearlyData()}
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

export default YearlyReport