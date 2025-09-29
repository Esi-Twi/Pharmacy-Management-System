const Drug = require('../models/drugsModel')
const Sales = require('../models/salesModel')


exports.getDashboardData = async (req, res) => {
  try {
    //number of drugs in stock 
    const allDrugs = await Drug.find({})

    //total sales today 
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    const todaysSales = await Sales.find({ createdAt: { $gte: startOfDay, $lte: endOfDay } });

    //total Weekly sales
    const startOfWeek = new Date();
    startOfWeek.setHours(0, 0, 0, 0);

    // Set to Sunday (or Monday depending on your locale)
    const day = startOfWeek.getDay();
    startOfWeek.setDate(startOfWeek.getDate() - day); // go back to Sunday

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6); // add 6 days
    endOfWeek.setHours(23, 59, 59, 999);

    const weeklySales = await Sales.find({
      createdAt: { $gte: startOfWeek, $lte: endOfWeek }
    });

    //number of drugs sold
    let drugsSoldWeekly = 0
    for (item in weeklySales) {
      drugsSoldWeekly += weeklySales[item].totalQuantity
    }

    //last 8 transactions
    const lastTransactions = await Sales.find().sort({ createdAt: -1 }).limit(8);

    //low stocks(less than 10 packs)
    const lowStocks = await Drug.find({ quantity: { $lt: 10 } }).sort({ quantity: 1 })

    //most sold drugs
    const allSales = await Sales.find({});
    const drugMap = {};

    for (const sale of allSales) {
      for (const drug of sale.items) {
        if (drugMap[drug.drugId]) {
          drugMap[drug.drugId].quantity += drug.quantity;
        } else {
          drugMap[drug.drugId] = {
            id: drug.drugId,
            drugName: drug.drugName,
            quantity: drug.quantity
          };
        }
      }
    }

    // Convert back to array
    const mostSoldDrugs = Object.values(drugMap);
    mostSoldDrugs.sort((a, b) => b.quantity - a.quantity);
    const topMostSoldDrugs = mostSoldDrugs.slice(0, 5);


    res.json({ topMostSoldDrugs, lowStocks, drugsSoldWeekly, noLast: lastTransactions.length, lastTransactions, todaysSales: todaysSales.length, weeklySales: weeklySales.length, NoDrugs: allDrugs.length })

  } catch (error) {
    console.log(error);
    res.json({ msg: "Error in get dashboard data", error })
  }
}


exports.getDailyReport = async (req, res) => {
  try {
    //total sales today 
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    const todaysSales = await Sales.find({ createdAt: { $gte: startOfDay, $lte: endOfDay } });

    //most sold drugs of the day
    const drugMap = {};
    for (const sale of todaysSales) {
      for (const drug of sale.items) {
        if (drugMap[drug.drugId]) {
          drugMap[drug.drugId].quantity += drug.quantity;
        } else {
          drugMap[drug.drugId] = {
            id: drug.drugId,
            drugName: drug.drugName,
            quantity: drug.quantity
          };
        }
      }
    }
    // Convert back to array
    const mostSoldDrugs = Object.values(drugMap);
    mostSoldDrugs.sort((a, b) => b.quantity - a.quantity);






    res.json({ numOfSales: todaysSales.length, mostSoldDrugs, todaysSales })

  } catch (error) {
    console.log(error);
    res.json({ msg: "Error in get dashboard data ", error })
  }
}

/*
  * Sales over hours (line chart: 8am → 10pm).
  * Breakdown of sales by category (pie chart).
*/

exports.getWeeklyReport = async (req, res) => {
  //total Weekly sales
  const startOfWeek = new Date();
  startOfWeek.setHours(0, 0, 0, 0);

  // Set to Sunday (or Monday depending on your locale)
  const day = startOfWeek.getDay();
  startOfWeek.setDate(startOfWeek.getDate() - day); // go back to Sunday

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6); // add 6 days
  endOfWeek.setHours(23, 59, 59, 999);

  const weeklySales = await Sales.find({
    createdAt: { $gte: startOfWeek, $lte: endOfWeek }
  });

  //weekly revenue
  let weeklyRevenue = 0
  for (item in weeklySales) {
    weeklyRevenue += weeklySales[item].totalPrice
  }

  //average sales 
  const averageSales = (weeklyRevenue) / weeklySales.length

  //most sold drugs of the day
  const drugMap = {};
  for (const sale of weeklySales) {
    for (const drug of sale.items) {
      if (drugMap[drug.drugId]) {
        drugMap[drug.drugId].quantity += drug.quantity;
      } else {
        drugMap[drug.drugId] = {
          id: drug.drugId,
          drugName: drug.drugName,
          quantity: drug.quantity
        };
      }
    }
  }
  // Convert back to array
  const mostSoldDrugs = Object.values(drugMap);
  mostSoldDrugs.sort((a, b) => b.quantity - a.quantity);

  res.json({ weeklyRevenue, numSales: weeklySales.length, averageSales, mostSoldDrugs })
}

/*
* **Charts & Analytics**
  * Bar Chart: Sales per day (Monday–Sunday).
  * Comparison to Last Week (↑ or ↓ percentage).
* **Quick Trends**
  * Which days of the week perform best (e.g., higher weekend sales).
*/

exports.getMonthlyReport = async (req, res) => {
  // Monthly sales
  const startOfMonth = new Date();
  startOfMonth.setDate(1); // first day of month
  startOfMonth.setHours(0, 0, 0, 0);

  const endOfMonth = new Date(startOfMonth);
  endOfMonth.setMonth(endOfMonth.getMonth() + 1); // next month
  endOfMonth.setDate(0); // last day of previous month
  endOfMonth.setHours(23, 59, 59, 999);

  const monthlySales = await Sales.find({
    createdAt: { $gte: startOfMonth, $lte: endOfMonth }
  });

  //total revenue
  let totalRevenue = 0
  for (item in monthlySales) {
    totalRevenue += monthlySales[item].totalPrice
  }

  const averageSales = totalRevenue / monthlySales.length

  //most sold drugs of the montth
  const drugMap = {};
  for (const sale of monthlySales) {
    for (const drug of sale.items) {
      if (drugMap[drug.drugId]) {
        drugMap[drug.drugId].quantity += drug.quantity;
      } else {
        drugMap[drug.drugId] = {
          id: drug.drugId,
          drugName: drug.drugName,
          quantity: drug.quantity
        };
      }
    }
  }
  // Convert back to array
  const mostSoldDrugs = Object.values(drugMap);
  mostSoldDrugs.sort((a, b) => b.quantity - a.quantity);

  res.json({ totalRevenue, noSales: monthlySales.length, averageSales, mostSoldDrugs })
}

/*
  * Most Profitable Drug
  * Line/Bar Chart: Daily Sales trend (Day 1 → Day 30/31).
  * Pie/Donut Chart: Sales distribution by drug categories (e.g., Painkillers, Antibiotics, Cough medicines).
*/

exports.getYearlyReport = async (req, res) => {
  // Yearly sales
  const startOfYear = new Date();
  startOfYear.setMonth(0, 1); // January 1st
  startOfYear.setHours(0, 0, 0, 0);

  const endOfYear = new Date(startOfYear);
  endOfYear.setFullYear(endOfYear.getFullYear() + 1); // next year
  endOfYear.setDate(0); // last day of previous year (Dec 31)
  endOfYear.setHours(23, 59, 59, 999);

  const yearlySales = await Sales.find({
    createdAt: { $gte: startOfYear, $lte: endOfYear }
  });

  //total revenue
  let totalRevenue = 0
  for (item in yearlySales) {
    totalRevenue += yearlySales[item].totalPrice
  }


  //most sold drugs of the montth
  const drugMap = {};
  for (const sale of yearlySales) {
    for (const drug of sale.items) {
      if (drugMap[drug.drugId]) {
        drugMap[drug.drugId].quantity += drug.quantity;
      } else {
        drugMap[drug.drugId] = {
          id: drug.drugId,
          drugName: drug.drugName,
          quantity: drug.quantity
        };
      }
    }
  }
  // Convert back to array
  const mostSoldDrugs = Object.values(drugMap);
  mostSoldDrugs.sort((a, b) => b.quantity - a.quantity);
  const topMostSoldDrugs = mostSoldDrugs.slice(0, 10);

  res.json({ totalRevenue, noSales: yearlySales.length, topMostSoldDrugs })
}

/*
  * Best Performing Pharmacist
  * Line/Bar Chart: Monthly Sales trend (Jan → Dec).
  * Category Performance: Which drug categories generated the most revenue.
  * Year-over-Year Growth Comparison (e.g., 2024 vs 2025).
  * Seasonal Insights (e.g., more malaria drugs sold during rainy season).
*/
