const { default: breakfastBanner } = require("./img/breakfast.svg");
const { default: chipsBanner } = require("./img/chips.svg");
const { default: dairyBanner } = require("./img/dairy.svg");
const { default: nonfoodBanner } = require("./img/nonfood.svg");
const { default: pastaBanner } = require("./img/pasta.svg");
const { default: veganBanner } = require("./img/vegan.svg");

export const bundles = [
  {
    nodeId: '123',
    peopleCount: 4,
    name: 'Pasta Dinner',
    filterCategory: 'food',
    category: 'Pasta',
    banner: pastaBanner,
    items: [
      { nodeId: '1', name: "Onions", unit: "g", quantity: 500, price: 1.2 },
      { nodeId: '2', name: "Chopped Tomatoes", unit: "g", quantity: 425, price: 0.5 },
      { nodeId: '3', name: "Tomato Puree", unit: "g", quantity: 45, price: 1.0 },
      { nodeId: '4', name: "Spaghetti", unit: "g", quantity: 500, price: 0.75 }, 
    ],
    location: {
      nodeId: 123,
      name: "Rewe",
      street: "Rewestraße",
      streetNumber: "12a",
      zipCode: 12345,
      city: "Berlin"
    },
  },
  {
    nodeId: '321',
    name: 'Vegan Box',
    category: 'Vegan Food',
    filterCategory: 'food',
    peopleCount: 2,
    banner: veganBanner,
    items: [
      { nodeId: '5', name: "Soy Milk", unit: "l", quantity: 1, price: 1.0 },
      { nodeId: '6', name: "Basmati Rice", unit: "g", quantity: 500, price: 0.75 },
      { nodeId: '7', name: "Red Curry Paste", unit: "g", quantity: 320, price: 2.2 },
      { nodeId: '8', name: "Carrots", unit: "kg", quantity: 1, price: 1.0 },
      { nodeId: '9', name: "Chopped Tomatoes", unit: "g", quantity: 425, price: 0.5 },
      { nodeId: '10', name: "Onions", unit: "g", quantity: 500, price: 1.2 },
    ],
    location: {
      nodeId: 123,
      name: "Rewe",
      street: "Rewestraße",
      streetNumber: "12a",
      zipCode: 12345,
      city: "Berlin"
    },
  },
  {
    nodeId: '999',
    name: 'Burgers & Chips',
    filterCategory: 'food',
    category: 'Meat',
    banner: chipsBanner,
    peopleCount: 4,
    items: [
      { nodeId: '11', name: "Oven Chips", unit: "kg", quantity: 1, price: 1.0 },
      { nodeId: '12', name: "Burger Patties", unit: "pieces", quantity: 4, price: 2.5 },
      { nodeId: '13', name: "Burger Buns", unit: "pieces", quantity: 4, price: 1.0 },
      { nodeId: '14', name: "Tomatoes", unit: "pieces",quantity: 2, price: 0.5 },
      { nodeId: '15', name: "Onions", unit: "pieces", quantity: 2, price: 0.25 },
      { nodeId: '16', name: "Ketchup", unit: "g", quantity: 350, price: 0.25 },
    ],
    location: {
      nodeId: 123,
      name: "Rewe",
      street: "Rewestraße",
      streetNumber: "12a",
      zipCode: 12345,
      city: "Berlin"
    },
  },
  {
    nodeId: '33333',
    name: 'Fresh dairy box',
    category: 'Milk',
    filterCategory: 'food',
    banner: dairyBanner,
    peopleCount: 3,
    items: [
      { nodeId: '17', name: "Fresh Milk", unit: "l", quantity: 2, price: 1.0 },
      { nodeId: '18', name: "500ml strawberry joghurt", unit: "pieces",quantity: 2, price: 1.0 },
      { nodeId: '19', name: "Butter", unit: "g", quantity: 250, price: 2.2 },
      { nodeId: '20', name: "Vanilla Ice Cream", unit: "ml", quantity: 500, price: 2.2 },
    ],
    location: {
      nodeId: 321,
      name: "Rewe",
      street: "Rewestraße",
      streetNumber: "12a",
      zipCode: 12345,
      city: "Berlin"
    },
  },
  {
    nodeId: '1111',
    name: 'Non-food family pack',
    banner: nonfoodBanner,
    category: 'Non-Food',
    filterCategory: 'non-food',
    peopleCount: 4,
    items: [
      { nodeId: '21', name: "bag of liquid soap", unit: "ml", quantity: 750, price: 2.75 },
      { nodeId: '22', name: "Tube Toothpaste", unit: "pieces",quantity: 1, price: 0.75 },
      { nodeId: '23', name: "toothbrushes", unit: "pieces",quantity: 2, price: 0.5 },
      { nodeId: '24', name: "liquid detergent", unit: "l", quantity: 2.5, price: 1.5 },
      { nodeId: '25', name: "Bag of Toilet Paper (yes, we have some)",unit: "pieces", quantity: 1, price: 2.5 },
    ],
    location: {
      nodeId: 321,
      name: "Rewe",
      street: "Rewestraße",
      streetNumber: "12a",
      zipCode: 12345,
      city: "Berlin"
    },
  },
  {
    nodeId: '999999',
    name: 'Breakfast for one week',
    filterCategory: 'food',
    category: 'Breakfast',
    banner: breakfastBanner,
    peopleCount: 2,
    items: [
      { nodeId: '26', name: "cereals with raisins and nuts", unit: "kg", quantity: 1, price: 2.25 },
      { nodeId: '27', name: "long life milk", unit: "l", quantity: 1, price: 0.75 },
      { nodeId: '28', name: "Cherry Jam", unit: "ml", quantity: 325, price: 1.50 },
      { nodeId: '29', name: "Sliced Rye Bread", unit: "g", quantity: 500, price: 2.50 },
      { nodeId: '30', name: "Nutella", unit: "pieces", quantity: 1, price: 1.50 },
      { nodeId: '31', name: "Packages of Toast", unit: "pieces", quantity: 2, price: 1.75 },
    ],
    location: {
      nodeId: 321,
      name: "Rewe",
      street: "Rewestraße",
      streetNumber: "12a",
      zipCode: 12345,
      city: "Berlin"
    },
  },
]
