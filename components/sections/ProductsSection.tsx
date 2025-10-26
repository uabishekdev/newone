import React from 'react';

const products = [
  {
    name: "Farmer Joe’s Sheep Milk",
    image: "/images/sheep-milk.png",
    size: "250ml / 1 L",
    price: "$ 8.99"
  },
  {
    name: "Farmer Joe’s Ghee",
    image: "/images/ghee.png",
    size: "250ml / 1 L",
    price: "$ 8.99"
  },
  {
    name: "Farmer Joe’s Raw A2 Milk",
    image: "/images/a2-milk.png",
    size: "250ml / 1 L",
    price: "$ 8.99"
  },
  {
    name: "Farmer Joe’s Raw A1 Milk",
    image: "/images/a1-milk.png",
    size: "250ml / 1 L",
    price: "$ 8.99"
  },
  {
    name: "Farmer Joe’s Pinni",
    image: "/images/pinni.png",
    size: "250ml / 1 L",
    price: "$ 8.99"
  },
  {
    name: "Farmer Joe’s Paneer",
    image: "/images/paneer.png",
    size: "250ml / 1 L",
    price: "$ 8.99"
  }
];

export default function ProductsSection() {
  return (
    <section className="py-16 px-4 md:px-12 max-w-7xl mx-auto">
      <h2 className="text-5xl font-extrabold text-center mb-12">Our Products</h2>
      <div className="flex flex-wrap justify-center gap-12">
        {products.map((product, idx) => (
          <div key={idx} className="flex flex-col items-center w-48">
            <img src={product.image} alt={product.name} className="h-48 w-48 object-contain mb-4" />
            <h3 className="text-lg font-semibold text-center mb-1">{product.name}</h3>
            <p className="text-sm text-gray-600 text-center">{product.size}</p>
            <p className="text-base font-bold text-center mt-2">{product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
