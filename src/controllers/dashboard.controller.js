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
      const monthdiff = (today.getMonth() - creationDate.getMonth() + 12) % 12;
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
    //order fulfillment ratio

    const Orders = await Order.find({});
    const [shipped, delivered, processing] = await Promise.all([
      Order.countDocuments({ orderStatus: "Shipped" }),
      Order.countDocuments({ orderStatus: "Delivered" }),
      Order.countDocuments({ orderStatus: "Processing" }),
    ]);
    //shipped delivered processing
    const categories = await Product.find({}).distinct("category");
    const countcategories = await Promise.all(
      categories.map(async (e) => {
        const counting = await Product.countDocuments({ category: e });
        return {
          [e]: counting,
        };
      })
    );
    //stock availability
    const stock = await Product.find({}).select("stock -_id");
    const outofstock = stock.reduce((acc, e) => {
      return e.stock === 0 ? acc + 1 : acc;
    }, 0);
    const instock = stock.reduce((acc, e) => {
      return e.stock > 0 ? acc + 1 : acc;
    }, 0);
    const grossIncome = Orders.reduce((acc, e) => {
      return acc + e.totalAmount;
    }, 0);
    const discount = Orders.reduce((acc, e) => {
      return acc + e.discount;
    }, 0);
    const productionCost = Orders.reduce((acc, e) => {
      return acc + e.shippingCharges;
    }, 0);
    const burnt = Orders.reduce((acc, e) => {
      return acc + e.tax;
    }, 0);
    const marketingCost = grossIncome * 0.3;
    const netMargin =
      grossIncome - marketingCost - discount - productionCost - burnt;
    //user age group

    const users = await User.find({});
    //admin and customers
    const admin = await User.countDocuments({ role: "admin" });
    const user = await User.countDocuments({ role: "user" });
    const userAgeGroup = await User.find({}).select("dob -_id");
    const ages = userAgeGroup.map((e) => {
      return new Date().getFullYear() - new Date(e.dob).getFullYear();
    });
    let [teen, adult, old] = new Array(3).fill(0);
    ages.forEach((age) => {
      if (age >= 0 && age <= 20) {
        teen++;
      }
      if (age >= 21 && age <= 50) {
        adult++;
      }
      if (age >= 51) {
        old++;
      }
    });
    return res.json({
      status: "success",
      orderFullfillmentRatio: {
        shipped: shipped,
        delivered: delivered,
        processing: processing,
      },
      productCategoryRatio: {
        countcategories,
      },
      stockAvailability: {
        instock,
        outofstock,
      },
      Revenueandmarketingcharges: {
        grossIncome,
        discount,
        productionCost,
        marketingCost,
        netMargin,
      },
      userAndadminCount: {
        admin,
        user,
      },
      userAgeGroup: {
        teen,
        adult,
        old,
      },
    });
  } catch (error) {
    next(new AppError(error.message, 402, error));
  }
};
export const getbarcharts = async function (req, res, next) {
  try {
    const today = new Date();
    const sixMonthAgo = new Date();
    sixMonthAgo.setMonth(sixMonthAgo.getMonth() - 6);
    const products = await Product.find({
      createdAt: {
        $gte: sixMonthAgo,
        $lte: today,
      },
    });
    const users = await User.find({
      createdAt: {
        $gte: sixMonthAgo,
        $lte: today,
      },
      role: {
        $ne: "admin",
        $ne: "developer",
      },
    });
    const sixMonthsAgoproducts = new Array(6).fill(0);
    const sixMonthsAgousers = new Array(6).fill(0);

    products.forEach((e) => {
      const monthdiff = today.getMonth() - e.createdAt.getMonth();
      if (monthdiff < 6) {
        sixMonthsAgoproducts[6 - monthdiff - 1] += 1;
      }
    });
    users.forEach((e) => {
      const monthdiff = today.getMonth() - e.createdAt.getMonth();
      if (monthdiff < 6) {
        sixMonthsAgousers[6 - monthdiff - 1] += 1;
      }
    });
    const twelvemonthsAgo = new Date();
    twelvemonthsAgo.setMonth(twelvemonthsAgo.getMonth() - 12);
    const productsnew = await Product.find({
      createdAt: {
        $gte: twelvemonthsAgo,
        $lte: today,
      },
    });
    const usersnew = await User.find({
      createdAt: {
        $gte: twelvemonthsAgo,
        $lte: today,
      },
      role: {
        $ne: "admin",
        $ne: "developer",
      },
    });
    const ordersnew = await Order.find({
      createdAt: {
        $gte: twelvemonthsAgo,
        $lte: today,
      },
      role: {
        $ne: "admin",
        $ne: "developer",
      },
    });

    const twelveMonthsAgoproducts = new Array(12).fill(0);
    const twelveMonthsAgousers = new Array(12).fill(0);
    const twelveMonthsAgoorders = new Array(12).fill(0);
    productsnew.forEach((e) => {
      const monthdiff = (today.getMonth() - e.createdAt.getMonth() + 12) % 12;
      if (monthdiff < 12) {
        twelveMonthsAgoproducts[12 - monthdiff - 1] += 1;
      }
    });
    usersnew.forEach((e) => {
      const monthdiff = (today.getMonth() - e.createdAt.getMonth() + 12) % 12;
      if (monthdiff < 12) {
        twelveMonthsAgousers[12 - monthdiff - 1] += 1;
      }
    });
    ordersnew.forEach((e) => {
      const monthdiff = (today.getMonth() - e.createdAt.getMonth() + 12) % 12;
      if (monthdiff < 12) {
        twelveMonthsAgoorders[12 - monthdiff - 1] += 1;
      }
    });

    return res.json({
      status: "success",
      barOfProductsAndusers: {
        sixMonthsAgoproducts,
        sixMonthsAgousers,
        twelveMonthsAgoproducts,
        twelveMonthsAgousers,
        twelveMonthsAgoorders,
      },
    });
  } catch (error) {
    next(new AppError(error.message, 402, error));
  }
};
// export const getlinecharts = async function (req, res, next) {
//   try {
//     const today = new Date();
//     const sixMonthAgo = new Date();
//     sixMonthAgo.setMonth(sixMonthAgo.getMonth() - 6);
//     const twelveMonthAgo = new Date();
//     twelveMonthAgo.setMonth(twelveMonthAgo.getMonth() - 12);
//     const sixMonthsAgoproducts = new Array(6).fill(0);
//     const sixMonthsAgousers = new Array(6).fill(0);
//     const sixMonthAgoorders = new Array(6).fill(0);
//     const twelveMonthsAgoproducts = new Array(12).fill(0);
//     const twelveMonthsAgousers = new Array(12).fill(0);
//     const twelveMonthsAgoorders = new Array(12).fill(0);
//     const twelveMonthsAgoordersfordiscount = new Array(12).fill(0);
//     const products = await Product.find({
//       createdAt: {
//         $gte: sixMonthAgo,
//         $lte: today,
//       },
//     });
//     const users = await User.find({
//       createdAt: {
//         $gte: sixMonthAgo,
//         $lte: today,
//       },
//       role: {
//         $ne: "admin",
//         $ne: "developer",
//       },
//     });
//     const orders = await Order.find({
//       createdAt: {
//         $gte: sixMonthAgo,
//         $lte: today,
//       },
//     });

//     products.forEach((e) => {
//       const monthdiff = (today.getMonth() - e.createdAt.getMonth() + 12) % 12;
//       if (monthdiff < 6) {
//         sixMonthsAgoproducts[6 - monthdiff - 1] += 1;
//       }
//     });
//     users.forEach((e) => {
//       const monthdiff = (today.getMonth() - e.createdAt.getMonth() + 12) % 12;
//       if (monthdiff < 6) {
//         sixMonthsAgousers[6 - monthdiff - 1] += 1;
//       }
//     });
//     orders.forEach((e) => {
//       const monthdiff = (today.getMonth() - e.createdAt.getMonth() + 12) % 12;
//       if (monthdiff < 6) {
//         sixMonthAgoorders[6 - monthdiff - 1] += 1;
//       }
//     });
//     const productsnew = await Product.find({
//       createdAt: {
//         $gte: twelveMonthAgo,
//         $lte: today,
//       },
//     });
//     const usersnew = await User.find({
//       createdAt: {
//         $gte: twelveMonthAgo,
//         $lte: today,
//       },
//       role: {
//         $ne: "admin",
//         $ne: "developer",
//       },
//     });
//     const ordersnew = await Order.find({
//       createdAt: {
//         $gte: twelveMonthAgo,
//         $lte: today,
//       },
//     });
//     const ordersnewfordiscount = await Order.find({
//       createdAt: {
//         $gte: twelveMonthAgo,
//         $lte: today,
//       },
//     }).select("discount");

//     productsnew.forEach((e) => {
//       const monthdiff = (today.getMonth() - e.createdAt.getMonth() + 12) % 12;
//       if (monthdiff < 12) {
//         twelveMonthsAgoproducts[12 - monthdiff - 1] += 1;
//       }
//     });
//     usersnew.forEach((e) => {
//       const monthdiff = (today.getMonth() - e.createdAt.getMonth() + 12) % 12;
//       if (monthdiff < 12) {
//         twelveMonthsAgousers[12 - monthdiff - 1] += 1;
//       }
//     });
//     ordersnew.forEach((e) => {
//       const monthdiff = (today.getMonth() - e.createdAt.getMonth() + 12) % 12;
//       if (monthdiff < 12) {
//         twelveMonthsAgoorders[12 - monthdiff - 1] += 1;
//       }
//     });
//     ordersnewfordiscount.forEach((e) => {
//       const monthdiff = (today.getMonth() - e.createdAt.getMonth() + 12) % 12;
//       if (monthdiff < 12) {
//         twelveMonthsAgoordersfordiscount[12 - monthdiff - 1] += e.discount;
//       }
//     });

//     return res.json({
//       status: "success",
//       lineOfProductsAndusers: {
//         sixMonthsAgoproducts,
//         sixMonthsAgousers,
//         sixMonthAgoorders,
//         twelveMonthsAgoproducts,
//         twelveMonthsAgousers,
//         twelveMonthsAgoorders,
//       },
//       discount: twelveMonthsAgoordersfordiscount,
//       revenue: {
//         totalRevenue: 34000,
//       },
//     });
//   } catch (error) {
//     next(new AppError(error.message, 500, error));
//   }
// };
export const getlinecharts = async function (req, res, next) {
  try {
    const today = new Date();
    const sixMonthAgo = new Date();
    sixMonthAgo?.setMonth(sixMonthAgo?.getMonth() - 6);
    const twelveMonthAgo = new Date();
    twelveMonthAgo?.setMonth(twelveMonthAgo?.getMonth() - 12);

    const sixMonthsAgoproducts = new Array(6).fill(0);
    const sixMonthsAgousers = new Array(6).fill(0);
    const sixMonthAgoorders = new Array(6).fill(0);
    const twelveMonthsAgoproducts = new Array(12).fill(0);
    const twelveMonthsAgousers = new Array(12).fill(0);
    const twelveMonthsAgoorders = new Array(12).fill(0);
    const twelveMonthsAgoordersfordiscount = new Array(12).fill(0);
    const twelveMonthsAgoordersforrevenue = new Array(12).fill(0);

    const products = await Product.find({
      createdAt: {
        $gte: sixMonthAgo,
        $lte: today,
      },
    });
    const users = await User.find({
      createdAt: {
        $gte: sixMonthAgo,
        $lte: today,
      },
      role: {
        $ne: "admin",
        $ne: "developer",
      },
    });
    const orders = await Order.find({
      createdAt: {
        $gte: sixMonthAgo,
        $lte: today,
      },
    });

    const calculateMonthDiff = (date1, date2) => {
      return (
        (date1?.getFullYear() - date2?.getFullYear()) * 12 +
        date1?.getMonth() -
        date2?.getMonth()
      );
    };

    products.forEach((e) => {
      const monthdiff = calculateMonthDiff(today, e.createdAt);
      if (monthdiff < 6) {
        sixMonthsAgoproducts[6 - monthdiff - 1] += 1;
      }
    });

    users.forEach((e) => {
      const monthdiff = calculateMonthDiff(today, e.createdAt);
      if (monthdiff < 6) {
        sixMonthsAgousers[6 - monthdiff - 1] += 1;
      }
    });

    orders.forEach((e) => {
      const monthdiff = calculateMonthDiff(today, e.createdAt);
      if (monthdiff < 6) {
        sixMonthAgoorders[6 - monthdiff - 1] += 1;
      }
    });

    const productsnew = await Product.find({
      createdAt: {
        $gte: twelveMonthAgo,
        $lte: today,
      },
    });

    const usersnew = await User.find({
      createdAt: {
        $gte: twelveMonthAgo,
        $lte: today,
      },
      role: {
        $ne: "admin",
        $ne: "developer",
      },
    });

    const ordersnew = await Order.find({
      createdAt: {
        $gte: twelveMonthAgo,
        $lte: today,
      },
    });

    const ordersnewfordiscount = await Order.find({
      createdAt: {
        $gte: twelveMonthAgo,
        $lte: today,
      },
    });

    productsnew.forEach((e) => {
      const monthdiff = calculateMonthDiff(today, e.createdAt);
      if (monthdiff < 12) {
        twelveMonthsAgoproducts[12 - monthdiff - 1] += 1;
      }
    });

    usersnew.forEach((e) => {
      const monthdiff = calculateMonthDiff(today, e.createdAt);
      if (monthdiff < 12) {
        twelveMonthsAgousers[12 - monthdiff - 1] += 1;
      }
    });

    ordersnew.forEach((e) => {
      const monthdiff = calculateMonthDiff(today, e.createdAt);
      if (monthdiff < 12) {
        twelveMonthsAgoorders[12 - monthdiff - 1] += 1;
      }
    });

    ordersnewfordiscount.forEach((e) => {
      const monthdiff = (today?.getMonth() - e.createdAt?.getMonth() + 12) % 12;
      if (monthdiff < 12) {
        twelveMonthsAgoordersfordiscount[12 - monthdiff - 1] += e.discount;
      }
    });
    ordersnewfordiscount.forEach((e) => {
      const monthdiff = (today?.getMonth() - e.createdAt?.getMonth() + 12) % 12;
      if (monthdiff < 12) {
        twelveMonthsAgoordersforrevenue[12 - monthdiff - 1] += e.totalAmount;
      }
    });

    return res.json({
      status: "success",
      lineOfProductsAndusers: {
        sixMonthsAgoproducts,
        sixMonthsAgousers,
        sixMonthAgoorders,
        twelveMonthsAgoproducts,
        twelveMonthsAgousers,
        twelveMonthsAgoorders,
      },
      discount: twelveMonthsAgoordersfordiscount,
      revenue: {
        totalRevenue: twelveMonthsAgoordersforrevenue, // This value is hardcoded, ensure it's correct or dynamically calculated.
      },
    });
  } catch (error) {
    next(new AppError(error.message, 500, error));
  }
};
