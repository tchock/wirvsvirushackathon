export const bundles = [
  {
    nodeId: '123',
    peopleCount: 4,
    name: 'Pasta Dinner',
    category: 'Pasta',
    items: [
      { name: "Onions", unit: "g", quantity: 500, price: 1.2 },
      { name: "Chopped Tomatoes", unit: "g", quantity: 425, price: 0.5 },
      { name: "Tomato Puree", unit: "g", quantity: 45, price: 1.0 },
      { name: "Spaghetti", unit: "g", quantity: 500, price: 0.75 }, 
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
    peopleCount: 2,
    items: [
      { name: "Soy Milk", unit: "l", quantity: 1, price: 1.0 },
      { name: "Basmati Rice", unit: "g", quantity: 500, price: 0.75 },
      { name: "Red Curry Paste", unit: "g", quantity: 320, price: 2.2 },
      { name: "Carrots", unit: "kg", quantity: 1, price: 1.0 },
      { name: "Chopped Tomatoes", unit: "g", quantity: 425, price: 0.5 },
      { name: "Onions", unit: "g", quantity: 500, price: 1.2 },
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
    category: 'Meat',
    peopleCount: 4,
    items: [
      { name: "Oven Chips", unit: "kg", quantity: 1, price: 1.0 },
      { name: "Burger Patties", quantity: 4, price: 2.5 },
      { name: "Burger Buns", quantity: 4, price: 1.0 },
      { name: "Tomatoes", quantity: 2, price: 0.5 },
      { name: "Onions", quantity: 2, price: 0.25 },
      { name: "Ketchup", unit: "g", quantity: 350, price: 0.25 },
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
    peopleCount: 3,
    items: [
      { name: "Fresh Milk", unit: "l", quantity: 2, price: 1.0 },
      { name: "500ml strawberry joghurt", quantity: 2, price: 1.0 },
      { name: "Butter", unit: "g", quantity: 250, price: 2.2 },
      { name: "Vanilla Ice Cream", unit: "ml", quantity: 500, price: 2.2 },
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
    category: 'Non-Food',
    peopleCount: 4,
    items: [
      { name: "bag of liquid soap", unig: "ml", quantity: 750, price: 2.75 },
      { name: "Tube Toothpaste", quantity: 1, price: 0.75 },
      { name: "toothbrushes", quantity: 2, price: 0.5 },
      { name: "liquid detergent", unit: "l", quantity: 2.5, price: 1.5 },
      { name: "Bag of Toilet Paper (yes, we have some)", quantity: 1, price: 2.5 },
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
    category: 'Breakfast',
    peopleCount: 2,
    items: [
      { name: "cereals with raisins and nuts", unig: "kg", quantity: 1, price: 2.25 },
      { name: "long life milk", unig: "l", quantity: 1, price: 0.75 },
      { name: "Cherry Jam", unig: "ml", quantity: 325, price: 1.50 },
      { name: "Sliced Rye Bread", unig: "g", quantity: 500, price: 2.50 },
      { name: "Nutella", quantity: 1, price: 1.50 },
      { name: "Packages of Toast", quantity: 2, price: 1.75 },
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
