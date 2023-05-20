import { getEmployees, getOrders } from "./database.js";

const employees = getEmployees();

export const Employees = () => {
  let html = "<ul>";

  for (const employee of employees) {
    html += `
      <li data-type="employee" data-id="${employee.id}">
        ${employee.name}
      </li>
    `;
  }

  html += "</ul>";

  return html;
};

const employeeOrders = (id, orders) => {
  let fulfilledOrders = 0;

  for (const order of orders) {
    if (order.employeeId === id) {
      fulfilledOrders++;
    }
  }

  return fulfilledOrders;
};

document.addEventListener("click", (clickEvent) => {
  const itemClicked = clickEvent.target;

  if (itemClicked.dataset.type === "employee") {
    const employeeId = itemClicked.dataset.id;
    const orders = getOrders();
    let orderCount = 0;

    for (const employee of employees) {
      if (employee.id === parseInt(employeeId)) {
        orderCount = employeeOrders(employee.id, orders);
        window.alert(`${employee.name} sold ${orderCount} products`);
      }
    }
  }
});
