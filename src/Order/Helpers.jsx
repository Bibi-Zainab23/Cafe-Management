export const calculateTotal = (items, menuDishes) => {
  return items.reduce((sum, item) => {
    const dish = menuDishes.find((d) => d.name === item.dish);
    const price = dish ? dish.price : 0;
    return sum + price * item.quantity;
  }, 0);
};