import React from "react";

const products = [
  {
    name: "Sheep Milk",
    image: "/images/sheep-milk.png",
    sizes: ["Half gallon (64 oz)", "Quart (32 oz)"],
    price: "$ 8.99",
  },
  {
    name: "Raw A2 Milk",
    image: "/images/a2-milk.png",
    sizes: ["Gallon (128 oz)", "Half gallon (64 oz)", "Quart (32 oz)"],
    price: "$ 8.99",
  },
  {
    name: "Raw A1 Milk",
    image: "/images/a1-milk.png",
    sizes: ["Gallon (128 oz)", "Half gallon (64 oz)", "Quart (32 oz)"],
    price: "$ 8.99",
  },
  {
    name: "Goat Milk",
    image: "/images/a1-milk.png",

    sizes: ["Half gallon (64 oz)", "Quart (32 oz)"],
    price: "$ 8.99",
  },
];

export default function ProductsSection() {
  return (
    <section id="products" className="py-16 px-4 md:px-12 max-w-7xl mx-auto">
      <h2 className="text-5xl font-extrabold text-center mb-12">
        Farmer Joe's Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
        {products.map((product, idx) => (
          <div key={idx} className="flex flex-col items-center max-w-[250px]">
            <img
              src={product.image}
              alt={product.name}
              className="h-48 w-48 object-contain mb-4"
            />
            <h3 className="text-lg font-semibold text-center mb-2">
              {product.name}
            </h3>
            <div className="text-sm text-gray-600 text-center mb-2">
              {product.sizes.map((size, sizeIdx) => (
                <p key={sizeIdx}>{size}</p>
              ))}
            </div>
            <p className="text-base font-semibold text-center mt-2">
              {product.price}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
