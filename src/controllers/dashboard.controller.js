// import { Order } from "../models/order.model.js";
// import { Product } from "../models/product.model.js";
// import User from "../models/user.model.js";
// import AppError from "../utils/Error.js";
// export const ChangePercentage = function (thismonth, lastmonth) {
//   const per = thismonth - lastmonth;
//   if (lastmonth === 0) {
//     return thismonth * 100;
//   }

//   return ((per / lastmonth) * 100).toFixed(0);
// };
// export const dashboardstat = async function (req, res, next) {
//   try {
//     const today = new Date();

//     const startingofthemonth = new Date(
//       today.getFullYear(),
//       today.getMonth(),
//       1
//     );
//     const lastdayofthemonth = new Date(
//       today.getFullYear(),
//       today.getMonth() + 1,
//       0
//     );
//     const startoflastmonth = new Date(
//       today.getFullYear(),
//       today.getMonth() - 1,
//       1
//     );
//     const endoflastmonth = new Date(today.getFullYear(), today.getMonth(), 0);

//     const productsOfThisMonthPromise = Product.find({
//       createdAt: {
//         $gte: startingofthemonth,
//         $lte: today,
//       },
//     });

//     const productsOfLastMonthPromise = Product.find({
//       createdAt: {
//         $gte: startoflastmonth,
//         $lte: endoflastmonth,
//       },
//     });

//     const UserOfThisMonthPromise = User.find({
//       createdAt: {
//         $gte: startingofthemonth,
//         $lte: today,
//       },
//     });

//     const UserOfLastMonthPromise = User.find({
//       createdAt: {
//         $gte: startoflastmonth,
//         $lte: endoflastmonth,
//       },
//     });

//     const OrdersOfThisMonthPromise = Order.find({
//       createdAt: {
//         $gte: startingofthemonth,
//         $lte: today,
//       },
//     });

//     const OrdersOfLastMonthPromise = Order.find({
//       createdAt: {
//         $gte: startoflastmonth,
//         $lte: endoflastmonth,
//       },
//     });

//     const [
//       productsOfThisMonth,
//       productsOfLastMonth,
//       UserOfThisMonth,
//       UserOfLastMonth,
//       OrdersOfThisMonth,
//       OrdersOfLastMonth,
//     ] = await Promise.all([
//       productsOfThisMonthPromise,
//       productsOfLastMonthPromise,
//       UserOfThisMonthPromise,
//       UserOfLastMonthPromise,
//       OrdersOfThisMonthPromise,
//       OrdersOfLastMonthPromise,
//     ]);

//     const userChange = ChangePercentage(
//       UserOfThisMonth.length,
//       UserOfLastMonth.length
//     );
//     const orderChange = ChangePercentage(
//       OrdersOfThisMonth.length,
//       OrdersOfLastMonth.length
//     );
//     const productChange = ChangePercentage(
//       productsOfThisMonth.length,
//       productsOfLastMonth.length
//     );
//     const stats = {
//       userChange,
//       productChange,
//       orderChange,
//     };

//     res.status(200).json({
//       status: "success",
//       message: "Dashboard statistics fetched successfully",
//       stats,
//       OrdersOfLastMonth
//     });
//   } catch (error) {
//     next(new AppError(error.message, 400, error));
//   }
// };
import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import User from "../models/user.model.js";
import AppError from "../utils/Error.js";

// Helper function to calculate percentage change
export const ChangePercentage = function (thisMonthCount, lastMonthCount) {
  if (lastMonthCount === 0) {
    return thisMonthCount * 100; // If last month has no data, return 100% increase
  }
  const difference = thisMonthCount - lastMonthCount;
  return ((difference / lastMonthCount) * 100).toFixed(0); // Return percentage change
};

export const dashboardstat = async function (req, res, next) {
  try {
    const today = new Date();
    const sixmonthsAgo = new Date();
    sixmonthsAgo.setMonth(sixmonthsAgo.getMonth() - 6);
    const startingOfTheMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );
    const lastDayOfTheMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );

    const startOfLastMonth = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      1
    );
    const endOfLastMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0,
      23,
      59,
      59,
      999
    );

    const productsOfThisMonthPromise = Product.find({
      createdAt: {
        $gte: startingOfTheMonth,
        $lte: today,
      },
    });
    const productsOfLastMonthPromise = Product.find({
      createdAt: {
        $gte: startOfLastMonth,
        $lte: endOfLastMonth,
      },
    });

    const usersOfThisMonthPromise = User.find({
      createdAt: {
        $gte: startingOfTheMonth,
        $lte: today,
      },
    });

    const usersOfLastMonthPromise = User.find({
      createdAt: {
        $gte: startOfLastMonth,
        $lte: endOfLastMonth,
      },
    });

    const ordersOfThisMonthPromise = Order.find({
      createdAt: {
        $gte: startingOfTheMonth,
        $lte: today,
      },
    });

    const ordersOfLastMonthPromise = Order.find({
      createdAt: {
        $gte: startOfLastMonth,
        $lte: endOfLastMonth,
      },
    });
    const sixmonthsagoOrderPromise = Order.find({
      createdAt: {
        $gte: sixmonthsAgo,
        $lte: today,
      },
    });
    const latesttransactions = await Order.find({})
      .limit(4)
      .sort("-createdAt")
      .select({
        _id: 1,
        discount: 1,
        totalAmount: 1,
        orderStatus: 1,
        orderItems: 1,
      });
    const [
      productsOfThisMonth,
      productsOfLastMonth,
      usersOfThisMonth,
      usersOfLastMonth,
      ordersOfThisMonth,
      ordersOfLastMonth,
      totalUsers,
      totalProducts,
      totalrevenue,
      sixmonthsAgoorders,
      femaleusers,
      maleusers,
      otherusers,
    ] = await Promise.all([
      productsOfThisMonthPromise,
      productsOfLastMonthPromise,
      usersOfThisMonthPromise,
      usersOfLastMonthPromise,
      ordersOfThisMonthPromise,
      ordersOfLastMonthPromise,
      User.countDocuments(),
      Product.countDocuments(),
      Order.find({}).select("totalAmount"),
      sixmonthsagoOrderPromise,
      User.find({}).countDocuments({ gender: "female" }),
      User.find({}).countDocuments({ gender: "male" }),
      User.find({}).countDocuments({ gender: "other" }),
    ]);

    const userChange = ChangePercentage(
      usersOfThisMonth.length,
      usersOfLastMonth.length
    );
    const orderChange = ChangePercentage(
      ordersOfThisMonth.length,
      ordersOfLastMonth.length
    );
    const productChange = ChangePercentage(
      productsOfThisMonth.length,
      productsOfLastMonth.length
    );

    const revenuecollectionofthismonth = ordersOfThisMonth.reduce((acc, e) => {
      return acc + e?.totalAmount;
    }, 0);
    const revenuecollectionoflastmonth = ordersOfLastMonth.reduce((acc, e) => {
      return acc + e?.totalAmount;
    }, 0);
    const revenuechange = ChangePercentage(
      revenuecollectionofthismonth,
      revenuecollectionoflastmonth
    );
    const revenue = totalrevenue.reduce((acc, ele) => {
      return acc + ele.totalAmount;
    }, 0);
    const arrayofsixmonths = new Array(6).fill(0);
    const arrayofsixmonthsorders = new Array(6).fill(0);
    sixmonthsAgoorders.forEach((order) => {
      const creationDate = order.createdAt;
      const monthdiff = today.getMonth() - creationDate.getMonth();
      if (monthdiff < 6) {
        arrayofsixmonths[6 - monthdiff - 1] += 1;
        arrayofsixmonthsorders[6 - monthdiff - 1] += order.totalAmount;
      }
    });

    //inventory part
    const productscategories = await Product.find({}).select("category -_id");

    const categoryMap = new Map();

    await Promise.all(
      productscategories.map(async (e) => {
        const total = await Product.countDocuments({ category: e.category });

        if (categoryMap.has(e.category)) {
          categoryMap.set(e.category, categoryMap.get(e.category) + 0);
        } else {
          categoryMap.set(e.category, total);
        }
      })
    );
    const result = Array.from(categoryMap, ([category, count]) => ({
      category,
      count,
      percentage: `${((count / totalProducts) * 100).toFixed(2)}%`,
    }));

    const stats = {
      userChange,
      productChange,
      orderChange,
      revenuechange,
    };

    res.status(200).json({
      status: "success",
      message: "Dashboard statistics fetched successfully",
      StatsPercentage: stats,
      Count: {
        revenue,
        totalUsers,
        totalProducts,
        totalOrders: totalrevenue.length,
      },
      Charts: {
        orders: arrayofsixmonths,
        revenue: arrayofsixmonthsorders,
      },
      Inventory: {
        result,
      },
      genderRatio: {
        femaleusers,
        maleusers,
        otherusers,
      },
      latesttransactions,
    });
  } catch (error) {
    next(new AppError(error.message, 400, error));
  }
};
export const getpiecharts = async function (req, res, next) {
  try {
  } catch (error) {}
};
export const getbarcharts = async function (req, res, next) {
  try {
  } catch (error) {}
};
export const getlinecharts = async function (req, res, next) {
  try {
  } catch (error) {}
};
