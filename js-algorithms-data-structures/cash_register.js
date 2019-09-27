print=console.log;

class Till {
  constructor(list_bill_count_pairs=[]) {
    this.bills = {};
    this.total = 0;
    
    for (let [bill, count] of list_bill_count_pairs) {
      this.check_bill(bill);
      this.add_bill(bill, count);
    }
  }
  check_bill(bill) {
    /* This class requires bill names to be a number equal 
    to the value of the bill */
    if (typeof bill !== "number") {
      print(`Your bills need to be numbers; "${bill}" 
        is not a valid number`);
      throw `Your bills need to be numbers; "${bill}" 
        is not a valid number`;
    }
  }
  add_bill(bill, count=1) {
    this.check_bill(bill);
    this.bills[bill] ? this.bills[bill]+=count : this.bills[bill] = count;
    this.total += bill*count;
  }
  remove_bill(bill, count=1) {
    this.check_bill(bill);
    this.bills[bill] -= count;
    this.total -= bill*count;
    if (this.bills[bill] < 0) {
      print(`There are not enough ${bill}s in the till!`);
      return false;
    }
    return true;
  }
  list_bills() {
    let billList = []
    for (let [bill, count] of Object.entries(this.bills)) {
      billList.push([bill, count]);
    }
    // sort bills in descending order
    return billList.sort((a, b) => b[0] - a[0]);
  }
}

function checkCashRegister(price, cash, cid) {
  /* this function is basically a wrapper for my Till class, and its
  job is to parse the stupid formatting required by this FCC challenge */

  // define constants
  let billValues = { // lookup table linking bill names to their value 
    "PENNY": 1, "NICKEL": 5, "DIME": 10, "QUARTER": 25, "ONE": 100, 
    "FIVE": 500, "TEN": 1000, "TWENTY": 2000, "ONE HUNDRED": 10000, 
  } // add the inverse also
  Object.entries(billValues).forEach(([k, v]) => {billValues[v] = k;})

  // bill names in descending order of value
  let orderedBills = ["ONE HUNDRED", "TWENTY", "TEN", "FIVE", "ONE",
    "QUARTER", "DIME", "NICKEL", "PENNY"];
    
  // convert everything to pennies to avoid float rounding issues
  price = Math.round(price*100);
  cash = Math.round(cash*100);
  let sensible = []; // force copy cid

  for (let pair of cid) {
    sensible.push([...pair]); // need to deep copy!!! 
  }
  
  for (let pair of sensible) { // convert everything in till
    pair[1] = Math.round(pair[1]*100); // we'll refer to coins & bills as bills
  }

  // calculate how much change is due
  print(`you gave me ${cash} cents for an item costing ${price} cents`)
  let changeDue = cash - price;
  print(`change due = ${changeDue} cents`)
  if (changeDue < 0) {throw `you can't afford this, bitch`}   

  // convert the silly ["BILL NAME", total value] array to a more
  // sensible [bill_value, bill_count] array that I can pass to Till
  sensible = sensible.map(([bill, value]) => {
    let billValue = billValues[bill]
    return [billValue, Math.round(value / billValue)]
    })

  // use Till class to model cash register
  let register = new Till(sensible);

  // add the bill given to the till
  print(`total cash in till = ${register.total}`)

  // compose change 
  let change = new Till();
  for (let bill of orderedBills) { // start with largest bills
    let value = billValues[bill];
    while (value <= changeDue - change.total) { 
      // move on to next bill if run out
      if (register.bills[value] == 0) {break;}
      register.remove_bill(value); 
      change.add_bill(value);
    }
  }
  
  if (change.total !== changeDue) {
    return {status: "INSUFFICIENT_FUNDS", change: []};
  }

  // format the change like a chump would
  let chumpChange = change.list_bills().map(([value, count]) => {
    return [billValues[value], count*value/100]
  })
  print(chumpChange)

  print(`there is ${register.total} remaining in the till`)
  let out = {
    status: register.total == 0 ? "CLOSED" : "OPEN", 
    change: register.total == 0 ? cid : chumpChange,
    };
  return out;
}

let out = checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])
print(out)
